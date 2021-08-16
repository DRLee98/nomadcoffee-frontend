import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkBox = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -35px;
  text-align: center;
  color: ${(props) => props.theme.accent};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

interface IGoLink {
  text: string;
  path: string;
}

const GoLink: React.FC<IGoLink> = ({ text, path }) => {
  return (
    <LinkBox>
      <Link to={path}>{text}</Link>
    </LinkBox>
  );
};

export default GoLink;
