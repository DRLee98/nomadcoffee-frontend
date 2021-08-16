/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: loginMutation
// ====================================================

export interface loginMutation_login {
  __typename: "loginResult";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface loginMutation {
  login: loginMutation_login;
}

export interface loginMutationVariables {
  username: string;
  password: string;
}
