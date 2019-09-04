import React from "react";
import { Switch, Route } from "react-router-dom";

import Profile from "../../app/Profile/Profile";
import Shop from "../../app/Shop/Shop";

function Routes() {
  return (
    <div>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Profile} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/shop" component={Shop} />
        </Switch>
      </div>
    </div>
  );
}

export default Routes;
