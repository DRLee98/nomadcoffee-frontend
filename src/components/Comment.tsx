import { useLazyQuery, useReactiveVar } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import routes from "../routes";
import { seeCoffeeShopQuery_seeCoffeeShop_comments } from "../__generated__/seeCoffeeShopQuery";
import {
  seeRepliesQuery,
  seeRepliesQueryVariables,
} from "../__generated__/seeRepliesQuery";
import Avatar from "./Avatar";
import ReplyInput from "./form/ReplyInput";
import Reply from "./Reply";
// import ReplyInput from "./form/ReplyInput";
// import Loading from "./Loading";
// import Reply from "./Reply";

export const SEE_REPLIES_QUERY = gql`
  query seeRepliesQuery($commentId: Int!) {
    seeReplies(commentId: $commentId) {
      id
      payload
      createdAt
      user {
        id
        username
        avatarURL
        isMe
      }
    }
  }
`;

const Container = styled.li`
  padding: 5px;
  position: relative;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ContentsBox = styled.div`
  display: flex;
  align-items: center;
`;

const PayloadBox = styled.div`
  margin-left: 5px;
`;

const Box = styled.div``;

const SLink = styled(Link)`
  cursor: pointer;
`;

const UserName = styled.span`
  color: ${(props) => props.theme.fontColor};
  font-weight: bold;
  font-size: 14px;
`;

const CreatedAt = styled.span`
  color: ${(props) => props.theme.grayColor};
  font-size: 12px;
  margin-left: 3px;
`;

const Payload = styled.span`
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
`;

const ReplyBtnBox = styled.div`
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
  padding: 10px 5px;
  transition: background-color 0.2s ease;
  cursor: pointer;
`;

const ReplyBtnText = styled.span`
  font-weight: bold;
  color: ${(props) => props.theme.accent};
`;

const ReplyContainer = styled.ul`
  padding: 10px;
`;

const Comment: React.FC<seeCoffeeShopQuery_seeCoffeeShop_comments> = ({
  id,
  payload,
  totalReply,
  createdAt,
  user,
}) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const [seeRepliesQuery, { data, loading, called }] = useLazyQuery<
    seeRepliesQuery,
    seeRepliesQueryVariables
  >(SEE_REPLIES_QUERY);

  const [openReply, setOpenReply] = useState<boolean>(false);

  const toggleOpenReply = () => {
    setOpenReply((prev) => !prev);
    if (!data?.seeReplies) {
      seeRepliesQuery({ variables: { commentId: id } });
    }
  };

  return (
    <Container>
      {/* {loading && <Loading />} */}
      <CommentBox>
        <ContentsBox>
          <SLink to={user.isMe ? routes.myProfile : routes.profile(user.id)}>
            <Avatar url={user.avatarURL} sizes={"40px"} />
          </SLink>
          <PayloadBox>
            <Box style={{ marginBottom: 3 }}>
              <UserName>{user.username}</UserName>
              <CreatedAt>{new Date(+createdAt).toLocaleDateString()}</CreatedAt>
            </Box>
            <Payload>{payload}</Payload>
          </PayloadBox>
        </ContentsBox>
        <Box>
          <Box>
            {totalReply > 0 && (
              <ReplyBtnBox onClick={toggleOpenReply}>
                <ReplyBtnText>
                  {openReply
                    ? `답글 ${totalReply}개 숨기기`
                    : `답글 ${totalReply}개 보기`}
                </ReplyBtnText>
              </ReplyBtnBox>
            )}
            {totalReply === 0 && isLoggedIn && (
              <ReplyBtnBox onClick={toggleOpenReply}>
                <ReplyBtnText>답글 작성하기</ReplyBtnText>
              </ReplyBtnBox>
            )}
          </Box>
        </Box>
      </CommentBox>
      {openReply && (
        <ReplyContainer>
          {isLoggedIn && <ReplyInput commentId={id} />}
          {data?.seeReplies?.map((reply) => (
            <Reply {...reply} key={`reply_${reply.id}`} />
          ))}
        </ReplyContainer>
      )}
    </Container>
  );
};

export default Comment;
