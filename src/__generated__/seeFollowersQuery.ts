/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFollowersQuery
// ====================================================

export interface seeFollowersQuery_seeFollowers_followers {
  __typename: "User";
  id: number;
  username: string;
  name: string;
  avatarURL: string | null;
  isMe: boolean;
  isFollowing: boolean;
}

export interface seeFollowersQuery_seeFollowers {
  __typename: "seeFollowersResult";
  ok: boolean;
  error: string | null;
  totalPage: number;
  followers: seeFollowersQuery_seeFollowers_followers[] | null;
}

export interface seeFollowersQuery {
  seeFollowers: seeFollowersQuery_seeFollowers;
}

export interface seeFollowersQueryVariables {
  id: number;
  page?: number | null;
}
