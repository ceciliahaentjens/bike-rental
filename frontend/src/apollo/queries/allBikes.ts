import { gql } from "@apollo/client";

export const GET_ALL_BIKES = gql`
    query getAllBikes($skip: Int, $take: Int, $status: String, $pointOfSaleId: Int, $kindOfBikeId: Int) {
        getAllBikes(skip: $skip, take: $take, status: $status, point_of_sale_id: $pointOfSaleId, kind_of_bike_id: $kindOfBikeId) {
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
        }
    } 
`;