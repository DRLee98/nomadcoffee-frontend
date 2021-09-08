import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import { darkModeVar } from "../apollo";
import { Loading } from "../components/Loading";
import SimpleShopItem from "../components/SimpleShopItem";
import { darkTheme, lightTheme } from "../styles";
import {
  seeCategoryQuery,
  seeCategoryQuery_seeCategory_shops,
} from "../__generated__/seeCategoryQuery";

const SEE_CATEGORY_QUERY = gql`
  query seeCategoryQuery($slug: String!, $page: Int) {
    seeCategory(slug: $slug, page: $page) {
      totalShops
      shops {
        id
        name
        photos {
          url
        }
      }
    }
  }
`;

const Container = styled.div`
  padding-bottom: 50px;
`;

const Box = styled.div`
  padding: 10px 0;
  align-items: center;
`;

const CategoryTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
`;

const CategoryTitleText = styled.h1`
  display: inline-block;
  text-align: center;
  padding: 8px 20px;
  border-radius: 20px;
  border: 2px solid ${(props) => props.theme.accent};
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.accent};
`;

const GridBox = styled.div`
  margin: auto;
  margin-top: 30px;
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  grid-gap: 10px;
  justify-items: center;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70vh;
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.grayColor};
  opacity: 0.5;
  font-size: 100px;
`;

interface CategoryParamProps {
  slug: string;
}

interface CategoryLocationProps {
  name: string;
}

const Category = () => {
  const location = useLocation<CategoryLocationProps>();
  const { slug } = useParams<CategoryParamProps>();
  const [shops, setShops] = useState<seeCategoryQuery_seeCategory_shops[] | []>(
    [],
  );
  const [loadMore, setLoadMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const { loading, data, refetch, fetchMore, called } =
    useQuery<seeCategoryQuery>(SEE_CATEGORY_QUERY, {
      variables: {
        slug,
        page,
      },
    });

  useEffect(() => {
    const resultShop = data?.seeCategory?.shops || [];
    if (resultShop && shops.length === 0) {
      setShops(resultShop);
      if (resultShop.length < 30) {
        setLoadMore(false);
      }
    }
  }, [called, loading]);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Box>
        <CategoryTitleBox>
          <CategoryTitleText>{location.state.name}</CategoryTitleText>
        </CategoryTitleBox>
        {shops.length > 0 ? (
          <GridBox>
            {shops.map((shop) => (
              <SimpleShopItem key={shop.id} {...shop} />
            ))}
          </GridBox>
        ) : (
          <IconBox>
            <Icon icon={faSearch} />
          </IconBox>
        )}
      </Box>
    </Container>
  );
};

export default Category;
