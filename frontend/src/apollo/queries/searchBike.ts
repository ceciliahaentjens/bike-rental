import { gql } from "@apollo/client";

export const SEARCH_BIKE = gql`
    query SearchBike($searchTerm: String!) {
        searchBike(searchTerm: $searchTerm) {
            id
            number
            status
            point_of_sale {
                id
                label
            }
        }
    }
`;