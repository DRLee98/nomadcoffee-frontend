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
  editCoffeeShopMutation,
  editCoffeeShopMutationVariables,
} from "../__generated__/editCoffeeShopMutation";
import { useHistory, useLocation, useParams } from "react-router-dom";
import useMe from "../hook/useMe";
import { useEffect } from "react";
import routes from "../routes";
import { SEE_COFFEE_SHOP_QUERY } from "./ShopDetail";
import { SEE_COFFEE_SHOPS_QUERY } from "./Home";

const EDIT_COFFEE_SHOP_MUTATION = gql`
  mutation editCoffeeShopMutation(
    $id: Int!
    $name: String
    $latitude: String
    $longitude: String
    $address: String
    $categories: String
    $photos: [Upload]
  ) {
    editCoffeeShop(
      id: $id
      name: $name
      latitude: $latitude
      longitude: $longitude
      address: $address
      categories: $categories
      photos: $photos
    ) {
      ok
      error
    }
  }
`;

const Container = styled.div``;

const EditForm = styled(Form)`
  padding: 20px;
  background-color: ${(props) => props.theme.wrapperBg};
  box-shadow: 0 2px 2px 1px rgb(64 60 67 / 16%);
  border-radius: 10px;
`;

const Title = styled.h1`
  font-weight: bolder;
  font-size: 25px;
  color: ${(props) => props.theme.fontColor};
`;

interface IEditShopForm {
  name?: string;
  categories?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  files: FileList;
  result?: string;
}

interface ILocation {
  name?: string;
  categories?: string;
  ownerId: number;
}

interface IParams {
  id: string;
}

function EditShop() {
  const history = useHistory();
  const location = useLocation<ILocation>();
  const client = useApolloClient();
  const { id } = useParams<IParams>();
  const { data: meData } = useMe();
  const me = meData?.me;
  const { register, formState, handleSubmit, setValue, watch, clearErrors } =
    useForm<IEditShopForm>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      defaultValues: {
        name: location?.state?.name || "",
        categories: location?.state?.categories || "",
      },
    });
  const [editCoffeeShopMutation, { loading }] = useMutation<
    editCoffeeShopMutation,
    editCoffeeShopMutationVariables
  >(EDIT_COFFEE_SHOP_MUTATION, {
    refetchQueries: [SEE_COFFEE_SHOPS_QUERY, SEE_COFFEE_SHOP_QUERY],
    onCompleted: async (data) => {
      const { ok, error } = data.editCoffeeShop;
      if (ok) {
        history.push(routes.shopDetail(id));
      }
    },
  });
  const onSubmitValid = (data: IEditShopForm) => {
    if (loading) {
      return;
    }
    const {
      name,
      latitude,
      longitude,
      location: address,
      categories,
      files,
    } = data;
    const photos = [];
    for (let i = 0; i < files.length; i++) {
      photos.push(files[i]);
    }
    editCoffeeShopMutation({
      variables: {
        id: +id,
        ...(name && { name }),
        ...(categories && { categories }),
        ...(latitude && { latitude: latitude + "" }),
        ...(longitude && { longitude: longitude + "" }),
        ...(address && { address }),
        ...(photos.length > 0 && { photos }),
      },
    });
  };
  const clearLoginError = () => {
    clearErrors("result");
  };
  useEffect(() => {
    const ownerId = location?.state?.ownerId;
    if (ownerId !== me?.id) {
      history.push(routes.home);
    }
  }, [me, location]);
  return (
    <Container>
      <PageTitle title={`${location?.state?.name} Edit`} />
      <EditForm onSubmit={handleSubmit(onSubmitValid)}>
        <Title>Edit Shop</Title>
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
          text={"Edit Shop"}
          errorMsg={formState.errors?.result?.message}
          loading={loading}
          disabled={!formState.isValid}
        />
      </EditForm>
    </Container>
  );
}
export default EditShop;
