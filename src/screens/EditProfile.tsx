import AuthLayout from "../components/auth/AuthLayout";
import { Input } from "../components/form/formShared";
import PageTitle from "../components/PageTitle";
import { ApolloCache, FetchResult, gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ImageInput } from "../components/form/ImageInput";
import ErrorMsg from "../components/form/ErrorMsg";
import { useHistory } from "react-router-dom";
import Button from "../components/form/Button";
import routes from "../routes";
import AddressInput from "../components/form/AddressInput";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  editProfileMutation,
  editProfileMutationVariables,
} from "../__generated__/editProfileMutation";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfileMutation(
    $username: String
    $email: String
    $name: String
    $location: String
    $avatar: Upload
  ) {
    editProfile(
      username: $username
      email: $email
      name: $name
      location: $location
      avatar: $avatar
    ) {
      ok
      error
    }
  }
`;

const EditProfileForm = styled.form`
  display: grid;
  grid-template-areas:
    "image input"
    "button button";
  grid-gap: 15px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  grid-area: input;
`;

const ImageBox = styled.div`
  grid-area: image;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonBox = styled.div`
  grid-area: button;
`;

interface IEditProfileForm {
  username?: string;
  email?: string;
  name?: string;
  location?: string;
  file?: FileList;
  result?: string;
}

interface EditProfileLocation {
  id: number;
  username?: string;
  email?: string;
  name?: string;
  location?: string;
  avatarURL?: string;
}

function EditProfile() {
  const { state } = useLocation<EditProfileLocation>();
  const [previewUrl, setPreviewUrl] = useState<any>();
  const {
    register,
    formState,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    watch,
  } = useForm<IEditProfileForm>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      username: state.username || "",
      email: state.email || "",
      name: state.name || "",
      location: state.location || "",
    },
  });
  const history = useHistory();
  const updateProfile = (
    cache: ApolloCache<editProfileMutation>,
    result: FetchResult<editProfileMutation>,
  ) => {
    const resultData = result.data?.editProfile;
    if (!resultData?.ok && resultData?.error) {
      console.log(resultData?.error);
      return setValue("result", resultData?.error);
    }
    const { username, email, name, location } = getValues();
    cache.modify({
      id: `User:${state.id}`,
      fields: {
        username(prev) {
          return username ? username : prev;
        },
        email(prev) {
          return email ? email : prev;
        },
        name(prev) {
          return name ? name : prev;
        },
        location(prev) {
          return location ? location : prev;
        },
        avatar(prev) {
          return previewUrl ? previewUrl : prev;
        },
      },
    });
    history.push(routes.myProfile);
  };
  const [editProfileMutation, { loading }] = useMutation<
    editProfileMutation,
    editProfileMutationVariables
  >(EDIT_PROFILE_MUTATION, { update: updateProfile });
  const onSubmitValid = (data: IEditProfileForm) => {
    if (loading) {
      return;
    }
    const { username, email, name, location, file } = data;
    editProfileMutation({
      variables: {
        username,
        email,
        name,
        location,
        ...(file && { avatar: file[0] }),
      },
    });
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  useEffect(() => {
    const { file } = getValues();
    if (file && file[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
    }
  }, [watch("file")]);

  return (
    <AuthLayout darkModeBtn={false}>
      <PageTitle title={"sign up"} />
      <EditProfileForm onSubmit={handleSubmit(onSubmitValid)}>
        <ImageBox>
          <ImageInput
            url={state.avatarURL}
            register={register}
            files={watch("file")}
          />
        </ImageBox>
        <InputBox>
          <Input
            {...register("username")}
            placeholder="Username"
            type="text"
            onChange={clearLoginError}
            error={Boolean(formState.errors?.username?.message)}
          />
          <ErrorMsg msg={formState.errors?.username?.message} />
          <Input
            {...register("email")}
            placeholder="Email"
            type="text"
            onChange={clearLoginError}
            error={Boolean(formState.errors?.email?.message)}
          />
          <ErrorMsg msg={formState.errors?.email?.message} />
          <Input
            {...register("name")}
            placeholder="Name"
            type="text"
            onChange={clearLoginError}
            error={Boolean(formState.errors?.name?.message)}
          />
          <ErrorMsg msg={formState.errors?.name?.message} />
          <AddressInput register={register} setValue={setValue} />
        </InputBox>
        <ButtonBox>
          <Button
            text={"Edit Profile"}
            errorMsg={formState.errors?.result?.message}
            loading={loading}
            disabled={!formState.isValid}
          />
        </ButtonBox>
      </EditProfileForm>
    </AuthLayout>
  );
}
export default EditProfile;
