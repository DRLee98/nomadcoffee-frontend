/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CoffeeShopFrag
// ====================================================

export interface CoffeeShopFrag_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
}

export interface CoffeeShopFrag_categories {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface CoffeeShopFrag_user {
  __typename: "User";
  id: number;
  username: string;
  avatarURL: string | null;
}

export interface CoffeeShopFrag {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  photos: CoffeeShopFrag_photos[] | null;
  categories: CoffeeShopFrag_categories[] | null;
  user: CoffeeShopFrag_user;
}
