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

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route exact path="/">
            <Announcements />
          </Route>
          <Route exact path="/annonces/nouveau">
            <NewAnnouncement />
          </Route>
          <Route path="/annonces/:annonceId">
            <UpdateAnnouncement />
          </Route>
          {/* <Route exact path="/:userId/annonces">
            <UserAnnouncements />
          </Route> */}
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
