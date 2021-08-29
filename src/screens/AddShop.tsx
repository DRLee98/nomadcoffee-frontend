import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import { Form, Input } from "../components/form/formShared";
import AddressInput from "../components/form/AddressInput";
import { useForm } from "react-hook-form";
import { MultiImageInput } from "../components/form/MultiImageInput";
import Button from "../components/form/Button";
import ErrorMsg from "../components/form/ErrorMsg";
import {
  ApolloCache,
  FetchResult,
  gql,
  useApolloClient,
  useMutation,
} from "@apollo/client";
import {
  createCoffeeShopMutation,
  createCoffeeShopMutationVariables,
} from "../__generated__/createCoffeeShopMutation";
import { useHistory } from "react-router-dom";
import useMe from "../hook/useMe";
import routes from "../routes";
import { SEE_COFFEE_SHOPS_QUERY } from "./Home";
import { getCategoryObj } from "../utils";

const CREATE_COFFEE_SHOP_MUTATION = gql`
  mutation createCoffeeShopMutation(
    $name: String!
    $latitude: String
    $longitude: String
    $address: String
    $categories: String
    $photos: [Upload]
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      address: $address
      categories: $categories
      photos: $photos
    ) {
      id
      ok
      error
      photoUrls
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
  color: ${(props) => props.theme.fontColor};
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
  const { data: userData } = useMe();
  const {
    register,
    formState,
    handleSubmit,
    setValue,
    getValues,
    watch,
    clearErrors,
  } = useForm<IAddShopForm>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  const updateAddCoffeeShop = (
    cache: ApolloCache<createCoffeeShopMutation>,
    result: FetchResult<createCoffeeShopMutation>,
  ) => {
    const resultData = result.data?.createCoffeeShop;
    if (resultData?.ok && resultData?.id && userData?.me) {
      const { name, categories } = getValues();
      const photos: { __typename: string; url: string }[] = [];
      if (resultData?.photoUrls && resultData?.photoUrls.length > 0) {
        resultData.photoUrls.forEach((photo) => {
          photos.push({ __typename: "CoffeeShopPhoto", url: photo });
        });
      }
      let shopCategories: {
        __typename: string;
        name: string;
        slug: any;
      }[] = [];
      if (categories) {
        shopCategories = getCategoryObj(categories);
      }
      const newCoffeeShop = {
        __typename: "CoffeeShop",
        id: resultData.id,
        name,
        ...(photos.length > 0 && { photos }),
        ...(shopCategories.length > 0 && { categories: shopCategories }),
        user: {
          ...userData.me,
        },
      };
      const newCacheCoffeeShop = cache.writeFragment({
        data: newCoffeeShop,
        fragment: gql`
          fragment CoffeeShopFrag on CoffeeShop {
            id
            name
            photos {
              url
            }
            categories {
              name
              slug
            }
            user {
              id
              username
              avatarURL
            }
          }
        `,
      });
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeCoffeeShops(prev) {
            const shops =
              prev.shops.length > 9 ? prev.shops.slice(0, 9) : prev.shops;
            return {
              ...prev,
              totalCount: prev.totalCount + 1,
              shops: [newCacheCoffeeShop, ...shops],
            };
          },
        },
      });
      history.push(routes.home);
    }
  };
  const [createCoffeeShopMutation, { loading }] = useMutation<
    createCoffeeShopMutation,
    createCoffeeShopMutationVariables
  >(CREATE_COFFEE_SHOP_MUTATION, {
    update: updateAddCoffeeShop,
  });
  const onSubmitValid = (data: IAddShopForm) => {
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
    createCoffeeShopMutation({
      variables: {
        name,
        latitude: latitude + "",
        longitude: longitude + "",
        address,
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
