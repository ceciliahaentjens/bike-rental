import { useQuery } from '@apollo/client';

// Mui
import { Container, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// Queries
import { GetAllPointsOfSale_getAllPointsOfSale, GetAllPointsOfSale } from '../../apollo/queries/__generated__/GetAllPointsOfSale';
import { GET_ALL_POINTS_OF_SALE } from '../../apollo/queries/allPointsOfSale';

function PointsOfSaleList() {
    const { data: pointsOfSaleData } = useQuery<GetAllPointsOfSale>(GET_ALL_POINTS_OF_SALE);

    return (
        <Container>
            <Typography variant="body1" sx={{mb:2}}>Veuillez renseigner votre point de vente&nbsp;:</Typography>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Point de vente</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Point de vente"
                        value={1}
                    >
                        {
                            pointsOfSaleData && pointsOfSaleData.getAllPointsOfSale.map((pointOfSale: GetAllPointsOfSale_getAllPointsOfSale) => (
                                <MenuItem key={pointOfSale.id} value={pointOfSale.id}>{pointOfSale.label}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            <Button variant="contained" sx={{mt:2}}>Valider</Button>
        </Container>
    );

}

export default PointsOfSaleList;