/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createCommentMutation
// ====================================================

export interface createCommentMutation_createComment {
  __typename: "createCommentResult";
  id: number | null;
  ok: boolean;
  error: string | null;
}

export interface createCommentMutation {
  createComment: createCommentMutation_createComment;
}

export interface createCommentMutationVariables {
  shopId: number;
  payload: string;
}
