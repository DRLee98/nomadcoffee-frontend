/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: followUserMutation
// ====================================================

export interface followUserMutation_followUser {
  __typename: "MutationOutput";
  ok: boolean;
  error: string | null;
}

export interface followUserMutation {
  followUser: followUserMutation_followUser;
}

export interface followUserMutationVariables {
  id: number;
}
