import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../routes";
import { seeCoffeeShopQuery_seeCoffeeShop_comments } from "../__generated__/seeCoffeeShopQuery";
import { seeRepliesQuery_seeReplies } from "../__generated__/seeRepliesQuery";
import Avatar from "./Avatar";
import { Image } from "./shared";

const Container = styled.li`
  padding: 5px;
  margin-left: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Box = styled.div``;

const SLink = styled(Link)`
  cursor: pointer;
`;

const UserName = styled.span`
  color: ${(props) => props.theme.fontColor};
  font-weight: bold;
  font-size: 12px;
`;

const CreatedAt = styled.span`
  color: ${(props) => props.theme.grayColor};
  font-size: 8px;
  margin-left: 3px;
`;

const Payload = styled.span`
  color: ${(props) => props.theme.fontColor};
  font-size: 14px;
`;

const Reply: React.FC<seeRepliesQuery_seeReplies> = ({
  id,
  payload,
  createdAt,
  user,
}) => {
  return (
    <Container>
      <SLink to={user.isMe ? routes.myProfile : routes.profile(user.id)}>
        <Avatar url={user.avatarURL} sizes={"30px"} />
      </SLink>
      <Box style={{ marginLeft: 5 }}>
        <Box style={{ marginBottom: 2 }}>
          <UserName>{user.username}</UserName>
          <CreatedAt>{new Date(+createdAt).toLocaleDateString()}</CreatedAt>
        </Box>
        <Payload>{payload}</Payload>
      </Box>
    </Container>
  );
};

export default Reply;
