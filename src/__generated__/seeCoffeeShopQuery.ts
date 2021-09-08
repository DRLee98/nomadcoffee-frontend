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
  username: string;
  avatarURL: string | null;
  isMe: boolean;
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

export interface seeCoffeeShopQuery_seeCoffeeShop_comments_user {
  __typename: "User";
  id: number;
  username: string;
  avatarURL: string | null;
  isMe: boolean;
}

export interface seeCoffeeShopQuery_seeCoffeeShop_comments {
  __typename: "Comment";
  id: number;
  payload: string;
  totalReply: number;
  createdAt: string;
  user: seeCoffeeShopQuery_seeCoffeeShop_comments_user;
}

export interface seeCoffeeShopQuery_seeCoffeeShop {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  address: string | null;
  latitude: string | null;
  longitude: string | null;
  totalLikes: number;
  totalComments: number;
  isLiked: boolean;
  user: seeCoffeeShopQuery_seeCoffeeShop_user;
  photos: seeCoffeeShopQuery_seeCoffeeShop_photos[] | null;
  categories: seeCoffeeShopQuery_seeCoffeeShop_categories[] | null;
  comments: seeCoffeeShopQuery_seeCoffeeShop_comments[] | null;
}

export interface seeCoffeeShopQuery {
  seeCoffeeShop: seeCoffeeShopQuery_seeCoffeeShop | null;
}

export interface seeCoffeeShopQueryVariables {
  id: number;
}
