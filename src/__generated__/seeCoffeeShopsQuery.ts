/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShopsQuery
// ====================================================

export interface seeCoffeeShopsQuery_seeCoffeeShops_user {
  __typename: "User";
  id: number;
  username: string;
  avatarURL: string | null;
  isMe: boolean;
}

export interface seeCoffeeShopsQuery_seeCoffeeShops_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
}

export interface seeCoffeeShopsQuery_seeCoffeeShops_categories {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface seeCoffeeShopsQuery_seeCoffeeShops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  totalLikes: number;
  totalComments: number;
  isLiked: boolean;
  user: seeCoffeeShopsQuery_seeCoffeeShops_user;
  photos: seeCoffeeShopsQuery_seeCoffeeShops_photos[] | null;
  categories: seeCoffeeShopsQuery_seeCoffeeShops_categories[] | null;
}

export interface seeCoffeeShopsQuery {
  seeCoffeeShops: seeCoffeeShopsQuery_seeCoffeeShops[] | null;
}

export interface seeCoffeeShopsQueryVariables {
  page?: number | null;
}
