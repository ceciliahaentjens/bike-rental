import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';

// Helpers
import { AVAILABLE_STATUS, getReadableStatus, isAvailable, isRented } from '../../helpers/status';

// Mui
import { Container, Stack, Divider, FormControl, InputLabel, Select, MenuItem, Box, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography, Paper } from '@mui/material';

// Queries
import { getAllKindsOfBike, getAllKindsOfBike_getAllKindsOfBike } from '../../apollo/queries/__generated__/getAllKindsOfBike';
import { GET_ALL_KINDS_OF_BIKE } from '../../apollo/queries/allKindsOfBike';
import { getAllBikes, getAllBikes_getAllBikes } from '../../apollo/queries/__generated__/getAllBikes';
import { GET_ALL_BIKES } from '../../apollo/queries/allBikes';
import { GetAllPointsOfSale_getAllPointsOfSale, GetAllPointsOfSale } from '../../apollo/queries/__generated__/GetAllPointsOfSale';
import { GET_ALL_POINTS_OF_SALE } from '../../apollo/queries/allPointsOfSale';

function BikesList() {

    // Je récupère les données de ma query
    const { data: bikesData } = useQuery<getAllBikes>(GET_ALL_BIKES, {
        variables: {
            take: 50
        }
    });
    const { data: kindsOfBikeData } = useQuery<getAllKindsOfBike>(GET_ALL_KINDS_OF_BIKE);
    const { data: pointsOfSaleData } = useQuery<GetAllPointsOfSale>(GET_ALL_POINTS_OF_SALE);

    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [pointOfSale, setPointOfSale] = useState('');
    const [bikesToDisplay, setBikesToDisplay] = useState(() => {
        return bikesData ? bikesData.getAllBikes : [];
    });

    function filterBikesList(type: String, status: String, pointOfSale: String) {
        let filtered = bikesData ? bikesData.getAllBikes : [];

        if (type) {
            filtered = filtered?.filter((bike) => 
                bike.kind.id === Number(type)
            );
        }
        if (status) {
            filtered = filtered?.filter((bike) => 
                (bike.status).toUpperCase() === status.toUpperCase()
            );
        }
        if (pointOfSale) {
            filtered = filtered?.filter((bike) => 
                bike.pointOfSale.id === Number(pointOfSale)
            );
        }       
        setBikesToDisplay(filtered);
    }

    return (
        <Container>
            <Typography variant="h2" sx={{ mb: 6, textAlign: 'center' }}>Liste des vélos</Typography>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                justifyContent="center"
                alignItems="center"
                spacing={3}
                sx={{ mb: 6 }}
                component="form"
                onSubmit={(event: React.SyntheticEvent) => {
                    event.preventDefault();
                    filterBikesList(type, status, pointOfSale);
                }}
            >
                <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                    <InputLabel id="type-select-label">Type</InputLabel>
                    <Select
                        labelId="type-select-label"
                        id="type-select"
                        label="Type"
                        value={type}
                        onChange={(event) => {
                            setType(event.target.value);
                        }}
                    >
                        {
                            kindsOfBikeData && kindsOfBikeData.getAllKindsOfBike.map((kindOfBike: getAllKindsOfBike_getAllKindsOfBike) => (
                                <MenuItem key={kindOfBike.id} value={kindOfBike.id}>{kindOfBike.label}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                    <InputLabel id="status-select-label">Statut</InputLabel>
                    <Select
                        labelId="status-select-label"
                        id="status-select"
                        label="Statut"
                        value={status}
                        onChange={(event) => {
                            setStatus(event.target.value);
                        }}
                    >
                        {
                            AVAILABLE_STATUS.map((status: any) => (
                                <MenuItem key={status} value={status}>{getReadableStatus(status)}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                    <InputLabel id="point-of-sale-select-label">Point de vente</InputLabel>
                    <Select
                        labelId="point-of-sale-select-label"
                        id="point-of-sale-select"
                        label="Point de vente"
                        value={pointOfSale}
                        onChange={(event) => {
                            setPointOfSale(event.target.value);
                        }}
                    >
                        {
                            pointsOfSaleData && pointsOfSaleData.getAllPointsOfSale.map((pointOfSale: GetAllPointsOfSale_getAllPointsOfSale) => (
                                <MenuItem key={pointOfSale.id} value={pointOfSale.id}>{pointOfSale.label}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained">Filtrer</Button>
            </Stack>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Numéro</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Prix (EUR)</TableCell>
                        <TableCell align="right">Prix (USD)</TableCell>
                        <TableCell align="right">Statut</TableCell>
                        <TableCell align="right">Point de vente</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            bikesData && bikesToDisplay.map((bike: getAllBikes_getAllBikes) => (
                                <TableRow
                                    key={bike.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {bike.number}
                                    </TableCell>
                                    <TableCell align="right">{bike.kind.label}</TableCell>
                                    <TableCell align="right">{bike.kind.price}</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right">{bike.status}</TableCell>
                                    <TableCell align="right">{bike.pointOfSale.label}</TableCell>
                                    <TableCell align="right">
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end'
                                        }}>
                                            <Button color="primary" variant="contained" sx={{ mr: 2 }} component={Link} to={`/bikes/${bike.id}`}>Détails</Button>
                                            {
                                                isAvailable(bike.status) && (
                                                    <Button color="success" variant="contained">Louer</Button>
                                                )
                                            }
                                            {
                                                isRented(bike.status) && (
                                                    <Button color="warning" variant="contained">Terliner une location</Button>
                                                )
                                            }
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );

}

export default BikesList;