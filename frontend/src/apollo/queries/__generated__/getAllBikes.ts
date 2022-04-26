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
  price: string;
}

export interface getAllBikes_getAllBikes {
  __typename: "Bike";
  id: number;
  number: string;
  status: string;
  kind: getAllBikes_getAllBikes_kind;
}

export interface getAllBikes {
  /**
   * Liste des vélos
   */
  getAllBikes: getAllBikes_getAllBikes[];
}
