import { Link } from 'react-router-dom';
// Mui
import {
    AppBar, Toolbar, Button, Typography, Box
} from '@mui/material';

import { GetAllPointsOfSale_getAllPointsOfSale } from '../../apollo/queries/__generated__/GetAllPointsOfSale';

type HeaderProps = {
    storedPointOfSale: GetAllPointsOfSale_getAllPointsOfSale | null
}

function Header({ storedPointOfSale }: HeaderProps) {
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
                        storedPointOfSale !== null && (
                            <Typography color="warning" sx={{ mr: 2 }}>Point de vente actuel&nbsp;: {storedPointOfSale.label}</Typography>
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