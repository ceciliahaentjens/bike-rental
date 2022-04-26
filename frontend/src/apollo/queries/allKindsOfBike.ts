import { gql } from "@apollo/client";

export const GET_ALL_KINDS_OF_BIKE = gql`
    query getAllKindsOfBike {
        getAllKindsOfBike {
            id
            label
            price
        }
    } 
`;