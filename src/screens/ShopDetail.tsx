import {
  ApolloCache,
  FetchResult,
  gql,
  useApolloClient,
  useMutation,
  useQuery,
} from "@apollo/client";
import styled from "styled-components";
import { Link, useHistory, useParams } from "react-router-dom";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Btn, Image } from "../components/shared";
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
import { Loading } from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoryItem from "../components/CategoryItem";
import {
  toggleLikeMutation,
  toggleLikeMutationVariables,
} from "../__generated__/toggleLikeMutation";
import CommentInput from "../components/form/CommentInput";
import Comment from "../components/Comment";
import { KakaoMap } from "../kakao/kakaoMap";
import Avatar from "../components/Avatar";

const SEE_COFFEE_SHOP_QUERY = gql`
  query seeCoffeeShopQuery($id: Int!) {
    seeCoffeeShop(id: $id) {
      id
      name
      address
      latitude
      longitude
      totalLikes
      totalComments
      isLiked
      user {
        id
        name
        email
        username
        avatarURL
        isMe
      }
      photos {
        url
      }
      categories {
        name
        slug
      }
      comments {
        id
        payload
        totalReply
        createdAt
        user {
          id
          username
          avatarURL
          isMe
        }
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

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLikeMutation($shopId: Int!) {
    toggleLike(shopId: $shopId) {
      ok
      error
      isLiked
    }
  }
`;

const Container = styled.div``;

const ShopContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const ShopName = styled.strong`
  font-size: 20px;
  font-weight: bolder;
  display: block;
  text-align: center;
  padding: 10px;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.hoverColor};
`;

const ImageBox = styled.div`
  position: relative;
`;

const BigImg = styled.img`
  width: 500px;
  height: 500px;
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

const UserBox = styled(Link)`
  color: ${(props) => props.theme.fontColor};
  //background-color: rgb(255 255 255 / 30%);
  padding: 10px;
  //border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  cursor: pointer;
`;

const UserName = styled.span`
  display: block;
  font-weight: bold;
  font-size: 18px;
`;

const UserEmail = styled.span``;

const ShopInfo = styled.div`
  display: grid;
  gap: 10px;
  grid-template-rows: repeat(3, 1fr);
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

const EditBtn = styled(Btn)`
  background-color: ${(props) => props.theme.greenBtnColor};
`;

const DeleteBtn = styled(Btn)`
  background-color: ${(props) => props.theme.redBtnColor};
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #ffffff4d;
  border-radius: 15px;
  z-index: 5;
  cursor: pointer;
`;

const IconText = styled.span`
  margin-left: 2px;
`;

const Icon = styled(FontAwesomeIcon)``;

const CommentContainer = styled.div`
  margin-top: 30px;
`;

const CommentText = styled.span`
  display: block;
  font-weight: bold;
  font-size: 18px;
  color: ${(props) => props.theme.grayColor};
  border-bottom: 1px solid ${(props) => props.theme.accent};
  margin-bottom: 15px;
`;

const CommentList = styled.ul``;

const MapBox = styled.div``;

interface ImageItemProp {
  selected: boolean;
}

interface IParams {
  id: string;
}

function ShopDetail() {
  const history = useHistory();
  const { id } = useParams<IParams>();
  const { data: meData } = useMe();
  const [url, setUrl] = useState<string>();
  const me = meData?.me;

  const { data, loading } = useQuery<seeCoffeeShopQuery>(
    SEE_COFFEE_SHOP_QUERY,
    {
      variables: { id: +id },
    }
  );

  const [deleteCoffeeShopMutation, { loading: deleteLoading }] = useMutation<
    deleteCoffeeShopMutation,
    deleteCoffeeShopMutationVariables
  >(DELETE_COFFEE_SHOP_MUTATION);

  const [toggleLikeMutation, { data: likeData, loading: likeLoading }] =
    useMutation<toggleLikeMutation, toggleLikeMutationVariables>(
      TOGGLE_LIKE_MUTATION
    );

  const shop = data?.seeCoffeeShop;

  const updateDeleteCoffeeShop = (
    cache: ApolloCache<deleteCoffeeShopMutation>,
    result: FetchResult<deleteCoffeeShopMutation>
  ) => {
    const resultData = result.data?.deleteCoffeeShop;
    if (resultData?.ok) {
      history.push(routes.home);
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeCoffeeShops(prev) {
            return prev.filter(
              (item: any) => item.__ref !== `CoffeeShop:${id}`
            );
          },
        },
      });
    }
  };

  const updateToggleLike = (
    cache: ApolloCache<toggleLikeMutation>,
    result: FetchResult<toggleLikeMutation>
  ) => {
    const resultData = result.data?.toggleLike;
    if (resultData) {
      if (!resultData?.ok && resultData?.error) {
        console.log(resultData.error);
      } else if (resultData.isLiked) {
        cache.modify({
          id: `CoffeeShop:${id}`,
          fields: {
            totalLikes(prev) {
              return resultData.isLiked ? prev + 1 : prev - 1;
            },
            isLiked() {
              return resultData.isLiked;
            },
          },
        });
      }
    }
  };

  const deleteShop = () => {
    const ok = window.confirm(`${shop?.name}을 삭제하시겠습니까?`);
    if (ok) {
      deleteCoffeeShopMutation({
        variables: { id: +id },
        update: updateDeleteCoffeeShop,
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

  const handleToggleLike = () => {
    toggleLikeMutation({
      variables: { shopId: +id },
      update: updateToggleLike,
    });
  };

  useEffect(() => {
    if (shop?.photos) {
      setUrl(shop?.photos[0]?.url);
    }
  }, [shop]);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <PageTitle title={`${shop?.name}`} />
      <ShopContainer>
        <ImageBox>
          <BigImg src={url} />
          <IconBox onClick={handleToggleLike}>
            <Icon
              icon={shop?.isLiked ? solidHeart : faHeart}
              color={shop?.isLiked ? "red" : "black"}
            />
            <IconText>{shop?.totalLikes}</IconText>
          </IconBox>
        </ImageBox>
        <ShopInfo>
          <Box>
            <ShopName>{shop?.name}</ShopName>
            <UserBox
              to={
                shop?.user.isMe
                  ? routes.myProfile
                  : routes.profile(shop?.user.id)
              }
            >
              <Avatar sizes={"80px"} url={shop?.user?.avatarURL} />
              <Box>
                <UserName>{shop?.user?.name}</UserName>
                <UserEmail>{shop?.user?.email}</UserEmail>
              </Box>
            </UserBox>
          </Box>
          <MapBox>
            {shop?.latitude && shop?.longitude && (
              <KakaoMap
                lat={+shop?.latitude}
                lng={+shop?.longitude}
                address={shop.address}
              />
            )}
          </MapBox>
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
                <CategoryItem
                  {...category}
                  key={`category${category?.name}_${shop?.id}`}
                />
              ))}
            </Slider>
          </BottomBox>
        </ShopInfo>
      </ShopContainer>
      {me?.id === shop?.user?.id && (
        <BtnBox>
          <EditBtn onClick={editShop}>Edit Shop</EditBtn>
          <DeleteBtn onClick={deleteShop}>Delete Shop</DeleteBtn>
        </BtnBox>
      )}
      {shop && (
        <CommentContainer>
          <CommentText>댓글 : {shop?.totalComments}</CommentText>
          {me && <CommentInput shopId={shop.id} />}
          <CommentList>
            {shop.comments?.map((comment) => (
              <Comment key={`comment_${comment.id}`} {...comment} />
            ))}
          </CommentList>
        </CommentContainer>
      )}
    </Container>
  );
}
export default ShopDetail;
