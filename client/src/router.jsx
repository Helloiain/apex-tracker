import React from "react";
import { Switch, Route } from "react-router-dom";

import Search from "./components/Search";
import Profile from "./components/Profile";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Search} />
      <Route path="/profile/:platform/:gamertag" component={Profile} />
    </Switch>
  );
};

export default Router;
