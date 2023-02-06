import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "token";
const DARK_MODE = "dark_mode";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const login = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logout = () => {
  localStorage.removeItem(TOKEN);
  window.location.reload();
};

export const toggleDarkMode = () => {
  if (Boolean(localStorage.getItem(DARK_MODE))) {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false);
  } else {
    localStorage.setItem(DARK_MODE, "enabled");
    darkModeVar(true);
  }
};

const httpLink = createUploadLink({
  uri: "https://nomadcoffee-backend.up.railway.app/graphql",
  // uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN);
  return {
    headers: {
      ...headers,
      ...(token && { token }),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
