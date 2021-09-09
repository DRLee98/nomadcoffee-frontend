import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar, logout } from "../apollo";
import FollowButton from "../components/FollowButton";
import { Loading } from "../components/Loading";
import PageTitle from "../components/PageTitle";
import { Btn, Image } from "../components/shared";
import routes from "../routes";
import { seeProfileQuery } from "../__generated__/seeProfileQuery";

const SEE_PROFILE_QUERY = gql`
  query seeProfileQuery($id: Int) {
    seeProfile(id: $id) {
      id
      username
      email
      name
      avatarURL
      totalFollowing
      totalFollowers
      isFollowing
    }
  }
`;

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserInfoBox = styled.div`
  margin: 10px 0;
  align-items: center;
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

const Username = styled.span`
  font-weight: bold;
  font-size: 25;
  color: ${(props) => props.theme.accent};
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 18;
  color: ${(props) => props.theme.grayColor};
`;

const Email = styled.span`
  color: ${(props) => props.theme.grayColor};
  margin-bottom: 10px;
`;

const FollowContainer = styled(Link)`
  display: flex;
  max-width: 250px;
  padding: 8px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border: 1px solid ${(props) => props.theme.accent};
  border-radius: 5px;
  cursor: pointer;
`;

const FollowText = styled.span`
  text-align: center;
  font-weight: bold;
`;

const FollowValue = styled.span`
  text-align: center;
`;

const FollowContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 10px;
  &:first-child {
    border-right: 1px solid ${(props) => props.theme.accent};
  }
  color: ${(props) => props.theme.fontColor};
`;

const ButtonBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
`;

const EditBtn = styled(Btn)`
  background-color: ${(props) => props.theme.greenBtnColor};
`;

const LogOutBtn = styled(Btn)`
  background-color: ${(props) => props.theme.redBtnColor};
`;

interface ProfileParams {
  id: string;
}

const Profile = () => {
  const { id } = useParams<ProfileParams>();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data, loading } = useQuery<seeProfileQuery>(SEE_PROFILE_QUERY, {
    variables: {
      id: +id,
    },
  });

  return loading ? (
    <Loading />
  ) : (
    <UserProfileContainer>
      <PageTitle title={data?.seeProfile?.username || "Profile"} />
      <Image sizes={"120px"} src={data?.seeProfile?.avatarURL || ""} />
      <UserInfoBox>
        <Username>{data?.seeProfile?.username}</Username>
        <Name>{data?.seeProfile?.name}</Name>
        <Email>{data?.seeProfile?.email}</Email>
        {isLoggedIn && (
          <FollowButton id={+id} isFollowing={data?.seeProfile?.isFollowing} />
        )}
      </UserInfoBox>
      <FollowContainer to={routes.followUser(id)}>
        <FollowContentsBox>
          <FollowText>Followers</FollowText>
          <FollowValue>{data?.seeProfile?.totalFollowers}</FollowValue>
        </FollowContentsBox>
        <FollowContentsBox>
          <FollowText>Following</FollowText>
          <FollowValue>{data?.seeProfile?.totalFollowing}</FollowValue>
        </FollowContentsBox>
      </FollowContainer>
    </UserProfileContainer>
  );
};

export default Profile;
