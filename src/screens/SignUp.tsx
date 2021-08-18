import AuthLayout from "../components/auth/AuthLayout";
import { Input } from "../components/form/formShared";
import PageTitle from "../components/PageTitle";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";
import styled from "styled-components";
import { ImageInput } from "../components/form/ImageInput";
import ErrorMsg from "../components/form/ErrorMsg";
import { useHistory } from "react-router-dom";
import Button from "../components/form/Button";
import GoLink from "../components/GoLink";
import routes from "../routes";
import AddressInput from "../components/form/AddressInput";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation(
    $username: String!
    $email: String!
    $name: String!
    $location: String
    $avatar: Upload
    $password: String!
  ) {
    createAccount(
      username: $username
      email: $email
      name: $name
      location: $location
      avatar: $avatar
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUpForm = styled.form`
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

interface ISignUpForm {
  username: string;
  email: string;
  name: string;
  location?: string;
  file: FileList;
  password: string;
  verifyPassword: string;
  result?: string;
}

function SignUp() {
  const {
    register,
    formState,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    watch,
  } = useForm<ISignUpForm>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  const history = useHistory();
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok && error) {
      return setError("result", {
        message: error,
      });
    }
    const { username, password } = getValues();
    history.push("/", { username, password });
  };
  const [createAccountMutation, { loading }] = useMutation<
    createAccountMutation,
    createAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, { onCompleted });
  const onSubmitValid = (data: ISignUpForm) => {
    if (loading) {
      return;
    }
    const { username, email, name, location, file, password } = data;
    createAccountMutation({
      variables: { username, email, name, location, avatar: file[0], password },
    });
  };
  const clearLoginError = () => {
    clearErrors("result");
  };
  return (
    <AuthLayout>
      <PageTitle title={"sign up"} />
      <SignUpForm onSubmit={handleSubmit(onSubmitValid)}>
        <ImageBox>
          <ImageInput register={register} files={watch("file")} />
        </ImageBox>
        <InputBox>
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
            })}
            placeholder="Username"
            type="text"
            onChange={clearLoginError}
            error={Boolean(formState.errors?.username?.message)}
          />
          <ErrorMsg msg={formState.errors?.username?.message} />
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "Please check your email format",
              },
            })}
            placeholder="Email"
            type="text"
            onChange={clearLoginError}
            error={Boolean(formState.errors?.email?.message)}
          />
          <ErrorMsg msg={formState.errors?.email?.message} />
          <Input
            {...register("name", {
              required: "Name is required",
            })}
            placeholder="Name"
            type="text"
            onChange={clearLoginError}
            error={Boolean(formState.errors?.name?.message)}
          />
          <ErrorMsg msg={formState.errors?.name?.message} />
          <Input
            {...register("password", {
              required: "Password is required.",
            })}
            placeholder="Password"
            type="password"
            onChange={clearLoginError}
            error={Boolean(formState.errors?.password?.message)}
          />
          <ErrorMsg msg={formState.errors?.password?.message} />
          <Input
            {...register("verifyPassword", {
              required: "Verify Password is required.",
              validate: (data) => data === getValues("password"),
            })}
            placeholder="Verify Password"
            type="password"
            onChange={clearLoginError}
            error={Boolean(formState.errors?.verifyPassword?.message)}
          />
          <ErrorMsg msg={formState.errors?.verifyPassword?.message} />
          <AddressInput register={register} setValue={setValue} />
        </InputBox>
        <ButtonBox>
          <Button
            text={"Sign Up"}
            errorMsg={formState.errors?.result?.message}
            loading={loading}
            disabled={!formState.isValid}
          />
        </ButtonBox>
      </SignUpForm>
      <GoLink text={"Go Log In →"} path={routes.home} />
    </AuthLayout>
  );
}
export default SignUp;
