/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShopQuery
// ====================================================

export interface seeCoffeeShopQuery_seeCoffeeShop_user {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  avatarURL: string | null;
}

export interface seeCoffeeShopQuery_seeCoffeeShop_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
}

export interface seeCoffeeShopQuery_seeCoffeeShop_categories {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface seeCoffeeShopQuery_seeCoffeeShop {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string | null;
  longitude: string | null;
  user: seeCoffeeShopQuery_seeCoffeeShop_user;
  photos: (seeCoffeeShopQuery_seeCoffeeShop_photos | null)[] | null;
  categories: (seeCoffeeShopQuery_seeCoffeeShop_categories | null)[] | null;
}

export interface seeCoffeeShopQuery {
  seeCoffeeShop: seeCoffeeShopQuery_seeCoffeeShop | null;
}

export interface seeCoffeeShopQueryVariables {
  id: number;
}
