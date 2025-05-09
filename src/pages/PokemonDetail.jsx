import { Typography, Box, Chip, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { typeColors } from '../utils/typeColors'

function PokemonDetail({ pokemon, spriteIndex }) {
    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>{pokemon.english_name} (#{spriteIndex + 1})</Typography>
            <img
                src={`/src/assets/sprites/${spriteIndex + 1}.png`}
                alt={pokemon.english_name}
                width="300"
            />

            <Typography variant="h6" mt={2}>Types</Typography>
            <Box mb={2}>
                {[pokemon.type1, pokemon.type2].filter(Boolean).map((type, idx) => {
                    const bgColor = typeColors[type] || '#ccc'
                    const textColor = ['ghost', 'dark', 'dragon', 'poison', 'rock', 'steel'].includes(type) ? '#fff' : '#000'

                    return (
                        <Chip
                            key={type}
                            label={type.toUpperCase()}
                            sx={{
                            ml: idx > 0 ? 1 : 0,
                            bgcolor: bgColor,
                            color: textColor,
                            borderRadius: '16px',
                            fontWeight: 'bold',
                            textTransform: 'capitalize'
                            }}
                        />
                    );
                })}
            </Box>

            <Typography variant="h6" mt={3}>TM & HM Moves</Typography>
<Table size="small" sx={{ mb: 4 }}>
  <TableHead>
    <TableRow>
      <TableCell>Name</TableCell>
      <TableCell>Machine</TableCell>
      <TableCell>Type</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {pokemon.gen1_moves
      .filter(move => move.machine)
      .map(move => (
        <TableRow key={move.name}>
          <TableCell>{move.name}</TableCell>
          <TableCell>{move.machine.toUpperCase()}</TableCell>
          <TableCell>
            <Chip
              label={move.type.toUpperCase()}
              size="small"
              sx={{
                bgcolor: typeColors[move.type] || '#ccc',
                color: ['ghost', 'dark', 'dragon', 'poison', 'rock', 'steel'].includes(move.type) ? '#fff' : '#000',
                borderRadius: '12px',
                textTransform: 'capitalize',
                fontSize: '0.75rem',
                height: '22px'
              }}
            />
          </TableCell>
        </TableRow>
      ))}
  </TableBody>
</Table>

<Typography variant="h6" mt={3}>Level-up / Self-learned Moves</Typography>
<Table size="small">
  <TableHead>
    <TableRow>
      <TableCell>Name</TableCell>
      <TableCell>Level</TableCell>
      <TableCell>Type</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {pokemon.gen1_moves
      .filter(move => !move.machine && move.learn_method === 'level-up')
      .map(move => (
        <TableRow key={move.name}>
          <TableCell>{move.name}</TableCell>
          <TableCell>{move.level_learned_at ?? '—'}</TableCell>
          <TableCell>
            <Chip
              label={move.type.toUpperCase()}
              size="small"
              sx={{
                bgcolor: typeColors[move.type] || '#ccc',
                color: ['ghost', 'dark', 'dragon', 'poison', 'rock', 'steel'].includes(move.type) ? '#fff' : '#000',
                borderRadius: '12px',
                textTransform: 'capitalize',
                fontSize: '0.75rem',
                height: '22px'
              }}
            />
          </TableCell>
        </TableRow>
      ))}
  </TableBody>
</Table>


            <Typography variant="h6">Evolution</Typography>
            <Typography>{pokemon.evolution_relation} ({pokemon.evolution_count} related)</Typography>
        </Box>
    )
}

export default PokemonDetail
