/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllPointsOfSale
// ====================================================

export interface GetAllPointsOfSale_getAllPointsOfSale {
  __typename: "pointOfSale";
  id: number;
  label: string;
}

export interface GetAllPointsOfSale {
  /**
   * Liste des catégories
   */
  getAllPointsOfSale: GetAllPointsOfSale_getAllPointsOfSale[];
}
