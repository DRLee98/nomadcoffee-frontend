import { gql, useQuery } from "@apollo/client";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import { Loading } from "../components/Loading";
import PageTitle from "../components/PageTitle";
import { Image } from "../components/shared";
import { Slider } from "../components/Slider";
import routes from "../routes";
import {
  seeCoffeeShopsQuery,
  seeCoffeeShopsQuery_seeCoffeeShops,
} from "../__generated__/seeCoffeeShopsQuery";
import { coffeeShopsCountPageQuery } from "../__generated__/coffeeShopsCountPageQuery";
import CategoryItem from "../components/CategoryItem";
import Pagination from "../components/Pagination";
import Avatar from "../components/Avatar";

export const SEE_COFFEE_SHOPS_QUERY = gql`
  query seeCoffeeShopsQuery($page: Int) {
    seeCoffeeShops(page: $page) {
      id
      name
      totalLikes
      totalComments
      isLiked
      user {
        id
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
    }
  }
`;

export const COFFEE_SHOPS_COUNT_PAGE_QUERY = gql`
  query coffeeShopsCountPageQuery {
    coffeeShopsCountPage {
      totalCount
      totalPage
    }
  }
`;

const Container = styled.div`
  padding-bottom: 50px;
`;

const ShopList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px 20px;
`;

const ShopItem = styled.li`
  border: 1px solid ${(props) => props.theme.disabledBg};
  padding: 10px;
  box-shadow: rgb(64 60 67 / 16%) 0px 2px 5px 1px;
`;

const ShopMain = styled.div`
  position: relative;
  margin-bottom: 5px;
`;

const ShopName = styled.strong`
  position: absolute;
  left: 0;
  right: 0;
  top: 20px;
  text-align: center;
  padding: 10px;
  background-color: rgb(255 255 255 / 30%);
`;

const BigImg = styled.img`
  width: 100%;
  max-width: 450px;
  max-height: 450px;
`;

const ImageItem = styled.li`
  width: 100px;
  height: 100px;
  & + & {
    margin-left: 5px;
  }
`;

const SmallImage = styled.img`
  width: 100%;
  height: 100%;
`;

const UserBox = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  background-color: rgb(255 255 255 / 30%);
  padding: 4px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: #ffffff4d;
  border-radius: 15px;
  z-index: 5;
`;

const Box = styled.div``;

const CountText = styled.span`
  margin-left: 2px;
`;

const Icon = styled(FontAwesomeIcon)``;

const SLink = styled(Link)`
  cursor: pointer;
`;

function Home() {
  const location = useLocation();

  const { data: pageData } = useQuery<coffeeShopsCountPageQuery>(
    COFFEE_SHOPS_COUNT_PAGE_QUERY
  );

  const totalPage = pageData?.coffeeShopsCountPage?.totalPage;
  const [_, page] = location.search.split("page=");

  const { data, loading } = useQuery<seeCoffeeShopsQuery>(
    SEE_COFFEE_SHOPS_QUERY,
    { variables: { page: +page } }
  );

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <PageTitle title={"Home"} />
      <ShopList>
        {data?.seeCoffeeShops?.map(
          (shop: seeCoffeeShopsQuery_seeCoffeeShops) => (
            <ShopItem key={shop?.id}>
              <SLink to={routes.shopDetail(shop?.id)}>
                <ShopMain>
                  <ShopName>{shop?.name}</ShopName>
                  {shop?.photos && <BigImg src={shop?.photos[0]?.url} />}
                  <UserBox>
                    <Avatar sizes={"80px"} url={shop?.user?.avatarURL} />
                  </UserBox>
                  <IconBox style={{ marginTop: 5 }}>
                    <Box style={{ marginRight: 8 }}>
                      <Icon
                        icon={shop?.isLiked ? solidHeart : faHeart}
                        color={shop?.isLiked ? "red" : "black"}
                      />
                      <CountText>{shop?.totalLikes}</CountText>
                    </Box>
                    <Box>
                      <Icon icon={faCommentDots} />
                      <CountText>{shop?.totalComments}</CountText>
                    </Box>
                  </IconBox>
                </ShopMain>
              </SLink>
              <Slider slideWidth={100}>
                {shop?.categories?.map((category) => (
                  <CategoryItem
                    {...category}
                    key={`category${category?.name}_${shop?.id}`}
                  />
                ))}
              </Slider>
            </ShopItem>
          )
        )}
      </ShopList>
      {totalPage && (
        <Pagination
          url={routes.home}
          totalPage={totalPage}
          currentPage={isNaN(+page) ? 1 : +page}
        />
      )}
    </Container>
  );
}
export default Home;
