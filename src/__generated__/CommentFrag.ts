/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CommentFrag
// ====================================================

export interface CommentFrag_user {
  __typename: "User";
  id: number;
  username: string;
  avatarURL: string | null;
}

export interface CommentFrag {
  __typename: "Comment";
  id: number;
  payload: string;
  totalReply: number;
  createdAt: string;
  user: CommentFrag_user;
}
