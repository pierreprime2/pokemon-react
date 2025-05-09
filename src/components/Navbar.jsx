import { AppBar, Toolbar, Typography, Button } from '@mui/material'

function Navbar() {
    return (
        <AppBar
            position="fixed"
            sx={{ backgroundColor: '#355E3B' }}
        >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Pokémon Arena
                </Typography>
                <Button color="inherit">Home</Button>
                <Button color="inherit">Fight</Button>
                <Button color="inherit">Statistics</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;