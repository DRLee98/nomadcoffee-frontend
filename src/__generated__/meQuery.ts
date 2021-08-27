/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: meQuery
// ====================================================

export interface meQuery_me {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  name: string;
  avatarURL: string | null;
  totalFollowing: number;
  totalFollowers: number;
}

export interface meQuery {
  me: meQuery_me | null;
}
