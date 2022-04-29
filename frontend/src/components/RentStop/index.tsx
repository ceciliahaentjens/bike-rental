import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useNavigate, useParams } from 'react-router';
import { Nullable } from '../../types';

// Mui
import { Container, Typography, Divider, Box, Button, FormControl, InputLabel, Select, MenuItem, Stack, Alert } from '@mui/material';

// Queries
import { SearchBike_searchBike } from '../../apollo/queries/__generated__/SearchBike';
import { GET_BIKE_DETAILS } from '../../apollo/queries/bikeDetails';
import { GetBikeDetails, GetBikeDetails_getBike_rents } from '../../apollo/queries/__generated__/GetBikeDetails';
import { GetAllPointsOfSale_getAllPointsOfSale, GetAllPointsOfSale } from '../../apollo/queries/__generated__/GetAllPointsOfSale';
import { GET_ALL_POINTS_OF_SALE } from '../../apollo/queries/allPointsOfSale';

// Mutations
import { stopRent, stopRentVariables } from '../../apollo/mutations/__generated__/stopRent';
import { STOP_RENT } from '../../apollo/mutations/stopRent';

// Homemade Cmp
import BikeSearchAutocompleteCmp from '../BikeSearch';

// Contexte
import { usePointOfSaleContext } from '../../contexts/pointOfSale';

function RentStop() {
    const navigate = useNavigate();
    const { storedPointOfSale } = usePointOfSaleContext();

    // Je récupère l'id passé en param si il existe
    const { id } = useParams();
    const bikeId = Number(id);

    // State variables
    const [selectedBike, setSelectedBike] = useState<Nullable<SearchBike_searchBike>>(null);
    const [rentToDisplay, setRentToDisplay] = useState<Nullable<GetBikeDetails_getBike_rents>>(null);
    const [selectedPointOfSale, setSelectedPointOfSale] = useState<number>(() => {
        return storedPointOfSale.pointOfSale && storedPointOfSale.pointOfSale.id ? storedPointOfSale.pointOfSale.id : 1;
    });
    
    // Gestion des lazy queries
    const [getPointOfSales, { data: pointsOfSaleData }] = useLazyQuery<GetAllPointsOfSale>(GET_ALL_POINTS_OF_SALE);
    const [getBike, { data: bikeData }] = useLazyQuery<GetBikeDetails>(GET_BIKE_DETAILS, {
        variables: {
            getBikeId: selectedBike?.id
        }
    });

    // À chaque fois que bikeData change (et si on a bien récupéré les données)
    // On execute l'effet suivant
    useEffect(() => {
        // On vérifie qu'on a bien récupéré un vélo ayant des locations
        if (bikeData && bikeData.getBike?.rents !== null) {
            // On récupère la première location qui n'a pas de date de retour (location en cours)
            const currentBikeRent = bikeData.getBike?.rents.find((rent: GetBikeDetails_getBike_rents) => rent.back_date === null);
            
            setRentToDisplay(currentBikeRent ?? null);

            // On récupère les points de vente
            getPointOfSales();
        }
    }, [bikeId, bikeData, getPointOfSales])

    // Gestion de la soumission du formulaire
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [stopRent] = useMutation<stopRent, stopRentVariables>(STOP_RENT, {
        onError: (error) => {
            setErrorMessage(error.message)
        },
        onCompleted: (data) => {
            navigate(`/bikes/${data.stopRent?.bike.id}`);
        }
    })

    function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        
        if (rentToDisplay && selectedPointOfSale && selectedBike) {
            stopRent({
                variables: {
                    input: {
                        rent_id: rentToDisplay.id,
                        bike_id: selectedBike.id,
                        return_point_of_sale_id: selectedPointOfSale,
                    }
                }
            })
        }
    }

    return (
        <Container>
            <Typography variant="h2" sx={{ mb: 6, textAlign: 'center' }}>Terminer une location</Typography>
            <Box>
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <Stack direction="row" justifyContent="flex-start" spacing={3}>
                    <BikeSearchAutocompleteCmp
                        status="RENT"
                        bikeId={bikeId}
                        selectedBike={selectedBike}
                        setSelectedBike={setSelectedBike}
                    />
                    <Button
                        variant="contained"
                        onClick={() => { getBike(); }}
                    >Suivant</Button>
                </Stack>
                {
                    rentToDisplay !== null && (
                        <Box sx={{ mt:6 }}
                            component="form"
                            onSubmit={handleSubmit}
                        >
                            <Divider variant="middle" sx={{ mb:6}} />
                            <Stack direction="column" spacing={1}>
                                <Typography variant="h4">Location #{rentToDisplay.id}</Typography>
                                <Typography variant="body1">Nom&nbsp;: {rentToDisplay.client_lastname}</Typography>
                                <Typography variant="body1">Prénom&nbsp;: {rentToDisplay.client_firstname}</Typography>
                                <Typography variant="body1">Loué au point de vente&nbsp;: {rentToDisplay.rent_point_of_sale.label}</Typography>
                                <Typography variant="body1">Date de retour prévue le&nbsp;: {rentToDisplay.back_date_planned}</Typography>
                            </Stack>
                            <Stack direction="row" spacing={4} sx={{ mt:4 }}>
                                <FormControl sx={{ minWidth: 280 }}>
                                    <InputLabel id="point-of-sale-select-label">Point de retour</InputLabel>
                                    <Select
                                        labelId="point-of-sale-select-label"
                                        id="point-of-sale-select"
                                        label="Point de vente"
                                        value={selectedPointOfSale}
                                        onChange={(event) => {
                                            const selected = Number(event.target.value);
                                            setSelectedPointOfSale(selected);
                                        }}
                                    >
                                        {
                                            pointsOfSaleData && pointsOfSaleData.getAllPointsOfSale.map((pointOfSaleItem: GetAllPointsOfSale_getAllPointsOfSale) => (
                                                <MenuItem key={pointOfSaleItem.id} value={pointOfSaleItem.id}>{pointOfSaleItem.label}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <Button type="submit" variant="contained">Valider le retour</Button>
                            </Stack>
                        </Box>
                    )
                }
            </Box>
        </Container>
    );

}

export default RentStop;