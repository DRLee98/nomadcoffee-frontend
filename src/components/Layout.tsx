import styled from "styled-components";
import Header from "./Header";

const Container = styled.div`
  height: 100vh;
`;

const Content = styled.main`
  margin: 0 auto;
  margin-top: 20px;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
`;

interface ILayoutProp {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProp> = ({ children }) => {
  return (
    <Container>
      <Header />
      <Content>{children}</Content>
    </Container>
  );
};

export default Layout;
