import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { useNavigate, useParams } from 'react-router';
import { Nullable } from '../../types';


// Mui
import { Alert, Autocomplete, Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// Queries
import { GetAllPointsOfSale_getAllPointsOfSale, GetAllPointsOfSale } from '../../apollo/queries/__generated__/GetAllPointsOfSale';
import { GET_ALL_POINTS_OF_SALE } from '../../apollo/queries/allPointsOfSale';
import { SearchBike, SearchBikeVariables, SearchBike_searchBike } from '../../apollo/queries/__generated__/SearchBike';
import { SEARCH_BIKE } from '../../apollo/queries/searchBike';

// Mutations
import { addRent, addRentVariables } from '../../apollo/mutations/__generated__/addRent';
import { ADD_RENT } from '../../apollo/mutations/addRent';

// Helpers
import { getTomorrow } from '../../helpers/moment'

type RentProps = {
    bikeId?: Number
}

function RentAdd({ bikeId }: RentProps) {
    const navigate = useNavigate();

    // State variables
    const [clientLastname, setClientLastname] = useState<string>('');
    const [clientFirstname, setClientFirstname] = useState<string>('');
    const [selectedPointOfSale, setSelectedPointOfSale] = useState<number |undefined>(1);
    const [selectedReturnDate, setSelectedReturnDate] = useState<Date | null>(() => getTomorrow());
    // Update the return date
    const changeReturnDate = (newValue: any) => {
        setSelectedReturnDate(newValue?.toDate());
    };

    // Je récupère mes points de vente
    const { data: pointsOfSaleData } = useQuery<GetAllPointsOfSale>(GET_ALL_POINTS_OF_SALE);

    // Gestion de la recherche du vélo
    const [searchPredicate, setSearchPredicate] = useState<string>('');
    const [selectedBike, setSelectedBike] = useState<Nullable<SearchBike_searchBike>>(null);

    const [searchBikes, { data: searchData }] = useLazyQuery<SearchBike>(SEARCH_BIKE, {
        variables: {
            searchTerm: searchPredicate
        }
    });
    // On lance la recherche au fur et à mesure
    useEffect(() => {
        if (searchPredicate !== '') {
            searchBikes();
        }
    }, [searchBikes, searchPredicate]);

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

        console.log(clientLastname);
        console.log(clientFirstname);
        console.log(selectedBike);
        console.log(selectedPointOfSale);
        console.log(selectedReturnDate);

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
                    <Autocomplete
                        options={searchData?.searchBike ?? []}
                        // Champ controlé de la partie recherche
                        inputValue={searchPredicate}
                        onInputChange={(event, value) => {
                            setSearchPredicate(value);
                        }}
                        // Champ controlé de la partie selection
                        value={selectedBike}
                        onChange={(event, value) => {
                            setSelectedBike(value);
                            setSelectedPointOfSale(value?.point_of_sale.id);
                        }}
                        getOptionLabel={(option) => option.number}
                        renderOption={(props, option, state) => {
                            return <li {...props} key={option.id}>{option.number}</li>
                        }}
                        renderInput={(params) => <TextField {...params} label="Numéro du vélo" />}
                        sx={{
                            minWidth: 200,
                        }}
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