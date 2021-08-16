import styled from "styled-components";

export const Error = styled.span`
  width: 100%;
  text-align: left;
  font-size: 14px;
  color: ${(props) => props.theme.errorColor};
`;

interface IErrorMsg {
  msg?: string;
}

const ErrorMsg: React.FC<IErrorMsg> = ({ msg }) => {
  return msg ? <Error>{msg}</Error> : null;
};

export default ErrorMsg;
