/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchBike
// ====================================================

export interface SearchBike_searchBike_point_of_sale {
  __typename: "PointOfSale";
  id: number;
}

export interface SearchBike_searchBike {
  __typename: "Bike";
  id: number;
  number: string;
  point_of_sale: SearchBike_searchBike_point_of_sale;
}

export interface SearchBike {
  /**
   * Rechercher un vélo
   */
  searchBike: SearchBike_searchBike[];
}

export interface SearchBikeVariables {
  searchTerm: string;
  status: string;
}
