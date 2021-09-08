/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeRepliesQuery
// ====================================================

export interface seeRepliesQuery_seeReplies_user {
  __typename: "User";
  id: number;
  username: string;
  avatarURL: string | null;
  isMe: boolean;
}

export interface seeRepliesQuery_seeReplies {
  __typename: "Reply";
  id: number;
  payload: string;
  createdAt: string;
  user: seeRepliesQuery_seeReplies_user;
}

export interface seeRepliesQuery {
  seeReplies: seeRepliesQuery_seeReplies[] | null;
}

export interface seeRepliesQueryVariables {
  commentId: number;
}
