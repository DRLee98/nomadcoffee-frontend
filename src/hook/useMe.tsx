import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logout } from "../apollo";
import { me } from "../__generated__/me";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatarURL
    }
  }
`;

function useMe() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<me>(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me === null) {
      logout();
    }
  }, [data]);
  return { data };
}
export default useMe;
