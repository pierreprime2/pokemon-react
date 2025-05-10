import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import PokedexView from './pages/PokedexView';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const disableZoomWheel = (e) => {
      if (e.ctrlKey) e.preventDefault();
    };
    const disableZoomKeys = (e) => {
      if ((e.ctrlKey || e.metaKey) && ['+', '-', '=', '_'].includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', disableZoomWheel, { passive: false });
    window.addEventListener('keydown', disableZoomKeys);

    return () => {
      window.removeEventListener('wheel', disableZoomWheel);
      window.removeEventListener('keydown', disableZoomKeys);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{paddingTop:'64px'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex/:name" element={<PokedexView />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
