import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import { Form, Input } from "../components/form/formShared";
import AddressInput from "../components/form/AddressInput";
import { useForm } from "react-hook-form";
import { MultiImageInput } from "../components/form/MultiImageInput";
import Button from "../components/form/Button";
import ErrorMsg from "../components/form/ErrorMsg";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  createCoffeeShopMutation,
  createCoffeeShopMutationVariables,
} from "../__generated__/createCoffeeShopMutation";
import { useHistory } from "react-router-dom";
import routes from "../routes";
import { SEE_COFFEE_SHOPS_QUERY } from "./Home";

const CREATE_COFFEE_SHOP_MUTATION = gql`
  mutation createCoffeeShopMutation(
    $name: String!
    $latitude: String
    $longitude: String
    $categories: String
    $photos: [Upload]
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
      photos: $photos
    ) {
      id
      ok
      error
    }
  }
`;

const Container = styled.div``;

const AddForm = styled(Form)`
  padding: 20px;
  background-color: ${(props) => props.theme.wrapperBg};
  box-shadow: 0 2px 2px 1px rgb(64 60 67 / 16%);
  border-radius: 10px;
`;

const Title = styled.h1`
  font-weight: bolder;
  font-size: 25px;
`;

interface IAddShopForm {
  name: string;
  categories?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  files: FileList;
  result?: string;
}

function AddShop() {
  const history = useHistory();
  const client = useApolloClient();
  const { register, formState, handleSubmit, setValue, watch, clearErrors } =
    useForm<IAddShopForm>({
      mode: "onBlur",
      reValidateMode: "onBlur",
    });
  const onCompleted = async (data: createCoffeeShopMutation) => {
    const { ok, error } = data.createCoffeeShop;
    if (ok) {
      await client.refetchQueries({
        include: [SEE_COFFEE_SHOPS_QUERY],
      });
      history.push(routes.home);
    }
  };
  const [createCoffeeShopMutation, { loading }] = useMutation<
    createCoffeeShopMutation,
    createCoffeeShopMutationVariables
  >(CREATE_COFFEE_SHOP_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data: IAddShopForm) => {
    if (loading) {
      return;
    }
    const { name, latitude, longitude, categories, files } = data;
    const photos = [];
    for (let i = 0; i < files.length; i++) {
      photos.push(files[i]);
    }
    createCoffeeShopMutation({
      variables: {
        name,
        latitude: latitude + "",
        longitude: longitude + "",
        categories,
        photos,
      },
    });
  };
  const clearLoginError = () => {
    clearErrors("result");
  };
  return (
    <Container>
      <PageTitle title={"Add Shop"} />
      <AddForm onSubmit={handleSubmit(onSubmitValid)}>
        <Title>Add Shop</Title>
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
          {...register("categories")}
          placeholder="Categories"
          type="text"
          onChange={clearLoginError}
        />
        <AddressInput
          fullWidth={true}
          register={register}
          setValue={setValue}
        />
        <MultiImageInput register={register} files={watch("files")} />
        <Button
          text={"Add Shop"}
          errorMsg={formState.errors?.result?.message}
          loading={loading}
          disabled={!formState.isValid}
        />
      </AddForm>
    </Container>
  );
}
export default AddShop;
