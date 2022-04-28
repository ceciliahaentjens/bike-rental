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
                client_lastname
                client_firstname
                start_date
                back_date
                back_date_planned
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