import React, { MouseEventHandler } from "react";
import DaumPostcode, { AddressData } from "react-daum-postcode";
import styled from "styled-components";
import { getLatLng } from "./kakaoMap";

const LayerBackGround = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(37 37 37 / 60%);
  z-index: 999;
`;

const PostcodeBox = styled.div`
  position: relative;
`;

const CloseBtn = styled.button`
  z-index: 999;
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: -50px;
  background-color: white;
  border-radius: 10px;
  padding: 10px 5px;
`;

interface PostcodeProps {
  setAddressResult: Function;
  closePostcode: MouseEventHandler<HTMLButtonElement>;
}

export const Postcode: React.FC<PostcodeProps> = ({
  setAddressResult,
  closePostcode,
}) => {
  const handleComplete = async (data: AddressData) => {
    const { lat, lng } = await getLatLng(data.address);
    setAddressResult({ ...data, lat, lng });
  };

  const styles = {
    maxWidth: "750px",
    minWidth: "380px",
  } as React.CSSProperties;

  return (
    <LayerBackGround>
      <PostcodeBox>
        <CloseBtn onClick={closePostcode}>닫기</CloseBtn>
        <DaumPostcode
          onComplete={handleComplete}
          width={"50vw"}
          height={"80vh"}
          style={styles}
        />
      </PostcodeBox>
    </LayerBackGround>
  );
};
