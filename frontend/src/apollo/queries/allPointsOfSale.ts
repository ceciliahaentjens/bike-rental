import { gql } from "@apollo/client";

export const GET_ALL_POINTS_OF_SALE = gql`
    query GetAllPointsOfSale($skip: Int, $take: Int) {
        getAllPointsOfSale(skip: $skip, take: $take) {
            id
            label
        }
    } 
`;