import { Link } from 'react-router-dom';
// Mui
import {
    AppBar, Toolbar, Button, Typography, Box
} from '@mui/material';

// Contexte
import { usePointOfSaleContext } from '../../contexts/pointOfSale';

function Header() {
    const { storedPointOfSale } = usePointOfSaleContext();

    return (
        <AppBar component="header" position="static" sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between' }}>
                <Button color="inherit" component={Link} to='/'>VélO'</Button>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {
                        storedPointOfSale.pointOfSale && (
                            <Typography color="warning" sx={{ mr: 2 }}>Point de vente actuel&nbsp;: {storedPointOfSale.pointOfSale.label}</Typography>
                        )
                    }
                    <Button color="inherit" component={Link} to='/'>Accueil</Button>
                    <Button color="inherit" component={Link} to='/bikes'>Liste de vélos</Button>
                    <Button color="inherit" component={Link} to='/rents/new'>Démarrer une location</Button>
                    <Button color="inherit" component={Link} to='/rents/stop'>Terminer une location</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
export default Header;