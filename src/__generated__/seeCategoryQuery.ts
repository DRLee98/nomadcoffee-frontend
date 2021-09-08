/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCategoryQuery
// ====================================================

export interface seeCategoryQuery_seeCategory_shops_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
}

export interface seeCategoryQuery_seeCategory_shops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  photos: seeCategoryQuery_seeCategory_shops_photos[] | null;
}

export interface seeCategoryQuery_seeCategory {
  __typename: "Category";
  totalShops: number;
  shops: seeCategoryQuery_seeCategory_shops[] | null;
}

export interface seeCategoryQuery {
  seeCategory: seeCategoryQuery_seeCategory | null;
}

export interface seeCategoryQueryVariables {
  slug: string;
  page?: number | null;
}
