/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: unfollowUserMutation
// ====================================================

export interface unfollowUserMutation_unfollowUser {
  __typename: "MutationOutput";
  ok: boolean;
  error: string | null;
}

export interface unfollowUserMutation {
  unfollowUser: unfollowUserMutation_unfollowUser;
}

export interface unfollowUserMutationVariables {
  id: number;
}
