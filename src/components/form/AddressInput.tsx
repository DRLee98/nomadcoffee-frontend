import { useEffect } from "react";
import { MouseEvent, useState } from "react";
import { AddressData } from "react-daum-postcode";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import styled from "styled-components";
import { Postcode } from "../../kakao/postCode";
import { SButton } from "./Button";
import { Input } from "./formShared";

const InputBox = styled.div<InputBoxProps>`
  display: grid;
  ${(props) =>
    props.fullWidth
      ? `width: 100%;
  grid-template-columns: 2fr 1fr;`
      : ""}
`;

const SearchBtn = styled(SButton).attrs({
  as: "button",
})``;

interface InputBoxProps {
  fullWidth?: boolean;
}

interface AddressInputProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  fullWidth?: boolean;
}

interface AddressResult extends AddressData {
  lat: number | undefined;
  lng: number | undefined;
}

const AddressInput: React.FC<AddressInputProps> = ({
  register,
  setValue,
  fullWidth = false,
}) => {
  const [postCodeLayer, setPostCodeLayer] = useState<boolean>(false);
  const [address, setAddress] = useState<AddressResult>();

  const closePostcode = () => {
    setPostCodeLayer(false);
  };

  const searchAddress = (e: MouseEvent) => {
    e.preventDefault();
    setPostCodeLayer(true);
  };

  const setAddressResult = (data: AddressResult) => {
    setAddress(data);
  };

  useEffect(() => {
    if (address) {
      setValue("location", address.address);
      if (address.lat && address.lng) {
        setValue("latitude", address.lat);
        setValue("longitude", address.lng);
      }
    }
    setPostCodeLayer(false);
  }, [address]);

  return (
    <InputBox fullWidth={fullWidth}>
      <Input
        {...register("location")}
        disabled
        placeholder="Location"
        type="text"
      />
      <SearchBtn onClick={searchAddress}>주소 찾기</SearchBtn>
      {postCodeLayer && (
        <Postcode
          setAddressResult={setAddressResult}
          closePostcode={closePostcode}
        />
      )}
    </InputBox>
  );
};

export default AddressInput;
