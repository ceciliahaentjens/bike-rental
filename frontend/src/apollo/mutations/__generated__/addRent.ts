/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RentInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: addRent
// ====================================================

export interface addRent_createRent_bike_kind {
  __typename: "KindOfBike";
  label: string;
  id: number;
  price: number;
}

export interface addRent_createRent_bike_point_of_sale {
  __typename: "PointOfSale";
  id: number;
  label: string;
}

export interface addRent_createRent_bike_rents_rent_point_of_sale {
  __typename: "PointOfSale";
  id: number;
  label: string;
}

export interface addRent_createRent_bike_rents_return_point_of_sale {
  __typename: "PointOfSale";
  id: number;
  label: string;
}

export interface addRent_createRent_bike_rents {
  __typename: "Rent";
  id: number;
  start_date: any;
  back_date: any | null;
  rent_point_of_sale: addRent_createRent_bike_rents_rent_point_of_sale;
  return_point_of_sale: addRent_createRent_bike_rents_return_point_of_sale | null;
}

export interface addRent_createRent_bike {
  __typename: "Bike";
  id: number;
  number: string;
  status: string;
  kind: addRent_createRent_bike_kind;
  point_of_sale: addRent_createRent_bike_point_of_sale;
  rents: addRent_createRent_bike_rents[] | null;
}

export interface addRent_createRent {
  __typename: "Rent";
  bike: addRent_createRent_bike;
}

export interface addRent {
  /**
   * Création d'une location
   */
  createRent: addRent_createRent | null;
}

export interface addRentVariables {
  input?: RentInput | null;
}
