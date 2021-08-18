import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { Image } from "../components/shared";
import { Slider } from "../components/Slider";
import { seeCoffeeShopQuery } from "../__generated__/seeCoffeeShopQuery";
import { useEffect, useState } from "react";
import useMe from "../hook/useMe";
import routes from "../routes";
import {
  deleteCoffeeShopMutation,
  deleteCoffeeShopMutationVariables,
} from "../__generated__/deleteCoffeeShopMutation";
import { SEE_COFFEE_SHOPS_QUERY } from "./Home";
import PageTitle from "../components/PageTitle";

export const SEE_COFFEE_SHOP_QUERY = gql`
  query seeCoffeeShopQuery($id: Int!) {
    seeCoffeeShop(id: $id) {
      id
      name
      latitude
      longitude
      user {
        id
        name
        email
        avatarURL
      }
      photos {
        url
      }
      categories {
        name
        slug
      }
    }
  }
`;

const DELETE_COFFEE_SHOP_MUTATION = gql`
  mutation deleteCoffeeShopMutation($id: Int!) {
    deleteCoffeeShop(id: $id) {
      ok
      error
    }
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const ShopName = styled.strong`
  font-size: 20px;
  font-weight: bolder;
  display: block;
  text-align: center;
  padding: 10px;
  background-color: ${(props) => props.theme.hoverColor};
`;

const BigImg = styled.img`
  width: 100%;
`;

const ImageItem = styled.li<ImageItemProp>`
  width: 120px;
  height: 120px;
  padding: 10px;
  cursor: pointer;
  ${(props) =>
    props.selected ? `background-color: ${props.theme.accent};` : ""}
  &:hover {
    ${(props) =>
      props.selected ? `background-color: ${props.theme.accent};` : ""}
    background-color: ${(props) =>
      !props.selected ? props.theme.hoverColor : ""};
  }
  & + & {
    margin-left: 5px;
  }
`;

const SmallImage = styled.img`
  width: 100%;
  height: 100%;
`;

const CategoryItem = styled.li`
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.accent};
  color: ${(props) => props.theme.accent};
  padding: 5px 15px;
  & + & {
    margin-left: 5px;
  }
`;

const UserBox = styled.div`
  background-color: rgb(255 255 255 / 30%);
  padding: 10px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
`;

const UserName = styled.span`
  display: block;
  font-weight: bold;
  font-size: 18px;
`;

const UserEmail = styled.span``;

const ShopInfo = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
`;

const BottomBox = styled.div`
  align-self: end;
  padding: 0 10px;
`;

const Box = styled.div``;

const BtnBox = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Btn = styled.button`
  color: ${(props) => props.theme.BtnTextColor};
  padding: 10px 25px;
  border-radius: 5px;
  cursor: pointer;
`;

const EditBtn = styled(Btn)`
  background-color: ${(props) => props.theme.greenBtnColor};
`;

const DeleteBtn = styled(Btn)`
  background-color: ${(props) => props.theme.redBtnColor};
`;

interface ImageItemProp {
  selected: boolean;
}

interface IParams {
  id: string;
}

function ShopDetail() {
  const history = useHistory();
  const client = useApolloClient();
  const { id } = useParams<IParams>();
  const { data, loading } = useQuery<seeCoffeeShopQuery>(
    SEE_COFFEE_SHOP_QUERY,
    {
      variables: { id: +id },
    },
  );
  const [url, setUrl] = useState<string>();
  const shop = data?.seeCoffeeShop;
  const { data: meData } = useMe();
  const me = meData?.me;
  const onCompleted = (data: deleteCoffeeShopMutation) => {
    const { ok, error } = data.deleteCoffeeShop;
    if (ok) {
      history.push(routes.home);
      client.cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeCoffeeShops(prev) {
            return prev.filter(
              (item: any) => item.__ref !== `CoffeeShop:${id}`,
            );
          },
        },
      });
    }
  };
  const [deleteCoffeeShopMutation, { loading: deleteLoading }] = useMutation<
    deleteCoffeeShopMutation,
    deleteCoffeeShopMutationVariables
  >(DELETE_COFFEE_SHOP_MUTATION, {
    onCompleted,
    refetchQueries: [SEE_COFFEE_SHOPS_QUERY],
  });
  const deleteShop = () => {
    const ok = window.confirm(`${shop?.name}을 삭제하시겠습니까?`);
    if (ok) {
      deleteCoffeeShopMutation({
        variables: { id: +id },
      });
    }
  };
  const editShop = () => {
    let categories = "";
    shop?.categories?.forEach((category, i) => {
      categories += i === 0 ? category?.name : `, ${category?.name}`;
    });
    history.push(routes.editShop(id), {
      name: shop?.name,
      categories,
      ownerId: shop?.user.id,
    });
  };
  useEffect(() => {
    if (shop?.photos) {
      setUrl(shop?.photos[0]?.url);
    }
  }, [shop]);
  return loading ? (
    <span>loading...</span>
  ) : (
    <Container>
      <PageTitle title={`${shop?.name}`} />
      <BigImg src={url} />
      <ShopInfo>
        <Box>
          <ShopName>{shop?.name}</ShopName>
          <UserBox>
            <Image sizes={"80px"} src={shop?.user?.avatarURL || ""} />
            <Box>
              <UserName>{shop?.user?.name}</UserName>
              <UserEmail>{shop?.user?.email}</UserEmail>
            </Box>
          </UserBox>
          {me?.id === shop?.user?.id && (
            <BtnBox>
              <EditBtn onClick={editShop}>Edit Shop</EditBtn>
              <DeleteBtn onClick={deleteShop}>Delete Shop</DeleteBtn>
            </BtnBox>
          )}
        </Box>
        <BottomBox>
          <Slider slideWidth={100}>
            {shop?.photos?.map((photo) => (
              <ImageItem
                selected={photo?.url === url}
                key={`photo${photo?.url}`}
                onClick={() => {
                  setUrl(photo?.url);
                }}
              >
                <SmallImage src={photo?.url} />
              </ImageItem>
            ))}
          </Slider>
          <Slider slideWidth={100}>
            {shop?.categories?.map((category) => (
              <CategoryItem key={`category${category?.name}_${shop?.id}`}>
                {category?.name}
              </CategoryItem>
            ))}
          </Slider>
        </BottomBox>
      </ShopInfo>
    </Container>
  );
}
export default ShopDetail;
