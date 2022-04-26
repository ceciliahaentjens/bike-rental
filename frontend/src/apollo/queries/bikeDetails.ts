import { gql } from "@apollo/client";

export const GET_BIKE_DETAILS = gql`
    query GetBikeDetails($getBikeId: Int!) {
        getBike(id: $getBikeId) {
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
            rents {
                id
                startDate
                returnDate
                rentPointOfSale {
                    id
                    label
                }
                returnPointOfSale {
                    id
                    label
                }
            }
        }
    }
`