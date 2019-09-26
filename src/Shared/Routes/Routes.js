import React from "react";
import { Switch, Route } from "react-router-dom";
import Ranking from "../../app/Ranking/Ranking";
import Profile from "../../app/Profile/Profile";
import Shop from "../../app/Shop/Shop";
import EditProfile from "../../app/EditProfile/EditProfile";
import Page404 from "../../app/Page404/Page404";

function Routes() {
  return (
    <div>
      <div>
        <Switch>
          <Route exact path="/" component={Profile} />
          {/* <Route exact path="/ranking" component={Ranking} /> */}
          <Route exact path="/ranking/:identifier" component={Ranking} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/profile/:identifier" component={Profile} />
          <Route exact path="/editprofile/" component={EditProfile} />
          <Route exact path="/404" component={Page404} />
        </Switch>
      </div>
    </div>
  );
}

export default Routes;
