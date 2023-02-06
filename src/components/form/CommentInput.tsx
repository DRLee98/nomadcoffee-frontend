import { ApolloCache, FetchResult, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "./formShared";
import useMe from "../../hook/useMe";
import {
  createCommentMutation,
  createCommentMutationVariables,
} from "../../__generated__/createCommentMutation";
import { Image } from "../shared";
import Avatar from "../Avatar";

const CREATE_COMMENT_MUTATION = gql`
  mutation createCommentMutation($shopId: Int!, $payload: String!) {
    createComment(shopId: $shopId, payload: $payload) {
      id
      ok
      error
    }
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
`;

const SCommentInput = styled(Input)`
  color: ${(props) => props.theme.fontColor};
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.accent};
  border-radius: 0;
  margin-left: 5px;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  background-color: ${(props) => props.theme.accent};
  cursor: pointer;
`;

const ButtonText = styled.span`
  font-weight: bold;
  color: white;
`;

interface CommentInputProps {
  shopId: number;
}

const CommentInput: React.FC<CommentInputProps> = ({ shopId }) => {
  const { data: meData } = useMe();
  const [payload, setPayload] = useState<string>();
  const [createCommentMutation, { data, loading }] = useMutation<
    createCommentMutation,
    createCommentMutationVariables
  >(CREATE_COMMENT_MUTATION);

  const updateCreateComment = (
    cache: ApolloCache<createCommentMutation>,
    result: FetchResult<createCommentMutation>
  ) => {
    const resultData = result.data?.createComment;
    if (meData) {
      if (!resultData?.ok && resultData?.error) {
        console.log(resultData.error);
      } else {
        const newComment = {
          __typename: "Comment",
          id: resultData?.id,
          payload,
          totalReply: 0,
          createdAt: new Date(),
          user: {
            ...meData.me,
          },
        };
        setPayload("");
        const newCacheComment = cache.writeFragment({
          data: newComment,
          fragment: gql`
            fragment CommentFrag on Comment {
              id
              payload
              totalReply
              createdAt
              user {
                id
                username
                avatarURL
              }
            }
          `,
        });
        cache.modify({
          id: `CoffeeShop:${shopId}`,
          fields: {
            totalComments(prev) {
              return prev + 1;
            },
            comments(prev) {
              return [newCacheComment, ...prev];
            },
          },
        });
      }
    }
  };

  const createComment = () => {
    if (!loading && payload) {
      createCommentMutation({
        variables: {
          payload,
          shopId,
        },
        update: updateCreateComment,
      });
    }
  };

  return (
    <Container>
      <Avatar url={meData?.me?.avatarURL} sizes={"40px"} />
      <SCommentInput
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        placeholder="댓글을 입력해주세요"
      />
      <ButtonBox onClick={createComment}>
        <ButtonText>{loading ? "작성중..." : "작성하기"}</ButtonText>
      </ButtonBox>
    </Container>
  );
};

export default CommentInput;
