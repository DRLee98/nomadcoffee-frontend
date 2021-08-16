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

const loggedInRouter = [{ path: routes.home, screen: <Home /> }];

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
                      {route.screen}
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
