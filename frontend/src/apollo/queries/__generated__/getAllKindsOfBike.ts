/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllKindsOfBike
// ====================================================

export interface getAllKindsOfBike_getAllKindsOfBike {
  __typename: "KindOfBike";
  id: number;
  label: string;
  price: string;
}

export interface getAllKindsOfBike {
  /**
   * Liste des types de vélos
   */
  getAllKindsOfBike: getAllKindsOfBike_getAllKindsOfBike[];
}

export interface getAllKindsOfBikeVariables {
  skip?: number | null;
  take?: number | null;
}
