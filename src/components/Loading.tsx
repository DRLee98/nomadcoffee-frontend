import React from "react";
import styled, { keyframes } from "styled-components";

const Dim = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgb(37 37 37 / 60%);
  overflow: hidden;
  z-index: 999;
`;

const wave = keyframes`
  0% {
    transform: translateY(0px);
  }
  15% {
    transform: translateY(-20px);
  }
//   40% {
//     transform: translateY(10px);
//   }
  30% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: ${(prop) => prop.theme.bgColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const LoadingDotList = styled.ul`
  margin-top: 1em;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const LoadingDot = styled.li`
  display: inline-block;
  background-color: ${(prop) => prop.theme.accent};
  padding: 5px;
  border-radius: 999px;
  &:first-child {
    animation: ${wave} 2s linear infinite;
  }
  &:nth-child(2) {
    animation: ${wave} 2s linear infinite 0.3s;
  }
  &:nth-child(3) {
    animation: ${wave} 2s linear infinite 0.6s;
  }
  &:nth-child(4) {
    animation: ${wave} 2s linear infinite 0.9s;
  }
  &:nth-child(5) {
    animation: ${wave} 2s linear infinite 1.2s;
  }
  & + & {
    margin-left: 1em;
  }
  ${Dim} & {
    background-color: ${(prop) => prop.theme.bgColor};
  }
`;

const DotLoadingBox = styled.div`
  background-color: ${(prop) => prop.theme.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 45vh;
`;

export const Loading = () => {
  return (
    <Container>
      <LoadingDotList>
        <LoadingDot></LoadingDot>
        <LoadingDot></LoadingDot>
        <LoadingDot></LoadingDot>
        <LoadingDot></LoadingDot>
      </LoadingDotList>
    </Container>
  );
};

export const DimLoading = () => {
  return (
    <Dim>
      <LoadingDotList>
        <LoadingDot></LoadingDot>
        <LoadingDot></LoadingDot>
        <LoadingDot></LoadingDot>
        <LoadingDot></LoadingDot>
      </LoadingDotList>
    </Dim>
  );
};
