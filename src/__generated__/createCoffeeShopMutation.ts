/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createCoffeeShopMutation
// ====================================================

export interface createCoffeeShopMutation_createCoffeeShop {
  __typename: "createCoffeeShopResult";
  id: number | null;
  ok: boolean;
  error: string | null;
}

export interface createCoffeeShopMutation {
  createCoffeeShop: createCoffeeShopMutation_createCoffeeShop;
}

export interface createCoffeeShopMutationVariables {
  name: string;
  latitude?: string | null;
  longitude?: string | null;
  address?: string | null;
  categories?: string | null;
  photos?: (any | null)[] | null;
}
