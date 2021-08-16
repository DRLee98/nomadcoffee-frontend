import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

export const SButton = styled.input<ISButtonProp>`
  border-radius: 3px;
  background-color: ${(props) =>
    props.error
      ? props.theme.errorColor
      : props.disabled
      ? props.theme.disabledBg
      : props.theme.accent};
  color: white;
  text-align: center;
  padding: 10px 0px;
  font-weight: 800;
  width: 100%;
  cursor: ${(props) => (props.disabled || props.error ? "" : "pointer")};
  transition: all 0.2s ease;
  &:hover {
    opacity: ${(props) => (props.disabled || props.error ? "" : "0.8")};
  }
`;

interface ISButtonProp {
  disabled?: boolean;
  error?: boolean;
}

interface IButtonProp {
  text: string;
  errorMsg?: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<IButtonProp> = ({
  text,
  errorMsg,
  loading,
  disabled,
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
    />
  );
};

export default Button;
