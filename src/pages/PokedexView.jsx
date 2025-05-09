// src/pages/PokedexView.jsx
import { useParams, Link } from 'react-router-dom';
import { Box, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import dex from '../data/dex.json';
import PokemonDetail from './PokemonDetail';

function PokedexView() {
  const { name } = useParams();
  const pokemon = dex.find(p => p.name === name);
  const spriteIndex = dex.findIndex(p => p.name.toLowerCase() === name.toLowerCase());

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Left: Pokémon grid list */}
      <Box sx={{ width: '33%', overflowY: 'auto', borderRight: '2px solid #355E3B', padding: 2 }}>
        <Grid container spacing={2}>
          {dex.map((poke, idx) => (
            <Grid item xs={12} key={poke.name}>
              <Link to={`/pokedex/${poke.name}`} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    backgroundColor: '#355E3B',
                    color: 'white',
                    borderRadius: 2,
                    textAlign: 'center',
                    ':hover': { opacity: 0.8 }
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`/src/assets/sprites/${idx + 1}.png`}
                    alt={poke.english_name}
                    sx={{ width: '80px', height: '80px', margin: 'auto', pt: 1 }}
                  />
                  <CardContent sx={{ paddingBottom: 1 }}>
                    <Typography variant="body2">{poke.english_name}</Typography>
                    <Typography variant="caption">#{idx + 1}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Right: Pokémon detail */}
      <Box sx={{ width: '67%', padding: 3, overflowY: 'auto' }}>
        {pokemon ? (
          <PokemonDetail pokemon={pokemon} spriteIndex={dex.findIndex(p => p.name === pokemon.name)} />
        ) : (
          <Typography variant="h5">Select a Pokémon</Typography>
        )}
      </Box>
    </Box>
  );
}

export default PokedexView;
