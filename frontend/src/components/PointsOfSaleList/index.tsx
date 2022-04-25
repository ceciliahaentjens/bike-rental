import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

// Mui
import { Container, Typography, Box, Button, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';

// Queries
import { GetAllPointsOfSale_getAllPointsOfSale, GetAllPointsOfSale } from '../../apollo/queries/__generated__/GetAllPointsOfSale';
import { GET_ALL_POINTS_OF_SALE } from '../../apollo/queries/allPointsOfSale';

function PointsOfSaleList() {
    console.log(localStorage.getItem('stored-point-of-sale'));
    // Je récupère les données de ma query
    const { data: pointsOfSaleData } = useQuery<GetAllPointsOfSale>(GET_ALL_POINTS_OF_SALE);

    // Je récupère le point de vente enregistré par l'utilisateur
    const [storedPointOfSale, setStoredPointOfSale] = useState(() => {
        // Je récupère la donnée dans le localStorage
        const stored = localStorage.getItem('stored-point-of-sale');
        const initialValue = stored !== null ? JSON.parse(stored) : null;
        return initialValue;
    });

    // Je mets à jour le point de vente sélectionné par l'utilisateur
    const [selectedPointOfSale, setSelectedPointOfSale] = useState(storedPointOfSale !== null ? storedPointOfSale : 1);

    console.log(storedPointOfSale);

    // Si le point de vente enregistré par l'utilisateur change, je change le localStorage
    useEffect(() => {
        localStorage.setItem('stored-point-of-sale', JSON.stringify(storedPointOfSale));
    }, [storedPointOfSale]);

    return (
        <Container>
            {/* Si l'utilisateur n'a pas sauvegardé de point de vente */}
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Stack>
                    {
                        storedPointOfSale === null
                            ? <Typography variant="body1" sx={{mb:2}}>Veuillez renseigner votre point de vente&nbsp;:</Typography>
                            : <Typography variant="body1" sx={{mb:2}}>Votre connexion actuelle est liée au point de vente suivant&nbsp;:</Typography>
                    }
                    <FormControl fullWidth>
                        <InputLabel id="point-of-sale-select-label">Point de vente</InputLabel>
                        <Select
                            labelId="point-of-sale-select-label"
                            id="point-of-sale-select"
                            label="Point de vente"
                            value={selectedPointOfSale}
                            onChange={(event) => {
                                const selected = Number(event.target.value)
                                setSelectedPointOfSale(selected);
                            }}
                        >
                            {
                                pointsOfSaleData && pointsOfSaleData.getAllPointsOfSale.map((pointOfSale: GetAllPointsOfSale_getAllPointsOfSale) => (
                                    <MenuItem key={pointOfSale.id} value={pointOfSale.id}>{pointOfSale.label}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            alignSelf: 'center'
                        }}
                        onClick={() => {
                            setStoredPointOfSale(JSON.stringify(selectedPointOfSale))
                        }}
                    >
                        {
                            storedPointOfSale === null ? 'Valider' : 'Changer de point de vente'
                        }
                    </Button>
                </Stack>
                {
                    storedPointOfSale !== null && (
                        <Stack sx={{ mt: 6 }}>
                            <Button fullWidth color="success" variant="contained" sx={{ mt: 2 }}>Démarrer une location</Button>
                            <Button fullWidth color="warning" variant="contained" sx={{ mt: 2 }}>Réceptionner une location</Button>
                            <Button fullWidth color="primary" variant="contained" sx={{ mt: 2 }}>Voir tous les vélos</Button>
                        </Stack>
                    )
                }
            </Box>
        </Container>
    );

}

export default PointsOfSaleList;