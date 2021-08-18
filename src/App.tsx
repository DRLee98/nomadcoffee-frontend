import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

const loggedInRouter = [
  { path: routes.home, screen: <Home /> },
  { path: routes.addShop, screen: <AddShop /> },
  { path: routes.shopDetail(), screen: <ShopDetail /> },
  { path: routes.editShop(), screen: <EditShop /> },
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
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
