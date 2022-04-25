// MUI
import {
    Container, Divider, Box, Typography
} from '@mui/material';

function Footer() {
    return (
        <Container component="footer" maxWidth="lg" sx={{ mt: 4 }}>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
                <Typography gutterBottom sx={{ textAlign: 'center' }}>
                    VélO' - © 2022
                </Typography>
            </Box>
        </Container>
    );
}

export default Footer;