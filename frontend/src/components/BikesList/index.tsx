import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

// Mui
import { Container, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

// Queries
import { getAllBikes, getAllBikes_getAllBikes } from '../../apollo/queries/__generated__/getAllBikes';
import { GET_ALL_BIKES } from '../../apollo/queries/allBikes';

function BikesList() {

    // Je récupère les données de ma query
    const { data: bikesData } = useQuery<getAllBikes>(GET_ALL_BIKES);
    console.log(bikesData);

    return (
        <Container>
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
                                    <TableCell align="right"></TableCell>
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