import React from "react";
import { Switch, Route } from "react-router-dom";

import Profile from "../../app/Profile/Profile";

function Routes() {
    return (
    <div>
        <Switch>
            <Route exact path="/" component={Profile} />
            <Route exact path="/profile" component={Profile} />
        </Switch>
    </div>

    );
}

export default Routes;