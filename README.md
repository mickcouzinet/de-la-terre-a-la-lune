# De la Terre à la Lune en direct

Une page qui compare le roman de Jules Verne (1865) à la réalité : la position de l'ISS en direct sur une carte, un tableau « roman vs réalité » sur 10 points, et les données de la NASA du jour (la photo astronomique et les astéroïdes qui passent près de la Terre).

**Voir l'appli** : https://mickcouzinet.github.io/de-la-terre-a-la-lune/

La maquette et le prototype avec API bouchon sont dans un autre dépôt : https://github.com/mickcouzinet/de-la-terre-a-la-lune-prototype

## Pourquoi React et Vite

J'ai choisi React parce que la page se découpe bien en blocs : l'ISS, le comparatif, la photo du jour et les astéroïdes. Chaque bloc est un composant avec ses propres données, donc si une API ne répond pas, le reste de la page continue de marcher. React met aussi l'affichage à jour tout seul quand les données changent, par exemple la position de l'ISS toutes les 5 secondes. Et c'est le framework que j'apprends en ce moment, donc c'était l'occasion de pratiquer.

Vite sert à lancer le projet en local et à le compiler. Le build donne des fichiers statiques, donc le site peut rester sur GitHub Pages, sans serveur.

## Utilisation de l'IA

Le fichier de CI/CD est basé sur le modèle de la documentation de Vite pour GitHub Pages. Comme je découvrais la CI/CD, je l'ai adapté avec l'aide de l'IA pour ajouter le lint et les tests avant la mise en ligne, et elle m'a aussi donné quelques astuces primordiales (activer Pages avec GitHub Actions, vérifier les résultats dans l'onglet Actions). Elle m'a aussi généré les fichiers .svg pour la démonstration de l'API bouchon.

## CI/CD

À chaque push sur `main`, GitHub Actions :

1. installe le projet, vérifie le code (lint), lance les tests et fait le build ;
2. si tout passe, met le site à jour sur GitHub Pages.

Le fichier est dans `.github/workflows/ci-cd.yml`, et les résultats sont dans l'onglet Actions.

## Lancer en local

Avec Node.js 22 ou plus :

```
npm install
npm run dev
```

Puis ouvrir http://localhost:5173/de-la-terre-a-la-lune/

## API utilisées

- [wheretheiss.at](https://wheretheiss.at) pour la position de l'ISS
- [NASA](https://api.nasa.gov) pour la photo du jour et les astéroïdes. Les réponses sont gardées une heure dans le navigateur, pour ne pas dépasser le quota de la clé publique `DEMO_KEY`.
- [OpenStreetMap](https://www.openstreetmap.org/copyright) et [Leaflet](https://leafletjs.com) pour la carte
