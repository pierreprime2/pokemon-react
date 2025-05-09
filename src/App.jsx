import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import PokedexView from './pages/PokedexView';

function App() {
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
