import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Link, useParams, useLocation } from "react-router-dom";
import { Loading } from "../components/Loading";
import { seeFollowingQuery } from "../__generated__/seeFollowingQuery";
import { seeFollowersQuery } from "../__generated__/seeFollowersQuery";
import FollowUser from "../components/FollowUser";
import { useState } from "react";
import Pagination from "../components/Pagination";
import routes from "../routes";

export const FOLLOW_USER_FRAGMENT = gql`
  fragment FollowUserFragment on User {
    id
    username
    name
    avatarURL
    isMe
    isFollowing
  }
`;

const SEE_FOLLOWERS_QUERY = gql`
  query seeFollowersQuery($id: Int!, $page: Int) {
    seeFollowers(id: $id, page: $page) {
      ok
      error
      totalPage
      followers {
        ...FollowUserFragment
      }
    }
  }
  ${FOLLOW_USER_FRAGMENT}
`;

export const SEE_FOLLOWING_QUERY = gql`
  query seeFollowingQuery($id: Int!, $page: Int) {
    seeFollowing(id: $id, page: $page) {
      ok
      error
      totalPage
      following {
        ...FollowUserFragment
      }
    }
  }
  ${FOLLOW_USER_FRAGMENT}
`;

const Container = styled.div``;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const SelectButton = styled.button<SelectButtonProps>`
  text-align: center;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
  ${(props) =>
    props.selected && `border-bottom: 2px solid ${props.theme.accent}`};
  transition: background-color 0.2s ease;
`;

const FollowUserList = styled.ul`
  margin-top: 30px;
`;

interface SelectButtonProps {
  selected: boolean;
}

interface FollowParams {
  id: string;
}

const Follow = () => {
  const { id } = useParams<FollowParams>();
  const location = useLocation();
  const [select, setSelect] = useState<"followers" | "following">("followers");

  const [_, page] = location.search.split("page=");

  const { data: followersData, loading: followersLoading } =
    useQuery<seeFollowersQuery>(SEE_FOLLOWERS_QUERY, {
      variables: {
        id: +id,
        page: +page,
      },
    });

  const {
    data: followingData,
    loading: followingLoading,
    refetch,
  } = useQuery<seeFollowingQuery>(SEE_FOLLOWING_QUERY, {
    variables: {
      id: +id,
      page: +page,
    },
  });

  const listData =
    select === "followers"
      ? followersData?.seeFollowers.followers
      : followingData?.seeFollowing.following;
  const totalPage =
    select === "followers"
      ? followersData?.seeFollowers.totalPage
      : followingData?.seeFollowing.totalPage;

  const queryRefetch = async () => {
    await refetch();
  };

  return followersLoading || followingLoading ? (
    <Loading />
  ) : (
    <Container>
      <GridBox>
        <SelectButton
          selected={select === "followers"}
          onClick={() => setSelect("followers")}
        >
          Followers
        </SelectButton>
        <SelectButton
          selected={select === "following"}
          onClick={() => setSelect("following")}
        >
          Following
        </SelectButton>
      </GridBox>
      <FollowUserList>
        {listData?.map((user) => (
          <FollowUser key={user.id} {...user} refetch={queryRefetch} />
        ))}
      </FollowUserList>
      {totalPage && (
        <Pagination
          url={routes.followUser(id)}
          totalPage={totalPage}
          currentPage={isNaN(+page) ? 1 : +page}
        />
      )}
    </Container>
  );
};

export default Follow;
