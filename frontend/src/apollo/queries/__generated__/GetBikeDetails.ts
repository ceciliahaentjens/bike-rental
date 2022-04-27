/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBikeDetails
// ====================================================

export interface GetBikeDetails_getBike_kind {
  __typename: "KindOfBike";
  id: number;
  label: string;
  price: number;
}

export interface GetBikeDetails_getBike_point_of_sale {
  __typename: "PointOfSale";
  id: number;
  label: string;
}

export interface GetBikeDetails_getBike_rents_rent_point_of_sale {
  __typename: "PointOfSale";
  id: number;
  label: string;
}

export interface GetBikeDetails_getBike_rents_return_point_of_sale {
  __typename: "PointOfSale";
  id: number;
  label: string;
}

export interface GetBikeDetails_getBike_rents {
  __typename: "Rent";
  id: number;
  start_date: any;
  back_date: any | null;
  rent_point_of_sale: GetBikeDetails_getBike_rents_rent_point_of_sale;
  return_point_of_sale: GetBikeDetails_getBike_rents_return_point_of_sale | null;
}

export interface GetBikeDetails_getBike {
  __typename: "Bike";
  id: number;
  number: string;
  status: string;
  kind: GetBikeDetails_getBike_kind;
  point_of_sale: GetBikeDetails_getBike_point_of_sale;
  rents: GetBikeDetails_getBike_rents[] | null;
}

export interface GetBikeDetails {
  /**
   * Récupérer un vélo
   */
  getBike: GetBikeDetails_getBike | null;
}

export interface GetBikeDetailsVariables {
  getBikeId: number;
}
