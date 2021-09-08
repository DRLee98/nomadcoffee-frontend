/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchCoffeeShopQuery
// ====================================================

export interface searchCoffeeShopQuery_searchCoffeeShop_shops_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
}

export interface searchCoffeeShopQuery_searchCoffeeShop_shops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  photos: searchCoffeeShopQuery_searchCoffeeShop_shops_photos[] | null;
}

export interface searchCoffeeShopQuery_searchCoffeeShop {
  __typename: "searchCoffeeShopResult";
  totalPage: number;
  totalCount: number;
  shops: searchCoffeeShopQuery_searchCoffeeShop_shops[] | null;
}

export interface searchCoffeeShopQuery {
  searchCoffeeShop: searchCoffeeShopQuery_searchCoffeeShop | null;
}

export interface searchCoffeeShopQueryVariables {
  word: string;
  page?: number | null;
}
