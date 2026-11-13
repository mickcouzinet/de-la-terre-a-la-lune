export const comparaisons = [
  {
    sujet: 'Le pas de tir',
    roman: 'Stone\'s Hill, près de Tampa, en Floride. Le Gun-Club cherche un site entre 0° et 28° de latitude pour que la Lune passe à la verticale du canon.',
    realite: 'Apollo et Artemis décollent du Kennedy Space Center, en Floride aussi, à environ 195 km de Tampa.',
    verdict: 'vu-juste',
    source: 'https://en.wikipedia.org/wiki/From_the_Earth_to_the_Moon'
  },
  {
    sujet: 'La date',
    roman: 'Le 1er décembre, à 22 h 46 min 40 s précises.',
    realite: 'Apollo 8, le premier équipage à faire le tour de la Lune, décolle le 21 décembre 1968.',
    verdict: 'clin-doeil',
    source: 'https://www.nasa.gov/mission_pages/apollo/missions/apollo8.html'
  },
  {
    sujet: 'L\'équipage',
    roman: 'Trois voyageurs : Barbicane, le capitaine Nicholl et le Français Michel Ardan.',
    realite: 'Trois astronautes pour Apollo 8 et Apollo 11, quatre pour Artemis II en avril 2026.',
    verdict: 'vu-juste',
    source: 'https://en.wikipedia.org/wiki/From_the_Earth_to_the_Moon'
  },
  {
    sujet: 'Le lanceur',
    roman: 'La Columbiad, un canon de 900 pieds (environ 274 m) creusé dans le sol.',
    realite: 'Une fusée à plusieurs étages qui accélère pendant plusieurs minutes. Saturn V mesurait 110 m.',
    verdict: 'rate',
    source: 'https://www.gutenberg.org/files/799/799-h/799-h.htm'
  },
  {
    sujet: 'La vitesse de départ',
    roman: '12 000 yards par seconde, soit environ 10,97 km/s.',
    realite: 'Il faut 11,2 km/s pour échapper à l\'attraction de la Terre. Verne était très proche.',
    verdict: 'presque',
    source: 'https://www.gutenberg.org/files/799/799-h/799-h.htm'
  },
  {
    sujet: 'Le choc du départ',
    roman: 'Une couche d\'eau sous le plancher du boulet doit amortir le coup de canon.',
    realite: 'Passer de 0 à 11 km/s sur 274 m, c\'est environ 22 400 g. Le record supporté par un humain est d\'environ 46 g (John Stapp, 1954).',
    verdict: 'rate',
    source: 'https://www.gutenberg.org/files/799/799-h/799-h.htm'
  },
  {
    sujet: 'La durée du voyage',
    roman: '97 h 13 min 20 s jusqu\'à la Lune.',
    realite: 'Apollo 11 s\'est placé en orbite lunaire après environ 76 h de vol, Apollo 8 après environ 69 h.',
    verdict: 'presque',
    source: 'https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_11g_Lunar_Orbit_Phase.htm'
  },
  {
    sujet: 'Le nom',
    roman: 'Columbiad, le nom du canon géant.',
    realite: 'Columbia, le module de commande d\'Apollo 11.',
    verdict: 'clin-doeil',
    source: 'https://en.wikipedia.org/wiki/From_the_Earth_to_the_Moon'
  },
  {
    sujet: 'Le tour de la Lune',
    roman: 'Dans la suite (Autour de la Lune), le boulet fait le tour de la Lune sans s\'y poser, puis revient vers la Terre.',
    realite: 'C\'est ce qu\'ont fait Apollo 8 en 1968 et Artemis II en avril 2026, sans alunir.',
    verdict: 'vu-juste',
    source: 'https://www.nasa.gov/history/apollo-8-mission-details/'
  },
  {
    sujet: 'Le retour',
    roman: 'Le boulet tombe dans le Pacifique et les voyageurs sont repêchés par la corvette Susquehanna.',
    realite: 'Apollo 8, Apollo 11 et Artemis II ont tous amerri dans le Pacifique.',
    verdict: 'vu-juste',
    source: 'https://www.foxweather.com/earth-space/artemis-ii-capsule-splashes-down-closing-one-mission-ushering-new-era-human-spaceflight'
  }
];

export const VERDICTS = {
  'vu-juste': 'Vu juste',
  'presque': 'Presque',
  'rate': 'Raté',
  'clin-doeil': 'Clin d\'œil'
};
