import styled from "styled-components";

export const Image = styled.img`
  width: ${(prop) => (prop.sizes ? prop.sizes : "20rem")};
  height: ${(prop) => (prop.sizes ? prop.sizes : "20rem")};
  border-radius: 999px;
  background-color: lightgray;
`;
