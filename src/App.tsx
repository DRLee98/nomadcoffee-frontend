import { ApolloProvider, useReactiveVar } from "@apollo/client";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import NotFound from "./screens/NotFound";
import { isLoggedInVar, darkModeVar, client } from "./apollo";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import routes from "./routes";
import Layout from "./components/Layout";
import AddShop from "./screens/AddShop";
import ShopDetail from "./screens/ShopDetail";
import EditShop from "./screens/EditShop";
import MyProfile from "./screens/MyProfile";
import Profile from "./screens/Profile";
import Category from "./screens/Category";
import Search from "./screens/Search";
import EditProfile from "./screens/EditProfile";
import Follow from "./screens/Follow";

const loggedInRouter = [
  { path: routes.home, screen: <Home /> },
  { path: routes.myProfile, screen: <MyProfile /> },
  { path: routes.editProfile, screen: <EditProfile /> },
  { path: routes.profile(), screen: <Profile /> },
  { path: routes.followUser(), screen: <Follow /> },
  { path: routes.addShop, screen: <AddShop /> },
  { path: routes.shopDetail(), screen: <ShopDetail /> },
  { path: routes.editShop(), screen: <EditShop /> },
  { path: routes.category(), screen: <Category /> },
  { path: routes.search(), screen: <Search /> },
];

const loggedOutRouter = [
  { path: routes.home, screen: <Login /> },
  { path: routes.signUp, screen: <SignUp /> },
];

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              {isLoggedIn
                ? loggedInRouter.map((route) => (
                    <Route key={route.path} path={route.path} exact>
                      <Layout>{route.screen}</Layout>
                    </Route>
                  ))
                : loggedOutRouter.map((route) => (
                    <Route key={route.path} path={route.path} exact>
                      {route.screen}
                    </Route>
                  ))}
              {isLoggedIn ? (
                <Route>
                  <Layout>
                    <NotFound />
                  </Layout>
                </Route>
              ) : (
                <Redirect to={routes.home} />
              )}
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
