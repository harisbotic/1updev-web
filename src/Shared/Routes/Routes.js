import React from "react";
import { Switch, Route } from "react-router-dom";

import Profile from "../../app/Shop/Shop";

function Routes() {
    return (
        <div>
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Profile} />
                    <Route exact path="/profile" component={Profile} />
                </Switch>
            </div>
        </div>
    );
}

export default Routes;
