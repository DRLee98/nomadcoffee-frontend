import { useEffect } from "react";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { Image } from "../shared";

const FileInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FileInput = styled.input`
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
`;

interface ImageInputProps {
  register: UseFormRegister<any>;
  url?: string | null | undefined;
  files?: FileList;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  register,
  url,
  files,
}) => {
  const [previewUrl, setPreviewUrl] = useState<any>();

  useEffect(() => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
    }
  }, [files]);

  return (
    <FileInputBox>
      <Label htmlFor="file">
        <Image src={previewUrl || url} />
      </Label>
      <FileInput
        {...register("file")}
        id="file"
        type="file"
        accept=".png, .jpg, .jepg"
        //onChange={handleOnChange}
      />
    </FileInputBox>
  );
};
