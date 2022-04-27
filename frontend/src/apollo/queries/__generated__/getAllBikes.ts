/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllBikes
// ====================================================

export interface getAllBikes_getAllBikes_kind {
  __typename: "KindOfBike";
  id: number;
  label: string;
  price: number;
  USDPrice: number;
}

export interface getAllBikes_getAllBikes_point_of_sale {
  __typename: "PointOfSale";
  id: number;
  label: string;
}

export interface getAllBikes_getAllBikes {
  __typename: "Bike";
  id: number;
  number: string;
  status: string;
  kind: getAllBikes_getAllBikes_kind;
  point_of_sale: getAllBikes_getAllBikes_point_of_sale;
}

export interface getAllBikes {
  /**
   * Liste des vélos
   */
  getAllBikes: getAllBikes_getAllBikes[];
}

export interface getAllBikesVariables {
  skip?: number | null;
  take?: number | null;
  status?: string | null;
  pointOfSaleId?: number | null;
  kindOfBikeId?: number | null;
}
