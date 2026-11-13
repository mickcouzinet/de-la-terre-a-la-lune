import { useEffect, useState } from 'react';
import { lireAsteroides, messageErreur } from '../services/api.js';
import { nombre } from '../utils/format.js';

export default function Asteroides() {
  const [asteroides, setAsteroides] = useState(null);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    lireAsteroides()
      .then(setAsteroides)
      .catch((err) => setErreur('Astéroïdes indisponibles : ' + messageErreur(err)));
  }, []);

  return (
    <div>
      <h3>Astéroïdes qui passent près de la Terre aujourd'hui</h3>
      <p className="intro">
        Les 10 plus proches. Distance exprimée en distances Terre-Lune (1 = aussi loin que la Lune).
      </p>

      <div className="tableau-scroll">
        <table className="tableau">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Taille</th>
              <th>Vitesse</th>
              <th>Distance</th>
            </tr>
          </thead>
          <tbody>
            {asteroides && asteroides.length === 0 && (
              <tr><td colSpan="4">Aucun astéroïde répertorié aujourd'hui.</td></tr>
            )}
            {asteroides && asteroides.map((a) => (
              <tr key={a.nom}>
                <td>
                  <a href={a.lien} target="_blank" rel="noreferrer">{a.nom}</a>
                  {a.dangereux && <><br /><span className="danger">potentiellement dangereux</span></>}
                </td>
                <td>{nombre(a.diametreMin)} à {nombre(a.diametreMax)} m</td>
                <td>{nombre(a.vitesse)} km/h</td>
                <td>
                  {nombre(a.distanceLune, 2)}
                  <br />
                  <small>{nombre(Math.round(a.distanceKm / 1000) * 1000)} km</small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {erreur && <p className="erreur">{erreur}</p>}
    </div>
  );
}
