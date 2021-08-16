import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

interface IInputProp {
  error?: boolean;
}

export const Input = styled.input<IInputProp>`
  min-width: 250px;
  width: 100%;
  padding: 10px;
  color: ${(props) => props.theme.accent};
  border: ${(props) =>
    props.error ? `2px solid ${props.theme.errorColor}` : ""};
  border-radius: 3px;
  transition: all 0.2s ease;
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
  &::placeholder {
    color: #adadad;
    font-weight: bold;
  }
  box-sizing: border-box;
`;
