import { gql } from "@apollo/client";

export const STOP_RENT = gql`
    mutation stopRent($input: StopRentInput) {
        stopRent(input: $input) {
            bike {
                id
                number
                status
                kind {
                    label
                    id
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
    }
`