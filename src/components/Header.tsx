import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { siteName } from "../constants";
import useMe from "../hook/useMe";
import routes from "../routes";
import Avatar from "./Avatar";
import DarkModeBtn from "./DarkMode";
import { Input } from "./form/formShared";

const SHeader = styled.header`
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  box-shadow: 0 2px 2px 1px rgb(64 60 67 / 16%);
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.fontColor};
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

const ProfileLink = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled(Input)`
  padding: 3px;
  border-radius: 0;
  border-bottom: 1px solid ${(props) => props.theme.accent};
`;

const SearchButton = styled(Link)`
  padding: 3px 5px;
  border-radius: 999px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.accent};
`;

const Header = () => {
  const { data } = useMe();
  const me = data?.me;
  const [word, setWord] = useState<string>();
  return (
    <SHeader>
      <Wrapper>
        <Box>
          <Title>
            <Link to={routes.home}>{siteName}</Link>
          </Title>
        </Box>
        <Box>
          <SearchBox>
            <SearchInput
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="검색어를 입력해주세요."
            />
            <SearchButton to={routes.search(word)}>
              <Icon icon={faSearch} />
            </SearchButton>
          </SearchBox>
        </Box>
        <Box>
          <SLink to={routes.addShop}>Add Shop</SLink>
          <ProfileLink to={routes.myProfile}>
            <Avatar url={me?.avatarURL} sizes={"25px"} />
          </ProfileLink>
          <DarkModeBtn />
        </Box>
      </Wrapper>
    </SHeader>
  );
};

export default Header;
