import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.ul`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageBox = styled.li<PageBoxProps>`
  color: ${(props) => props.current && props.theme.accent};
  background-color: ${(props) => props.current && props.theme.hoverColor};
  & + & {
    margin-left: 10px;
  }
  &:hover {
    color: ${(props) => props.theme.accent};
    background-color: ${(props) => props.theme.hoverColor};
  }
  border-radius: 999px;
  transition: all 0.2s ease;
`;

const PageNumer = styled(Link)`
  display: block;
  padding: 5px 10px;
  cursor: pointer;
`;

interface PageBoxProps {
  current: boolean;
}

interface PaginationProps {
  url: string;
  totalPage: number;
  currentPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  url,
  totalPage,
  currentPage = 1,
}) => {
  const pageArray: number[] = [];
  let startPage = 1;
  let lastPage = 5;
  if (totalPage < 5) {
    lastPage = totalPage;
  } else if (currentPage + 2 > totalPage) {
    lastPage = totalPage;
    startPage = totalPage - 4;
  } else if (currentPage + 2 > 5) {
    lastPage = currentPage + 2;
    startPage = currentPage - 2;
  }
  for (let i = startPage; i <= lastPage; i++) {
    pageArray.push(i);
  }
  return (
    <Container>
      {pageArray.map((page) => (
        <PageBox current={page === currentPage} key={`page_${page}`}>
          <PageNumer to={`${url}?page=${page}`}>{page}</PageNumer>
        </PageBox>
      ))}
    </Container>
  );
};

export default Pagination;
