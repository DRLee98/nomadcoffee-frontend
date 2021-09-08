import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

export const SButton = styled.input<ISButtonProp>`
  border-radius: 3px;
  background-color: ${(props) =>
    props.error || props.redBgColor
      ? props.theme.errorColor
      : props.basicBgColor
      ? props.theme.bgColor
      : props.disabled
      ? props.theme.disabledBg
      : props.theme.accent};
  color: ${(props) => (props.basicBgColor ? props.theme.fontColor : "white")};
  text-align: center;
  padding: 10px 0px;
  font-weight: 800;
  width: 100%;
  cursor: ${(props) => (props.disabled || props.error ? "" : "pointer")};
  transition: all 0.2s ease;
  ${(props) =>
    props.basicBgColor ? `border: 1px solid ${props.theme.fontColor}` : ""};
  &:hover {
    opacity: ${(props) => (props.disabled || props.error ? "" : "0.8")};
  }
`;

interface ISButtonProp {
  disabled?: boolean;
  error?: boolean;
  redBgColor?: boolean;
  basicBgColor?: boolean;
}

interface IButtonProp {
  text: string;
  errorMsg?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: Function;
  redBgColor?: boolean;
  basicBgColor?: boolean;
}

const Button: React.FC<IButtonProp> = ({
  text,
  errorMsg,
  loading,
  disabled,
  onClick,
  redBgColor,
  basicBgColor,
}) => {
  const [value, setValue] = useState<string>(text);
  useEffect(() => {
    if (errorMsg) {
      setValue(errorMsg);
    } else if (loading) {
      setValue("Loading...");
    } else {
      setValue(text);
    }
  }, [errorMsg, loading, text]);
  return (
    <SButton
      type="submit"
      value={value}
      error={Boolean(errorMsg)}
      disabled={disabled || loading}
      onClick={() => onClick && onClick()}
      redBgColor={redBgColor}
      basicBgColor={basicBgColor}
    />
  );
};

export default Button;
