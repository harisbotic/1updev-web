import React from "react";
import { Switch, Route } from "react-router-dom";
import Ranking from "../../app/Ranking/Ranking";
import Profile from "../../app/Profile/Profile";

function Routes() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Profile} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/ranking" component={Ranking}/>
                <Route exact path="/shop"/>
            </Switch>

        </div>
    );
}

export default Routes;
