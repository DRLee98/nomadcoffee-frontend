import { useEffect } from "react";
import { MouseEvent, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import styled from "styled-components";
import { Postcode } from "../postCode";
import { SButton } from "./Button";
import { Input } from "./formShared";

const InputBox = styled.div`
  display: grid;
`;

const SearchBtn = styled(SButton).attrs({
  as: "button",
})``;

interface AddressInputProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
}

const AddressInput: React.FC<AddressInputProps> = ({ register, setValue }) => {
  const [postCodeLayer, setPostCodeLayer] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");

  const closePostcode = () => {
    setPostCodeLayer(false);
  };

  const searchAddress = (e: MouseEvent) => {
    e.preventDefault();
    setPostCodeLayer(true);
  };

  const setAddressResult = (data: string) => {
    setAddress(data);
  };

  useEffect(() => {
    setValue("location", address);
    setPostCodeLayer(false);
  }, [address]);

  return (
    <InputBox>
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
