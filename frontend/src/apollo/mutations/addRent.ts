import { gql } from "@apollo/client";

export const ADD_RENT = gql`
    mutation addRent($input: RentInput) {
        createRent(input: $input) {
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