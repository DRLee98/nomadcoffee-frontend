/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShopsQuery
// ====================================================

export interface seeCoffeeShopsQuery_seeCoffeeShops_shops_user {
  __typename: "User";
  id: number;
  avatarURL: string | null;
}

export interface seeCoffeeShopsQuery_seeCoffeeShops_shops_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
}

export interface seeCoffeeShopsQuery_seeCoffeeShops_shops_categories {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface seeCoffeeShopsQuery_seeCoffeeShops_shops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  user: seeCoffeeShopsQuery_seeCoffeeShops_shops_user;
  photos: seeCoffeeShopsQuery_seeCoffeeShops_shops_photos[] | null;
  categories: seeCoffeeShopsQuery_seeCoffeeShops_shops_categories[] | null;
}

export interface seeCoffeeShopsQuery_seeCoffeeShops {
  __typename: "seeCoffeeShopsResult";
  totalPage: number;
  totalCount: number;
  shops: seeCoffeeShopsQuery_seeCoffeeShops_shops[] | null;
}

export interface seeCoffeeShopsQuery {
  seeCoffeeShops: seeCoffeeShopsQuery_seeCoffeeShops | null;
}

export interface seeCoffeeShopsQueryVariables {
  page?: number | null;
}
