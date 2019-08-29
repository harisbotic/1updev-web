import React from "react";
import { Switch, Route } from "react-router-dom";
import Ranking from "../../app/Ranking/Ranking";
import Profile from "../../app/Profile/Profile";
import Header from "../../app/Header/Header";

function Routes() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Profile} />
                <Route exact path="/profile" component={Profile} />
                <Route path="/header" component={Header} />
                <Route exact path="/ranking"/>
                <Route exact path="/shop"/>
            </Switch>

        </div>
    );
}

export default Routes;
