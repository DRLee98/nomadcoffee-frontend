/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editCoffeeShopMutation
// ====================================================

export interface editCoffeeShopMutation_editCoffeeShop {
  __typename: "MutationOutput";
  ok: boolean;
  error: string | null;
}

export interface editCoffeeShopMutation {
  editCoffeeShop: editCoffeeShopMutation_editCoffeeShop;
}

export interface editCoffeeShopMutationVariables {
  id: number;
  name?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  address?: string | null;
  categories?: string | null;
  photos?: (any | null)[] | null;
}
