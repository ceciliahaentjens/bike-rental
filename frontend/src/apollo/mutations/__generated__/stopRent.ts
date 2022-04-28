/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StopRentInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: stopRent
// ====================================================

export interface stopRent_stopRent_bike_kind {
  __typename: "KindOfBike";
  label: string;
  id: number;
  price: number;
}

export interface stopRent_stopRent_bike_point_of_sale {
  __typename: "PointOfSale";
  id: number;
  label: string;
}

export interface stopRent_stopRent_bike_rents_rent_point_of_sale {
  __typename: "PointOfSale";
  id: number;
  label: string;
}

export interface stopRent_stopRent_bike_rents_return_point_of_sale {
  __typename: "PointOfSale";
  id: number;
  label: string;
}

export interface stopRent_stopRent_bike_rents {
  __typename: "Rent";
  id: number;
  start_date: any;
  back_date: any | null;
  rent_point_of_sale: stopRent_stopRent_bike_rents_rent_point_of_sale;
  return_point_of_sale: stopRent_stopRent_bike_rents_return_point_of_sale | null;
}

export interface stopRent_stopRent_bike {
  __typename: "Bike";
  id: number;
  number: string;
  status: string;
  kind: stopRent_stopRent_bike_kind;
  point_of_sale: stopRent_stopRent_bike_point_of_sale;
  rents: stopRent_stopRent_bike_rents[] | null;
}

export interface stopRent_stopRent {
  __typename: "Rent";
  bike: stopRent_stopRent_bike;
}

export interface stopRent {
  /**
   * Arrêt d'une location
   */
  stopRent: stopRent_stopRent | null;
}

export interface stopRentVariables {
  input?: StopRentInput | null;
}
