import { gql } from "@apollo/client";

export const GET_ALL_KINDS_OF_BIKE = gql`
    query getAllKindsOfBike($skip: Int, $take: Int) {
        getAllKindsOfBike(skip: $skip, take: $take) {
            id
            label
            price
        }
    } 
`;