import { gql, ApolloCache, FetchResult, useMutation } from "@apollo/client";
import React from "react";
import useMe from "../hook/useMe";
import { followUserMutation } from "../__generated__/followUserMutation";
import { unfollowUserMutation } from "../__generated__/unfollowUserMutation";
import Button from "./form/Button";

const FOLLOW_USER_MUTATION = gql`
  mutation followUserMutation($id: Int!) {
    followUser(id: $id) {
      ok
      error
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUserMutation($id: Int!) {
    unfollowUser(id: $id) {
      ok
      error
    }
  }
`;

interface FollowButtonProps {
  id: number;
  isFollowing?: boolean;
}

const FollowButton: React.FC<FollowButtonProps> = ({ id, isFollowing }) => {
  const { data: meData } = useMe();
  const [followUserMutation, { data: followData, loading: followLoading }] =
    useMutation<followUserMutation>(FOLLOW_USER_MUTATION);
  const [
    unfollowUserMutation,
    { data: unfollowData, loading: unfollowLoading },
  ] = useMutation<unfollowUserMutation>(UNFOLLOW_USER_MUTATION);

  const updateFollowUser = (
    cache: ApolloCache<followUserMutation>,
    result: FetchResult<followUserMutation>,
  ) => {
    const resultData = result.data?.followUser;
    if (!resultData?.ok && resultData?.error) {
      console.log(resultData.error);
    }
    cache.modify({
      id: `User:${id}`,
      fields: {
        isFollowing() {
          return true;
        },
        totalFollowers(prev) {
          return prev + 1;
        },
      },
    });
    cache.modify({
      id: `User:${meData?.me?.id}`,
      fields: {
        totalFollowing(prev) {
          return prev + 1;
        },
      },
    });
  };

  const updateUnfollowUser = (
    cache: ApolloCache<unfollowUserMutation>,
    result: FetchResult<unfollowUserMutation>,
  ) => {
    const resultData = result.data?.unfollowUser;
    if (!resultData?.ok && resultData?.error) {
      console.log(resultData.error);
    } else {
      cache.modify({
        id: `User:${id}`,
        fields: {
          isFollowing() {
            return false;
          },
          totalFollowers(prev) {
            return prev - 1;
          },
        },
      });
      cache.modify({
        id: `User:${meData?.me?.id}`,
        fields: {
          totalFollowing(prev) {
            return prev - 1;
          },
        },
      });
    }
  };

  const follow = () => {
    followUserMutation({
      variables: {
        id,
      },
      update: updateFollowUser,
    });
  };

  const unfollow = () => {
    unfollowUserMutation({
      variables: {
        id,
      },
      update: updateUnfollowUser,
    });
  };

  return isFollowing ? (
    <Button basicBgColor={true} onClick={unfollow} text={"팔로잉"} />
  ) : (
    <Button onClick={follow} text={"팔로우"} />
  );
};

export default FollowButton;
