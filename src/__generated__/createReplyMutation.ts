/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createReplyMutation
// ====================================================

export interface createReplyMutation_createReply {
  __typename: "createReplyResult";
  id: number | null;
  ok: boolean;
  error: string | null;
}

export interface createReplyMutation {
  createReply: createReplyMutation_createReply;
}

export interface createReplyMutationVariables {
  commentId: number;
  payload: string;
}
