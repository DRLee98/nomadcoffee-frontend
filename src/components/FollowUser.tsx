import { useReactiveVar } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import routes from "../routes";
import { FollowUserFragment } from "../__generated__/FollowUserFragment";
import FollowButton from "./FollowButton";
import { Image } from "./shared";

const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  background-color: ${(props) => props.theme.bgColor};
  & + & {
    border-top: 1px solid ${(props) => props.theme.grayColor};
  }
`;

const SLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Box = styled.div``;

const Username = styled.span`
  font-weight: bold;
  display: block;
  color: ${(props) => props.theme.fontColor};
`;

const Name = styled.span`
  color: ${(props) => props.theme.grayColor};
`;

interface FollowUserProps extends FollowUserFragment {
  refetch: Function;
}

const FollowUser: React.FC<FollowUserProps> = ({
  id,
  username,
  name,
  avatarURL,
  isMe,
  isFollowing,
  refetch,
}) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <Container>
      <SLink to={isMe ? routes.myProfile : routes.profile(id)}>
        <Image sizes={"40px"} src={avatarURL || ""} />
        <Box style={{ marginLeft: 10 }}>
          <Username>{username}</Username>
          <Name>{name}</Name>
        </Box>
      </SLink>
      {isLoggedIn && !isMe && (
        <Box style={{ width: "20%" }} onClick={() => refetch()}>
          <FollowButton id={id} isFollowing={isFollowing} />
        </Box>
      )}
    </Container>
  );
};

export default FollowUser;
