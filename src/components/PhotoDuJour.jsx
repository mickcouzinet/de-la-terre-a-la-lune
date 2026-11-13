import { useEffect, useState } from 'react';
import { lirePhoto } from '../services/api.js';
import { dateFr } from '../utils/format.js';

const AUJOURDHUI = new Date().toLocaleDateString('en-CA');

function messagePhoto(err) {
  return 'Photo indisponible : ' + (err.status === 404 ? 'pas de photo à cette date' : err.message);
}

export default function PhotoDuJour() {
  const [photo, setPhoto] = useState(null);
  const [date, setDate] = useState('');
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    lirePhoto()
      .then(setPhoto)
      .catch((err) => setErreur(messagePhoto(err)))
      .finally(() => setChargement(false));
  }, []);

  async function envoyer(e) {
    e.preventDefault();
    if (!date) {
      return;
    }
    setErreur('');
    try {
      setPhoto(await lirePhoto(date));
    } catch (err) {
      setErreur(messagePhoto(err));
    }
  }

  return (
    <div>
      <h3>Photo astronomique du jour</h3>
      <form id="form-apod" onSubmit={envoyer}>
        <label htmlFor="date-apod">Autre date :</label>{' '}
        <input
          type="date"
          id="date-apod"
          min="1995-06-16"
          max={AUJOURDHUI}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />{' '}
        <button type="submit">Afficher</button>
      </form>

      <div id="apod">
        {chargement && <p>Chargement...</p>}
        {photo && (
          <>
            {photo.image ? (
              <a href={photo.lien} target="_blank" rel="noreferrer">
                <img src={photo.image} alt={photo.alt || photo.titre} />
              </a>
            ) : (
              <p><a href={photo.lien} target="_blank" rel="noreferrer">Voir sur le site de la NASA</a></p>
            )}
            <p>
              <strong>{photo.titre}</strong>
              {photo.date && ` (${dateFr(photo.date)})`}
              {photo.credit && <><br />Crédit : {photo.credit}</>}
            </p>
            <details>
              <summary>Explication de la NASA (en anglais)</summary>
              <p>{photo.explication}</p>
            </details>
          </>
        )}
      </div>
      {erreur && <p className="erreur">{erreur}</p>}
    </div>
  );
}
