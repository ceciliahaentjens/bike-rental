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
  price: string;
}

export interface GetBikeDetails_getBike_pointOfSale {
  __typename: "PointOfSale";
  id: number;
  label: string;
}

export interface GetBikeDetails_getBike_rents_rentPointOfSale {
  __typename: "PointOfSale";
  id: number;
  label: string;
}

export interface GetBikeDetails_getBike_rents_returnPointOfSale {
  __typename: "PointOfSale";
  id: number;
  label: string;
}

export interface GetBikeDetails_getBike_rents {
  __typename: "Rent";
  id: number;
  startDate: any;
  returnDate: any | null;
  rentPointOfSale: GetBikeDetails_getBike_rents_rentPointOfSale;
  returnPointOfSale: GetBikeDetails_getBike_rents_returnPointOfSale | null;
}

export interface GetBikeDetails_getBike {
  __typename: "Bike";
  id: number;
  number: string;
  status: string;
  kind: GetBikeDetails_getBike_kind;
  pointOfSale: GetBikeDetails_getBike_pointOfSale;
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
