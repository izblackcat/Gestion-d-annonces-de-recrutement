import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Announcements from "./announcement/pages/Announcements";
import NewAnnouncement from "./announcement/pages/NewAnnouncement";
import MainNavigation from "./shared/components/Naviguation/MainNavigation";
import UserAnnouncements from "./announcement/pages/UserAnnouncements";
import UpdateAnnouncement from "./announcement/pages/UpdateAnnouncement";
import UserApplications from "./user/components/UserApplications";
import SignUp from "./user/pages/SignUp";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
<<<<<<< HEAD
import Apply from "./announcement/pages/Apply";
=======
import { useAuth } from './shared/hooks/auth-hook';
>>>>>>> 65ea06fa8a0c41f5696e1f83d7c7213af9e91472

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Announcements />
        </Route>
        <Route path="/annonces/nouvel" exact>
          <NewAnnouncement />
        </Route>
        <Route path="/annonces/postuler" exact>
          <Apply />
        </Route>
        <Route path="/annonces/:annonceId">
          <UpdateAnnouncement />
        </Route>
        <Route path="/:userId/annonces" exact>
          <UserAnnouncements />
        </Route>
        <Route path="/:userId/postulations" exact>
          <UserApplications />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Announcements />
        </Route>
        <Route path="/auth/se-connecter" exact>
          <Auth />
        </Route>
        <Route path="/auth/creer-compte" exact>
          <SignUp />
        </Route>
        <Redirect to="/auth/se-connecter" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
    value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      login: login,
      logout: logout
    }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
