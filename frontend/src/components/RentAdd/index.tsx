import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate, useParams } from 'react-router';
import { Nullable } from '../../types';

// Mui
import { Alert, Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// Queries
import { GetAllPointsOfSale_getAllPointsOfSale, GetAllPointsOfSale } from '../../apollo/queries/__generated__/GetAllPointsOfSale';
import { GET_ALL_POINTS_OF_SALE } from '../../apollo/queries/allPointsOfSale';
import { SearchBike_searchBike } from '../../apollo/queries/__generated__/SearchBike';

// Mutations
import { addRent, addRentVariables } from '../../apollo/mutations/__generated__/addRent';
import { ADD_RENT } from '../../apollo/mutations/addRent';

// Helpers
import { getTomorrow } from '../../helpers/moment';

// Homemade Cmp
import BikeSearchAutocompleteCmp from '../BikeSearch';

function RentAdd() {
    const navigate = useNavigate();

    // Je récupère l'id passé en param si il existe
    const { id } = useParams();
    const bikeId = Number(id);

    // State variables
    const [clientLastname, setClientLastname] = useState<string>('');
    const [clientFirstname, setClientFirstname] = useState<string>('');
    const [selectedPointOfSale, setSelectedPointOfSale] = useState<number>(1);
    const [selectedReturnDate, setSelectedReturnDate] = useState<Date | null>(() => getTomorrow());
    const [selectedBike, setSelectedBike] = useState<Nullable<SearchBike_searchBike>>(null);

    // Update the return date
    const changeReturnDate = (newValue: any) => {
        setSelectedReturnDate(newValue?.toDate());
    };

    // Je récupère mes points de vente
    const { data: pointsOfSaleData } = useQuery<GetAllPointsOfSale>(GET_ALL_POINTS_OF_SALE);

    // Si selectedBike change, je change le point de vente
    useEffect(() => {
        setSelectedPointOfSale(selectedBike ? selectedBike.point_of_sale.id : 1);
    }, [selectedBike])

    // Gestion de l'ajout d'une nouvelle location
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [addRent, { error }] = useMutation<addRent, addRentVariables>(ADD_RENT, {
        onError: (error) => {
            console.log(error)
        },
        onCompleted: (data) => {
            navigate(`/bikes/${data.createRent?.bike.id}`);
        }
    })

    async function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault();

        if (selectedPointOfSale && selectedBike) {
            addRent({
                variables: {
                    input: {
                        client_firstname: clientFirstname,
                        client_lastname: clientLastname,
                        bike_id: selectedBike.id,
                        rent_point_of_sale_id: selectedPointOfSale,
                        back_date_planned: selectedReturnDate
                    }
                }
            })
        }

    }

    return (
        <Container>
            <Typography variant="h2" sx={{ mb: 6, textAlign: 'center' }}>Démarrer une location</Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
            >
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <Stack direction="row" justifyContent="flex-start" spacing={6}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Nom du client"
                        value={clientLastname}
                        onChange={(event) => {
                            setClientLastname(event.target.value);
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Prénom du client"
                        value={clientFirstname}
                        onChange={(event) => {
                            setClientFirstname(event.target.value);
                        }}
                    />
                </Stack>
                <Stack direction="row" justifyContent="flex-start" spacing={6} sx={{ mt:6 }}>
                    <BikeSearchAutocompleteCmp
                        bikeId={bikeId}
                        selectedBike={selectedBike}
                        setSelectedBike={setSelectedBike}
                    />
                    <FormControl sx={{ m: 1, minWidth: 280 }}>
                        <InputLabel id="point-of-sale-select-label">Point de vente</InputLabel>
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
                                pointsOfSaleData && pointsOfSaleData.getAllPointsOfSale.map((pointOfSale: GetAllPointsOfSale_getAllPointsOfSale) => (
                                    <MenuItem key={pointOfSale.id} value={pointOfSale.id}>{pointOfSale.label}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="row" justifyContent="flex-start" spacing={6} sx={{ mt:6 }}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateTimePicker
                            label="Date de retour"
                            value={selectedReturnDate}
                            onChange={changeReturnDate}
                            renderInput={(params) => <TextField required {...params} />}
                        />
                    </LocalizationProvider>
                </Stack>
                <Button type="submit" variant="contained" sx={{ mt:4 }}>Démarrer la location</Button>
            </Box>
        </Container>
    );

}

export default RentAdd;