import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';

// Mui
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// Queries
import { GetAllPointsOfSale_getAllPointsOfSale, GetAllPointsOfSale } from '../../apollo/queries/__generated__/GetAllPointsOfSale';
import { GET_ALL_POINTS_OF_SALE } from '../../apollo/queries/allPointsOfSale';

// Helpers
import { getTomorrow } from '../../helpers/moment'

type RentProps = {
    bikeId?: Number
}

function RentAdd({ bikeId }: RentProps) {
    // State variables
    const [clientLastname, setClientLastname] = useState<String>('');
    const [clientFirstname, setClientFirstname] = useState<String>('');
    const [selectedBike, setSelectedBike] = useState<String>('');
    const [selectedPointOfSale, setSelectedPointOfSale] = useState(1);
    const [selectedReturnDate, setSelectedReturnDate] = useState<Date | null>(() => getTomorrow());
    
    // Je récupère les données de ma query
    const { data: pointsOfSaleData } = useQuery<GetAllPointsOfSale>(GET_ALL_POINTS_OF_SALE);

    // DateTime
    const changeReturnDate = (newValue: Date | null) => {
        setSelectedReturnDate(newValue);
    };

    return (
        <Container>
            <Typography variant="h2" sx={{ mb: 6, textAlign: 'center' }}>Démarrer une location</Typography>
            <Box

            >
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
                    <TextField
                        required
                        id="outlined-required"
                        label="Numéro du vélo"
                        value={selectedBike}
                        onChange={(event) => {
                            setSelectedBike(event.target.value);
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