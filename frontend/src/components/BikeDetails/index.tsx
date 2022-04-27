import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// Helpers
import { getReadableStatus, isAvailable, isRented } from '../../helpers/status';

// Mui
import { Button, Stack, Chip, Container, Paper, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

// Queries
import { GET_BIKE_DETAILS } from '../../apollo/queries/bikeDetails';
import { GetBikeDetails, GetBikeDetails_getBike_rents } from '../../apollo/queries/__generated__/GetBikeDetails';

function BikeDetails() {
    // Je récupère l'id passé en paramètre
    const { id } = useParams();
    const bikeId = Number(id);

    const { loading, data: bikeData } = useQuery<GetBikeDetails>(GET_BIKE_DETAILS, {
        variables: {
            getBikeId: bikeId
        },
    });

    const bike = bikeData?.getBike;

    return (
        <Container>
            <Typography variant="h2" sx={{ mb: 6, textAlign: 'center' }}>Vélo {bike?.number}</Typography>
            {
                bike?.point_of_sale && (
                    <Typography variant="body1" sx={{ mb: 2 }}>Dernier point de vente&nbsp;: {bike?.point_of_sale.label}</Typography>
                )
            }
            <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
                <Typography variant="body1">Statut&nbsp;:</Typography>
                <Chip label={getReadableStatus(bike?.status)} color={isAvailable(bike?.status) ? 'success' : 'warning'}/>
                {
                    isAvailable(bike?.status) && (
                        <Button color="primary" variant="contained" component={Link} to={{
                            pathname: `/rents/new/${bike?.id}`
                        }}>Démarrer une location</Button>
                    )
                }
                {
                    isRented(bike?.status) && (
                        <Button color="primary" variant="contained">Terminer une location</Button>
                    )
                }
            </Stack>            
            {
                bike?.rents && bike?.rents.length > 0 && (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Départ de</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Retour à</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    bike?.rents && bike?.rents.map((rent: GetBikeDetails_getBike_rents) => (
                                        <TableRow
                                            key={rent.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>{rent.rent_point_of_sale.label}</TableCell>
                                            <TableCell>{rent.start_date}</TableCell>
                                            <TableCell>{rent.return_point_of_sale ? rent.return_point_of_sale.label : ''}</TableCell>
                                            <TableCell>{rent.back_date ?? ''}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
            
        </Container>
    );

}

export default BikeDetails;