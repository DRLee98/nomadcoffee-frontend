import styled from "styled-components";

export const Image = styled.img`
  width: ${(prop) => (prop.sizes ? prop.sizes : "20rem")};
  height: ${(prop) => (prop.sizes ? prop.sizes : "20rem")};
  border-radius: 999px;
  background-color: lightgray;
`;

interface ICircle {
  sizes?: string;
}

export const Circle = styled.div<ICircle>`
  width: ${(prop) => (prop.sizes ? prop.sizes : "20rem")};
  height: ${(prop) => (prop.sizes ? prop.sizes : "20rem")};
  border-radius: 999px;
  background-color: lightgray;
`;

export const Btn = styled.button`
  text-align: center;
  color: ${(props) => props.theme.BtnTextColor};
  padding: 10px 25px;
  border-radius: 5px;
  cursor: pointer;
`;
