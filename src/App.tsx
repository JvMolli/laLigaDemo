import React from "react";
import "./App.scss";
import { Login } from "./components/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";
import { useMe, UserProvider } from "./components/common/context/userMag";
import { UsersListContainer } from "./pages/UsersContainer";
import { UserContainer } from "./pages/UserContainer";

type NavigationProps = {};

const App: React.FC<NavigationProps> = () => {
  const { me } = useMe();
  return (
    <Router basename={process.env.REACT_APP_BASENAME}>
      <Switch>
        <Route path="/login" component={Login} exact />
        <PrivateRoute
          path="/userList"
          component={UsersListContainer}
          auth={!!me}
        />
        <PrivateRoute
          path="/userContainer/:id"
          component={UserContainer}
          auth={!!me}
        />
        <Redirect from="/" to="/login" exact />
      </Switch>
    </Router>
  );
};

export default () => (
  <UserProvider>
    <App />
  </UserProvider>
);
