import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../routes";
import { seeCategoryQuery_seeCategory_shops } from "../__generated__/seeCategoryQuery";

const Shop = styled.div`
  width: 200px;
  height: 200px;
`;

const SLink = styled(Link)`
  cursor: pointer;
`;

const ShopMain = styled.div`
  position: relative;
`;

const ShopName = styled.span`
  font-weight: bold;
  position: absolute;
  left: 0;
  right: 0;
  top: 20px;
  text-align: center;
  padding: 10px;
  background-color: #ffffff4d;
  z-index: 5;
`;

const BigImg = styled.img`
  width: 200px;
  height: 200px;
  background-color: black;
`;

const SimpleShopItem: React.FC<seeCategoryQuery_seeCategory_shops> = ({
  id,
  name,
  photos,
}) => {
  return (
    <Shop>
      <SLink to={routes.shopDetail(id)}>
        <ShopMain>
          <ShopName>{name}</ShopName>
          <BigImg src={photos ? photos[0]?.url : ""} />
        </ShopMain>
      </SLink>
    </Shop>
  );
};

export default SimpleShopItem;
