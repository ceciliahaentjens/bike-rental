import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';

// Mui
import { Container, Typography } from '@mui/material';

// Queries

type RentProps = {
    bikeId?: Number
}

function RentAdd({ bikeId }: RentProps) {

    return (
        <Container>
            <Typography>Coucou</Typography>
        </Container>
    );

}

export default RentAdd;