import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Loading } from "../components/Loading";
import PageTitle from "../components/PageTitle";
import { Image } from "../components/shared";
import { Slider } from "../components/Slider";
import routes from "../routes";
import { seeCoffeeShopsQuery } from "../__generated__/seeCoffeeShopsQuery";

export const SEE_COFFEE_SHOPS_QUERY = gql`
  query seeCoffeeShopsQuery($page: Int) {
    seeCoffeeShops(page: $page) {
      totalPage
      totalCount
      shops {
        id
        name
        user {
          id
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

const CategoryItem = styled.li`
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.accent};
  font-weight: bold;
  color: ${(props) => props.theme.accent};
  padding: 5px 15px;
  & + & {
    margin-left: 5px;
  }
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

const SLink = styled(Link)`
  cursor: pointer;
`;

function Home() {
  const { data, loading } = useQuery<seeCoffeeShopsQuery>(
    SEE_COFFEE_SHOPS_QUERY,
  );
  return loading ? (
    <Loading />
  ) : (
    <Container>
      <PageTitle title={"Home"} />
      <ShopList>
        {data?.seeCoffeeShops?.shops?.map((shop) => (
          <ShopItem key={shop?.id}>
            <SLink to={routes.shopDetail(shop?.id)}>
              <ShopMain>
                <ShopName>{shop?.name}</ShopName>
                <BigImg src={shop?.photos ? shop?.photos[0]?.url : ""} />
                <UserBox>
                  <Image sizes={"80px"} src={shop?.user?.avatarURL || ""} />
                </UserBox>
              </ShopMain>
            </SLink>
            <Slider slideWidth={100}>
              {shop?.categories?.map((category) => (
                <CategoryItem key={`category${category?.name}_${shop?.id}`}>
                  {category?.name}
                </CategoryItem>
              ))}
            </Slider>
          </ShopItem>
        ))}
      </ShopList>
    </Container>
  );
}
export default Home;
