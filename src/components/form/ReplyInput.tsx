import { ApolloCache, FetchResult, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "./formShared";
import {
  createReplyMutation,
  createReplyMutationVariables,
} from "../../__generated__/createReplyMutation";
import { SEE_REPLIES_QUERY } from "../Comment";
import { seeRepliesQuery } from "../../__generated__/seeRepliesQuery";
import { Image } from "../shared";
import useMe from "../../hook/useMe";
import Avatar from "../Avatar";

const CREATE_REPLY_MUTATION = gql`
  mutation createReplyMutation($commentId: Int!, $payload: String!) {
    createReply(commentId: $commentId, payload: $payload) {
      id
      ok
      error
    }
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const SReplyInput = styled(Input)`
  color: ${(props) => props.theme.fontColor};
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.accent};
  border-radius: 0;
  padding: 5px;
  margin-left: 5px;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  min-width: 80px;
  background-color: ${(props) => props.theme.accent};
  cursor: pointer;
`;

const ButtonText = styled.span`
  font-weight: bold;
  color: white;
`;

interface ReplyInputProps {
  commentId: number;
}

const ReplyInput: React.FC<ReplyInputProps> = ({ commentId }) => {
  const { data: meData } = useMe();
  const [payload, setPayload] = useState<string>();
  const [createReplyMutation, { data, loading }] = useMutation<
    createReplyMutation,
    createReplyMutationVariables
  >(CREATE_REPLY_MUTATION);

  const updatecreateReply = (
    cache: ApolloCache<createReplyMutation>,
    result: FetchResult<createReplyMutation>
  ) => {
    const resultData = result.data?.createReply;
    if (meData) {
      if (!resultData?.ok && resultData?.error) {
        console.log(resultData.error);
      } else {
        const newReply = {
          __typename: "Reply",
          id: resultData?.id,
          payload,
          createdAt: new Date(),
          user: {
            ...meData.me,
          },
        };
        setPayload("");
        cache.modify({
          id: `Comment:${commentId}`,
          fields: {
            totalReply(prev) {
              return prev + 1;
            },
          },
        });
        const readData: seeRepliesQuery | null = cache.readQuery({
          query: SEE_REPLIES_QUERY,
          variables: {
            commentId,
          },
        });
        cache.writeQuery({
          query: SEE_REPLIES_QUERY,
          data: {
            seeReplies: [newReply, ...(readData?.seeReplies || [])],
          },
          variables: {
            commentId,
          },
        });
      }
    }
  };

  const createReply = () => {
    if (!loading && payload) {
      createReplyMutation({
        variables: {
          payload,
          commentId,
        },
        update: updatecreateReply,
      });
    }
  };

  return (
    <Container>
      <Avatar url={meData?.me?.avatarURL} sizes={"30px"} />
      <SReplyInput
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        placeholder="답글을 입력해주세요"
      />
      <ButtonBox onClick={createReply}>
        <ButtonText>{loading ? "작성중..." : "작성하기"}</ButtonText>
      </ButtonBox>
    </Container>
  );
};

export default ReplyInput;
