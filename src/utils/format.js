export function nombre(valeur, decimales = 0) {
  return valeur.toLocaleString('fr-FR', {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
}

export function duree(heures) {
  const totalMinutes = Math.round(heures * 60);
  const h = Math.floor(totalMinutes / 60);
  const min = totalMinutes % 60;
  return `${h} h ${String(min).padStart(2, '0')} min`;
}

export function dateFr(texte) {
  return new Date(texte + 'T12:00:00').toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function couperLigne(points) {
  const morceaux = [[]];
  points.forEach((point, i) => {
    if (i > 0 && Math.abs(point[1] - points[i - 1][1]) > 180) {
      morceaux.push([]);
    }
    morceaux[morceaux.length - 1].push(point);
  });
  return morceaux;
}
