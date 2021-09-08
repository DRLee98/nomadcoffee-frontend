import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../routes";

const CategoryBox = styled.div`
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.accent};
  padding: 5px 15px;
  transition: background-color 0.3s ease;
  & + & {
    margin-left: 5px;
  }
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
`;

const CategoryLink = styled(Link)`
  font-weight: bold;
  color: ${(props) => props.theme.accent};
  cursor: pointer;
`;

interface CategoryItemProps {
  name: string;
  slug: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name, slug }) => {
  return (
    <CategoryBox>
      <CategoryLink to={{ pathname: routes.category(slug), state: { name } }}>
        {name}
      </CategoryLink>
    </CategoryBox>
  );
};

export default CategoryItem;
