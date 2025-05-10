// src/pages/PokedexView.jsx
import { useParams } from 'react-router-dom';
import { Box, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import dex from '../data/dex.json';
import PokemonDetail from './PokemonDetail';
import { useState, useRef, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function PokedexView() {
  const [selectedName, setSelectedName] = useState(dex[0].name); // default to first
  const pokemon = dex.find(p => p.name === selectedName);
  const spriteIndex = dex.findIndex(p => p.name === selectedName);
  const [team, setTeam] = useState([]);
  const [searchText, setSearchText] = useState('')
  const searchInputRef = useRef(null)
  const filteredDex = dex.filter(p =>
  p.english_name.toLowerCase().includes(searchText.toLowerCase())
);

  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    } else if (e.key === 'Escape') {
      searchInputRef.current?.blur();
      setSearchText('');
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);



  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>

      {/* Left: Pokémon grid list */}
      <Box sx={{ width: '30%', overflowY: 'auto', borderRight: '2px solid #355E3B', padding: 2 }}>
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            backgroundColor: '#355E3B',
            zIndex: 1,
            paddingBottom: 1
          }}
        >
          <input
            ref={searchInputRef}
            tabIndex="-1" // Ensures it's focusable programmatically
            type="text"
            placeholder='Press "/" to search'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: 0, // ⬅️ square edges
              fontFamily: 'PokemonEmerald, monospace', // ⬅️ custom font
              backgroundColor: 'white',
              color: 'black'
            }}
          />
        </Box>
        {filteredDex.length === 0 ? (
  <Typography variant="body2" sx={{ color: 'white', textAlign: 'center', mt: 2 }}>
    No results
  </Typography>
) : (
        <Grid container spacing={2}>
          {dex
            .filter(p => p.english_name.toLowerCase().includes(searchText.toLowerCase()))
            .map((poke, idx) => (
            <Grid item xs={12} key={poke.name}>
                <Card
                  onMouseEnter={() => setSelectedName(poke.name)}
                  onClick={() => {
                    if (team.length < 6) {
                      setTeam([...team, poke.name]); // add if not
                    }
                  }}
                  sx={{
                    backgroundColor: team.filter(n => n === poke.name).length > 0 ? 'white' : '#355E3B',
                    color: team.filter(n => n === poke.name).length > 0 ? 'black' : 'white',
                    borderRadius: 2,
                    textAlign: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                    ':hover': { opacity: 0.8 }
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`/src/assets/sprites/${idx + 1}.png`}
                    alt={poke.english_name}
                    sx={{ width: '100px', height: '100px', margin: 'auto', pt: 1 }}
                  />
                  <CardContent sx={{ paddingBottom: 1 }}>
                    <Typography variant="body2">{poke.english_name} #{idx + 1}</Typography>
                    {team.filter(n => n === poke.name).length > 0 && (
                      <Typography variant="caption">
                        x{team.filter(n => n === poke.name).length}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
            </Grid>
          ))}
        </Grid>
        )}
      </Box>

      {/* Middle: Pokémon detail */}
      <Box sx={{ width: '40%', padding: 3, overflowY: 'auto' }}>
        {pokemon ? (
          <PokemonDetail
            pokemon={pokemon}
            spriteIndex={spriteIndex}
            onAddToTeam={() => {
              if (pokemon && !team.includes(pokemon.name) && team.length < 6) {
                setTeam([...team, pokemon.name]);
              }
            }}
            isInTeam={team.includes(pokemon?.name)}
          />
        ) : (
          <Typography variant="h5">Select a Pokémon</Typography>
        )}
      </Box>

      {/* Right panel */}
      <Box sx={{ width: '30%', padding: 2, overflowY: 'auto', backgroundColor: '#355E3B', color: 'white' }}>
        <Typography variant="h6" mb={2}>Your Team ({team.length}/6) <button
         onClick={() => setTeam([])}
         style={{
           background: 'none',
           color: 'white',
           border: '1px solid white',
           padding: '4px 8px',
           borderRadius: '4px',
           cursor: 'pointer',
           display: 'inline'
         }}
        >Clear</button></Typography>
        
        {team.map((name, i) => {
          const poke = dex.find(p => p.name === name);
          const index = dex.findIndex(p => p.name === name);
          return (
            <Box
              key={i}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1,
                backgroundColor: '#2e6631',
                borderRadius: 2,
                padding: 1
              }}
            >
              <img
                src={`/src/assets/sprites/${index + 1}.png`}
                alt={poke.english_name}
                width="40"
                style={{ marginRight: 8 }}
              />
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                {poke.english_name}
              </Typography>
              <IconButton
                size="small"
                sx={{ color: 'white' }}
                onClick={() => {
                  const newTeam = [...team];
                  newTeam.splice(i, 1);
                  setTeam(newTeam);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          );
        })}
      </Box>

    </Box>
  );
}

export default PokedexView;
