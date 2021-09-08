/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editProfileMutation
// ====================================================

export interface editProfileMutation_editProfile {
  __typename: "MutationOutput";
  ok: boolean;
  error: string | null;
}

export interface editProfileMutation {
  editProfile: editProfileMutation_editProfile;
}

export interface editProfileMutationVariables {
  username?: string | null;
  email?: string | null;
  name?: string | null;
  location?: string | null;
  avatar?: any | null;
}
