import { Link } from 'react-router-dom';
// Mui
import {
    AppBar, Toolbar, Button,
} from '@mui/material';

function Header() {
    return (
        <AppBar component="header" position="static" sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between' }}>
                <Button color="inherit">VélO'</Button>
                <div>
                    <Button color="inherit">Accueil</Button>
                    <Button color="inherit">Liste de vélos</Button>
                    <Button color="inherit">Démarrer une location</Button>
                    <Button color="inherit">Terminer une location</Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}
export default Header;