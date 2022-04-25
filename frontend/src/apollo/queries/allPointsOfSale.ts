import { gql } from "@apollo/client";

export const GET_ALL_POINTS_OF_SALE = gql`
    query GetAllPointsOfSale {
        getAllPointsOfSale {
            id
            label
        }
    } 
`;