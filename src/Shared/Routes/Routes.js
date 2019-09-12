import React from "react";
import { Switch, Route } from "react-router-dom";

import Profile from "../../app/Profile/Profile";
import EditProfile from "../../app/Profile/EditProfile";

function Routes() {
    return (
        <div>
            <div>
                <Switch>
                    <Route exact path="/" component={Profile} />
                    <Route exact path="/profile/:identifier" component={Profile} />
                    <Route exact path="/editprofile/:identifier" component={EditProfile} />

                </Switch>
            </div>
        </div>
    );
}

export default Routes;
