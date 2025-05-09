import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material'
import { Link } from 'react-router-dom';
import dex from '../data/dex.json';

const TOTAL_POKEMON = 50;

function Home() {
    const pokemonList = Array.from({ length: TOTAL_POKEMON }, (_, i) => i + 1)

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Welcome to Pokémon arena</h2>
            <p>Choose your Pokémon team and prepare for battle!</p>

            <Grid container spacing={2}>
                {dex.map((poke) => (
                    <Grid item-xs={6} sm={4} md={3} lg={2} key={poke.name}>
                        <Link to={`/pokedex/${poke.name}`} style={{ textDecoration: 'none' }}>
                            <Card
                                sx={{
                                    backgroundColor: '#355E3B',
                                    color: 'white',
                                    borderRadius: 2,
                                    textAlign: 'center',
                                    paddingBottom: 1
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={`/src/assets/sprites/${dex.indexOf(poke) + 1}.png`}
                                    alt={poke.english_name}
                                    sx={{ width: '100px', height: '100px', margin: 'auto', paddingTop: '1rem' }}
                                />
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="body1">{poke.english_name}</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Home
