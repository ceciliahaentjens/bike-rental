import { gql } from "@apollo/client";

export const SEARCH_BIKE = gql`
    query SearchBike($searchTerm: String!, $status: String!) {
        searchBike(searchTerm: $searchTerm, status: $status) {
            id
            number
            point_of_sale {
                id
            }
        }
    }
`;