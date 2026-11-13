const NASA_KEY = 'DEMO_KEY';
const ISS_URL = 'https://api.wheretheiss.at/v1/satellites/25544';
const APOD_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic';
const UNE_HEURE = 60 * 60 * 1000;

async function chargerJSON(url) {
  let reponse;
  try {
    reponse = await fetch(url);
  } catch {
    throw new Error('pas de réponse, vérifiez la connexion internet');
  }
  if (!reponse.ok) {
    const erreur = new Error('erreur ' + reponse.status);
    erreur.status = reponse.status;
    throw erreur;
  }
  return reponse.json();
}

let prochainAppelISS = 0;

async function appelISS(url) {
  const maintenant = Date.now();
  const moment = Math.max(maintenant, prochainAppelISS);
  prochainAppelISS = moment + 1100;
  if (moment > maintenant) {
    await new Promise((resolve) => setTimeout(resolve, moment - maintenant));
  }
  return chargerJSON(url);
}

function lireCache(cle) {
  try {
    const enCache = JSON.parse(localStorage.getItem(cle));
    if (enCache && Date.now() - enCache.date < UNE_HEURE) {
      return enCache.donnees;
    }
  } catch {
    return null;
  }
  return null;
}

function ecrireCache(cle, donnees) {
  try {
    localStorage.setItem(cle, JSON.stringify({ date: Date.now(), donnees }));
  } catch {
    return;
  }
}

function texteBrut(html) {
  const doc = new DOMParser().parseFromString(String(html ?? ''), 'text/html');
  return doc.body.textContent.replace(/\s+/g, ' ').trim();
}

export function messageErreur(err) {
  if (err.status === 429) {
    return 'quota de la clé DEMO_KEY atteint (30 requêtes par heure), réessayez plus tard';
  }
  return err.message;
}

export function lirePositionISS() {
  return appelISS(ISS_URL);
}

export async function lireOrbite() {
  const maintenant = Math.floor(Date.now() / 1000);
  const instants = [];
  for (let minutes = -45; minutes <= 45; minutes += 10) {
    instants.push(maintenant + minutes * 60);
  }
  const points = await appelISS(ISS_URL + '/positions?timestamps=' + instants.join(','));
  return points.map((p) => ({ latitude: p.latitude, longitude: p.longitude }));
}

export async function lirePhoto(date) {
  const cle = 'photo-' + (date || 'jour');
  let apod = lireCache(cle);
  if (!apod) {
    const url = date
      ? APOD_URL + '/' + date.slice(2).replaceAll('-', '')
      : APOD_URL + '?per_page=1';
    const reponse = await chargerJSON(url);
    apod = Array.isArray(reponse) ? reponse[0] : reponse;
    ecrireCache(cle, apod);
  }

  const jour = date || String(apod.date ?? '').slice(0, 10);

  return {
    titre: texteBrut(apod.title?.rendered ?? apod.title),
    date: /^\d{4}-\d{2}-\d{2}$/.test(jour) ? jour : '',
    credit: texteBrut(apod.credit || apod.copyright).replace(/^[^:]*cr[ée]dits?[^:]*:\s*/i, ''),
    explication: texteBrut(apod.explanation)
      .replace(/^explanation:\s*/i, '')
      .split(/tomorrow.s picture/i)[0]
      .trim(),
    image: apod.hdurl ? apod.hdurl.split('?')[0] + '?w=1024' : '',
    alt: texteBrut(apod.alt),
    lien: apod.permalink || apod.url || 'https://apod.nasa.gov/apod/',
  };
}

export async function lireAsteroides() {
  const jour = new Date().toISOString().slice(0, 10);
  const cle = 'asteroides-' + jour;
  let asteroides = lireCache(cle);

  if (!asteroides) {
    const url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + jour +
      '&end_date=' + jour + '&api_key=' + NASA_KEY;
    const donnees = await chargerJSON(url);

    asteroides = (donnees.near_earth_objects[jour] || [])
      .map((a) => ({
        nom: a.name.replace(/[()]/g, ''),
        diametreMin: a.estimated_diameter.meters.estimated_diameter_min,
        diametreMax: a.estimated_diameter.meters.estimated_diameter_max,
        dangereux: a.is_potentially_hazardous_asteroid,
        vitesse: Number(a.close_approach_data[0].relative_velocity.kilometers_per_hour),
        distanceKm: Number(a.close_approach_data[0].miss_distance.kilometers),
        distanceLune: Number(a.close_approach_data[0].miss_distance.lunar),
        lien: a.nasa_jpl_url,
      }))
      .sort((a, b) => a.distanceKm - b.distanceKm);

    ecrireCache(cle, asteroides);
  }

  return asteroides.slice(0, 10);
}
