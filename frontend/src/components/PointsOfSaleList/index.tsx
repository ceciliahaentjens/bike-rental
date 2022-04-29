import React, { Dispatch, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

// Mui
import { Container, Typography, Box, Button, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';

// Queries
import { GetAllPointsOfSale_getAllPointsOfSale, GetAllPointsOfSale } from '../../apollo/queries/__generated__/GetAllPointsOfSale';
import { GET_ALL_POINTS_OF_SALE } from '../../apollo/queries/allPointsOfSale';
import { Link } from 'react-router-dom';


type IndexProps = {
    storedPointOfSale: GetAllPointsOfSale_getAllPointsOfSale | null,
    setStoredPointOfSale: Dispatch<any>
}

function PointsOfSaleList({ storedPointOfSale, setStoredPointOfSale }: IndexProps) {
    // Je récupère les données de ma query
    const { data: pointsOfSaleData } = useQuery<GetAllPointsOfSale>(GET_ALL_POINTS_OF_SALE);

    // Je récupère le point de vente enregistré par l'utilisateur

    // Je mets à jour le point de vente sélectionné par l'utilisateur
    const [selectedPointOfSale, setSelectedPointOfSale] = useState(storedPointOfSale !== null ? storedPointOfSale.id : 1);

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
                            : <Typography variant="body1" sx={{mb:2}}>Votre connexion actuelle est liée au point de vente suivant&nbsp;: {storedPointOfSale.label}</Typography>
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
                            // Je récupère l'objet du point de vente sauvegardé
                            const newPointOfSale = pointsOfSaleData?.getAllPointsOfSale.find(element => element.id === selectedPointOfSale);
                            // J'ajoute le timestamp pour l'expiration
                            localStorage.setItem('stored-point-of-sale-expire', JSON.stringify(Date.now()));
        
                            // Je mets à jour mon localStorage
                            setStoredPointOfSale(newPointOfSale)
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
                            <Button fullWidth color="success" variant="contained" sx={{ mt: 2 }} component={Link} to="/rents/new">Démarrer une location</Button>
                            <Button fullWidth color="warning" variant="contained" sx={{ mt: 2 }} component={Link} to="/rents/stop">Réceptionner une location</Button>
                            <Button fullWidth color="primary" variant="contained" sx={{ mt: 2 }} component={Link} to="/bikes">Voir tous les vélos</Button>
                        </Stack>
                    )
                }
            </Box>
        </Container>
    );

}

export default PointsOfSaleList;