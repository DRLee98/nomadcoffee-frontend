import styled from "styled-components";
import { siteName } from "../../constants";
import DarkModeBtn from "../DarkMode";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Wrapper = styled.div`
  min-width: 450px;
  position: relative;
  border-radius: 12px;
  padding: 20px;
  //border: 1px solid rgb(226 226 226 / 50%);
  background-color: ${(props) => props.theme.wrapperBg};
  box-shadow: 0 2px 2px 1px rgb(64 60 67 / 16%);
`;

const BottomBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -65px;
  left: 0;
  right: 0;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: bolder;
  font-size: 40px;
  color: ${(props) => props.theme.accent};
  margin-bottom: 1em;
`;

interface IAuthLayoutProp {
  children: React.ReactNode;
}

const AuthLayout: React.FC<IAuthLayoutProp> = ({ children }) => {
  return (
    <Container>
      <Wrapper>
        <Title>{siteName}</Title>
        {children}
        <BottomBox>
          <DarkModeBtn />
        </BottomBox>
      </Wrapper>
    </Container>
  );
};

export default AuthLayout;
