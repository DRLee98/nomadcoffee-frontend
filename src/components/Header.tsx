import { Link } from "react-router-dom";
import styled from "styled-components";
import { siteName } from "../constants";
import useMe from "../hook/useMe";
import routes from "../routes";
import { Image } from "./shared";

const SHeader = styled.header`
  width: 100%;
  box-shadow: 0 2px 2px 1px rgb(64 60 67 / 16%);
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Title = styled.strong`
  cursor: pointer;
`;

const SLink = styled(Link)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  const { data } = useMe();
  const me = data?.me;
  return (
    <SHeader>
      <Wrapper>
        <Box>
          <Title>
            <Link to={routes.home}>{siteName}</Link>
          </Title>
        </Box>
        <Box>
          <SLink to={routes.addShop}>Add Shop</SLink>
          <Image src={me?.avatarURL || ""} sizes={"25px"} />
        </Box>
      </Wrapper>
    </SHeader>
  );
};

export default Header;
