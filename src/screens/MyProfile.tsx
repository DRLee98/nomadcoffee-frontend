import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../apollo";
import Avatar from "../components/Avatar";
import { Loading } from "../components/Loading";
import PageTitle from "../components/PageTitle";
import { Btn, Image } from "../components/shared";
import routes from "../routes";
import { meQuery } from "../__generated__/meQuery";

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      username
      email
      name
      location
      avatarURL
      totalFollowing
      totalFollowers
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

const MyProfile = () => {
  const history = useHistory();
  const { data, loading } = useQuery<meQuery>(ME_QUERY);

  const editProfile = () => {
    history.push(routes.editProfile, {
      id: data?.me?.id,
      username: data?.me?.username,
      email: data?.me?.email,
      name: data?.me?.name,
      location: data?.me?.location,
      avatarURL: data?.me?.avatarURL,
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <UserProfileContainer>
      <PageTitle title={data?.me?.username || "Profile"} />
      <Avatar sizes={"120px"} url={data?.me?.avatarURL} />
      <UserInfoBox>
        <Username>{data?.me?.username}</Username>
        <Name>{data?.me?.name}</Name>
        <Email>{data?.me?.email}</Email>
        <ButtonBox>
          <EditBtn onClick={editProfile}>Edit Profile</EditBtn>
          <LogOutBtn onClick={logout}>Log Out</LogOutBtn>
        </ButtonBox>
      </UserInfoBox>
      <FollowContainer to={routes.followUser(data?.me?.id)}>
        <FollowContentsBox>
          <FollowText>Followers</FollowText>
          <FollowValue>{data?.me?.totalFollowers}</FollowValue>
        </FollowContentsBox>
        <FollowContentsBox>
          <FollowText>Following</FollowText>
          <FollowValue>{data?.me?.totalFollowing}</FollowValue>
        </FollowContentsBox>
      </FollowContainer>
    </UserProfileContainer>
  );
};

export default MyProfile;
