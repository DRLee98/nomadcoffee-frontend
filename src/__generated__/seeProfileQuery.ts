/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeProfileQuery
// ====================================================

export interface seeProfileQuery_seeProfile {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  name: string;
  avatarURL: string | null;
  totalFollowing: number;
  totalFollowers: number;
  isFollowing: boolean;
}

export interface seeProfileQuery {
  seeProfile: seeProfileQuery_seeProfile | null;
}

export interface seeProfileQueryVariables {
  id?: number | null;
}
