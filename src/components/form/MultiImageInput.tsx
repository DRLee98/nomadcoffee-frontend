import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { Image } from "../shared";
import { Slider } from "../Slider";

const FileInputBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const FileInput = styled.input`
  display: none;
`;

const Label = styled.label`
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100px;
  min-height: 100px;
  min-width: 100px;
  background-color: #d3d3d333;
  border-radius: 10px;
  font-size: 35px;
  color: ${(props) => props.theme.accent};
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
`;

const FileList = styled.ul`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 20px;
`;

const FileItem = styled.li`
  width: 100px;
  height: 100px;
  & img {
    height: 100px;
    width: 100px;
    border-radius: 10px;
    background-color: #d3d3d333;
  }
`;

interface MultiImageInputProps {
  register: UseFormRegister<any>;
  files?: FileList;
}

export const MultiImageInput: React.FC<MultiImageInputProps> = ({
  register,
  files,
}) => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] =
    useState<{ fileName: string; src: string }[]>();

  console.log(files);

  useEffect(() => {
    setFileList([]);
    setPreviewUrls([]);
    if (files && files.length > 0) {
      console.log(files);
      for (let i = 0; i < files.length; i++) {
        setFileList((prev) => [files[i], ...prev]);
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onloadend = () => {
          setPreviewUrls((prev) => {
            if (prev && prev.length > 0) {
              return [
                ...prev,
                { fileName: files[i].name, src: reader.result + "" },
              ];
            }
            return [{ fileName: files[i].name, src: reader.result + "" }];
          });
        };
      }
      //   const reader = new FileReader();
      //   reader.readAsDataURL(file);
      //   reader.onloadend = () => {
      //     setPreviewUrls(reader.result);
      //   };
    }
  }, [files]);

  return (
    <FileInputBox>
      <Label htmlFor="file">
        <FontAwesomeIcon icon={faPlusCircle} />
      </Label>
      <FileInput
        {...register("files")}
        id="file"
        type="file"
        multiple
        accept=".png, .jpg, .jepg"
        //onChange={handleOnChange}
      />
      <Slider slideWidth={112}>
        <FileList>
          {fileList &&
            fileList.map((file, i) => {
              const targetObj =
                previewUrls &&
                previewUrls.find((obj) => obj.fileName === file.name);
              return (
                <FileItem key={i}>
                  {targetObj && targetObj.src && <Image src={targetObj.src} />}
                </FileItem>
              );
            })}
        </FileList>
      </Slider>
    </FileInputBox>
  );
};
