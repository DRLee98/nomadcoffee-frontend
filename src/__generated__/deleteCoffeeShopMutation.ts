/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteCoffeeShopMutation
// ====================================================

export interface deleteCoffeeShopMutation_deleteCoffeeShop {
  __typename: "MutationOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteCoffeeShopMutation {
  deleteCoffeeShop: deleteCoffeeShopMutation_deleteCoffeeShop;
}

export interface deleteCoffeeShopMutationVariables {
  id: number;
}
