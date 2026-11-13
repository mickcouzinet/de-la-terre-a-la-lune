import Iss from './components/Iss.jsx';
import Comparatif from './components/Comparatif.jsx';
import PhotoDuJour from './components/PhotoDuJour.jsx';
import Asteroides from './components/Asteroides.jsx';

export default function App() {
  return (
    <>
      <header>
        <h1>De la Terre à la Lune en direct</h1>
        <p>Le roman de Jules Verne (1865) comparé aux données de la NASA et à la position de la Station spatiale internationale.</p>
      </header>

      <main>
        <Iss />
        <Comparatif />

        <section id="nasa">
          <h2>Les données NASA du jour</h2>
          <div className="nasa-contenu">
            <PhotoDuJour />
            <Asteroides />
          </div>
        </section>
      </main>

      <footer>
        <p>
          Données : <a href="https://science.nasa.gov">NASA Science</a> (photo du jour),{' '}
          <a href="https://api.nasa.gov">API NASA</a> (astéroïdes),{' '}
          <a href="https://wheretheiss.at">wheretheiss.at</a>, carte{' '}
          <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>.
        </p>
        <p><a href="https://github.com/mickcouzinet/de-la-terre-a-la-lune">Code source sur GitHub</a></p>
      </footer>
    </>
  );
}
