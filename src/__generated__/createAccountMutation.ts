/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createAccountMutation
// ====================================================

export interface createAccountMutation_createAccount {
  __typename: "MutationOutput";
  ok: boolean;
  error: string | null;
}

export interface createAccountMutation {
  createAccount: createAccountMutation_createAccount;
}

export interface createAccountMutationVariables {
  username: string;
  email: string;
  name: string;
  location?: string | null;
  avatar?: any | null;
  password: string;
}
