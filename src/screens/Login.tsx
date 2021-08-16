import AuthLayout from "../components/auth/AuthLayout";
import { Form, Input } from "../components/form/formShared";
import PageTitle from "../components/PageTitle";
import { gql, useMutation } from "@apollo/client";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import { useForm } from "react-hook-form";
import { login } from "../apollo";
import ErrorMsg from "../components/form/ErrorMsg";
import { useLocation } from "react-router-dom";
import Button from "../components/form/Button";
import GoLink from "../components/GoLink";
import routes from "../routes";

const LOGIN_MUTATION = gql`
  mutation loginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

interface ILoginForm {
  username: string;
  password: string;
  result?: string;
}

interface ILocation {
  username: string;
  password: string;
}

function Login() {
  const location = useLocation<ILocation>();
  const { register, formState, handleSubmit, setError, clearErrors } =
    useForm<ILoginForm>({
      mode: "onBlur",
      defaultValues: {
        username: location?.state?.username || "",
        password: location?.state?.password || "",
      },
    });
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok && error) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      login(token);
    }
  };
  const [loginMutation, { loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data: ILoginForm) => {
    if (loading) {
      return;
    }
    const { username, password } = data;
    loginMutation({
      variables: { username, password },
    });
  };
  const clearLoginError = () => {
    clearErrors("result");
  };
  return (
    <AuthLayout>
      <PageTitle title={"login"} />
      <Form onSubmit={handleSubmit(onSubmitValid)}>
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
          {...register("password", {
            required: "Password is required.",
          })}
          placeholder="Password"
          type="password"
          onChange={clearLoginError}
          error={Boolean(formState.errors?.password?.message)}
        />
        <ErrorMsg msg={formState.errors?.password?.message} />
        <Button
          text={"Log In"}
          errorMsg={formState.errors?.result?.message}
          loading={loading}
          disabled={!formState.isValid}
        />
      </Form>
      <GoLink text={"Go Sign Up →"} path={routes.signUp} />
    </AuthLayout>
  );
}
export default Login;
