import styled from "styled-components";
import GoLink from "../components/GoLink";
import routes from "../routes";

const Container = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & div {
    margin-top: 20px;
    position: unset;
  }
`;

const Text = styled.span``;

function NotFound() {
  return (
    <Container>
      <Text>Not Found</Text>
      <GoLink text={"Go Home"} path={routes.home} />
    </Container>
  );
}
export default NotFound;
