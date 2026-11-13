import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { couperLigne } from '../utils/format.js';

export default function CarteIss({ iss, orbite, suivre }) {
  const conteneur = useRef(null);
  const calques = useRef(null);
  const premierePosition = useRef(true);
  const suiviAvant = useRef(false);

  useEffect(() => {
    const carte = L.map(conteneur.current).setView([20, 0], 1);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 8,
      referrerPolicy: 'strict-origin-when-cross-origin',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(carte);

    const marqueur = L.circleMarker([0, 0], {
      radius: 8,
      color: '#7a1010',
      fillColor: '#e03131',
      fillOpacity: 1,
    }).bindTooltip('ISS');

    const zone = L.circle([0, 0], {
      radius: 1,
      color: '#1a5fb4',
      weight: 1,
      fillOpacity: 0.1,
    });

    const ligne = L.polyline([], {
      color: '#1a5fb4',
      weight: 2,
      dashArray: '6 6',
    }).addTo(carte);

    calques.current = { carte, marqueur, zone, ligne };
    premierePosition.current = true;

    return () => carte.remove();
  }, []);

  useEffect(() => {
    if (!iss) {
      return;
    }
    const { carte, marqueur, zone } = calques.current;
    const position = [iss.latitude, iss.longitude];

    marqueur.setLatLng(position).addTo(carte);
    zone.setLatLng(position).setRadius(iss.footprint * 1000 / 2).addTo(carte);

    if (suivre && !suiviAvant.current) {
      carte.setView(position, 4);
    } else if (suivre) {
      carte.panTo(position);
    } else if (suiviAvant.current) {
      carte.setView([20, 0], 1);
    } else if (premierePosition.current && !carte.getBounds().contains(position)) {
      carte.panTo(position);
    }

    suiviAvant.current = suivre;
    premierePosition.current = false;
  }, [iss, suivre]);

  useEffect(() => {
    const points = orbite.map((p) => [p.latitude, p.longitude]);
    calques.current.ligne.setLatLngs(couperLigne(points));
  }, [orbite]);

  return <div id="carte" ref={conteneur}></div>;
}
