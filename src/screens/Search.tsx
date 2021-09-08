import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import { Loading } from "../components/Loading";
import Pagination from "../components/Pagination";
import SimpleShopItem from "../components/SimpleShopItem";
import routes from "../routes";
import {
  searchCoffeeShopQuery,
  searchCoffeeShopQuery_searchCoffeeShop_shops,
} from "../__generated__/searchCoffeeShopQuery";

const SEARCH_COFFEE_SHOP_QUERY = gql`
  query searchCoffeeShopQuery($word: String!, $page: Int) {
    searchCoffeeShop(word: $word, page: $page) {
      totalPage
      totalCount
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

const SearchTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
`;

const SearchTitleText = styled.h1`
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

interface SearchParamProps {
  word: string;
}

const Search = () => {
  const location = useLocation();
  const { word } = useParams<SearchParamProps>();

  const [_, page] = location.search.split("page=");

  const { loading, data, called } = useQuery<searchCoffeeShopQuery>(
    SEARCH_COFFEE_SHOP_QUERY,
    {
      variables: {
        word,
        page: +page,
      },
    },
  );

  const totalPage = data?.searchCoffeeShop?.totalPage;

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Box>
        <SearchTitleBox>
          <SearchTitleText>{word}</SearchTitleText>
        </SearchTitleBox>
        {data?.searchCoffeeShop?.shops &&
        data?.searchCoffeeShop?.shops.length > 0 ? (
          <GridBox>
            {data?.searchCoffeeShop?.shops.map((shop) => (
              <SimpleShopItem key={shop.id} {...shop} />
            ))}
          </GridBox>
        ) : (
          <IconBox>
            <Icon icon={faSearch} />
          </IconBox>
        )}
      </Box>
      {totalPage && (
        <Pagination
          url={routes.search(word)}
          totalPage={totalPage}
          currentPage={+page}
        />
      )}
    </Container>
  );
};

export default Search;
