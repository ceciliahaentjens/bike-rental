import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

// Mui
import { Container, Stack, Divider, FormControl, InputLabel, Select, MenuItem, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography, Paper } from '@mui/material';

// Queries
import { getAllKindsOfBike, getAllKindsOfBike_getAllKindsOfBike } from '../../apollo/queries/__generated__/getAllKindsOfBike';
import { GET_ALL_KINDS_OF_BIKE } from '../../apollo/queries/allKindsOfBike';
import { getAllBikes, getAllBikes_getAllBikes } from '../../apollo/queries/__generated__/getAllBikes';
import { GET_ALL_BIKES } from '../../apollo/queries/allBikes';
import { GetAllPointsOfSale_getAllPointsOfSale, GetAllPointsOfSale } from '../../apollo/queries/__generated__/GetAllPointsOfSale';
import { GET_ALL_POINTS_OF_SALE } from '../../apollo/queries/allPointsOfSale';

function BikesList() {

    // Je récupère les données de ma query
    const { data: kindsOfBikeData } = useQuery<getAllKindsOfBike>(GET_ALL_KINDS_OF_BIKE);
    const { data: bikesData } = useQuery<getAllBikes>(GET_ALL_BIKES);
    const { data: pointsOfSaleData } = useQuery<GetAllPointsOfSale>(GET_ALL_POINTS_OF_SALE);

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
            >
                <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                    <InputLabel id="type-select-label">Type</InputLabel>
                    <Select
                        labelId="type-select-label"
                        id="type-select"
                        label="Type"
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
                    >
                        <MenuItem key="available" value="available">Disponible</MenuItem>
                        <MenuItem key="rent" value="rent">Loué</MenuItem>
                        <MenuItem key="repair" value="repair">En réparation</MenuItem>
                        <MenuItem key="lost" value="lost">Perdu</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                    <InputLabel id="point-of-sale-select-label">Point de vente</InputLabel>
                    <Select
                        labelId="point-of-sale-select-label"
                        id="point-of-sale-select"
                        label="Point de vente"
                    >
                        {
                            pointsOfSaleData && pointsOfSaleData.getAllPointsOfSale.map((pointOfSale: GetAllPointsOfSale_getAllPointsOfSale) => (
                                <MenuItem key={pointOfSale.id} value={pointOfSale.id}>{pointOfSale.label}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <Button variant="contained">Filtrer</Button>
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
                        <TableCell align="right">Actions de vente</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            bikesData && bikesData.getAllBikes.map((bike: getAllBikes_getAllBikes) => (
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
                                    <TableCell align="right"></TableCell>
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