import { gql } from "@apollo/client";

export const GET_ALL_BIKES = gql`
    query getAllBikes {
        getAllBikes {
            id
            number
            status
            kind {
                id
                label
                price
            }
            pointOfSale {
                id
                label
            }
        }
    } 
`;