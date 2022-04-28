/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * L'ajout d'une location
 */
export interface CreateRentInput {
  client_firstname: string;
  client_lastname: string;
  bike_id: number;
  rent_point_of_sale_id: number;
  back_date_planned: any;
}

/**
 * L'arrêt d'une location
 */
export interface StopRentInput {
  rent_id: number;
  bike_id: number;
  return_point_of_sale_id: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
