/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFollowingQuery
// ====================================================

export interface seeFollowingQuery_seeFollowing_following {
  __typename: "User";
  id: number;
  username: string;
  name: string;
  avatarURL: string | null;
  isMe: boolean;
  isFollowing: boolean;
}

export interface seeFollowingQuery_seeFollowing {
  __typename: "seeFollowingResult";
  ok: boolean;
  error: string | null;
  totalPage: number;
  following: seeFollowingQuery_seeFollowing_following[] | null;
}

export interface seeFollowingQuery {
  seeFollowing: seeFollowingQuery_seeFollowing;
}

export interface seeFollowingQueryVariables {
  id: number;
  page?: number | null;
}
