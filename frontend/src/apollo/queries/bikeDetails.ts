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
            point_of_sale {
                id
                label
            }
            rents {
                id
                start_date
                back_date
                rent_point_of_sale {
                    id
                    label
                }
                return_point_of_sale {
                    id
                    label
                }
            }
        }
    }
`