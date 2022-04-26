import { gql } from "@apollo/client";

export const GET_ALL_BIKES = gql`
    query getAllBikes($skip: Int, $take: Int) {
        getAllBikes(skip: $skip, take: $take) {
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