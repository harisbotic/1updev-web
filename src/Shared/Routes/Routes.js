import React from "react";
import { Switch, Route } from "react-router-dom";
import Ranking from "../../app/Ranking/Ranking";
import Profile from "../../app/Profile/Profile";
import Shop from "../../app/Shop/Shop";

function Routes() {
  return (
    <div>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Profile} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/ranking" component={Ranking}/>
          <Route exact path="/shop" component={Shop} />
        </Switch>
      </div>
    </div>
  );
}

export default Routes;
