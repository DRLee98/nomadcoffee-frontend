/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: toggleLikeMutation
// ====================================================

export interface toggleLikeMutation_toggleLike {
  __typename: "toggleLikeResult";
  ok: boolean;
  error: string | null;
  isLiked: boolean | null;
}

export interface toggleLikeMutation {
  toggleLike: toggleLikeMutation_toggleLike;
}

export interface toggleLikeMutationVariables {
  shopId: number;
}
