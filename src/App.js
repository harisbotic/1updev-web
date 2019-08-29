import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PublicRoute from "./Shared/Routes/PublicRoute";
import PrivateRoute from "./Shared/Routes/PrivateRoute";
//components
import Login from "./app/Login/Login";
import Routes from "./Shared/Routes/Routes";

import "./App.scss";

function App() {
    return (
        <div className="App">
             <Router>
                <Switch>
                  <PublicRoute exact path="/login" component={Login} />
                  <PrivateRoute path="" component={Routes} />
                </Switch>
           </Router>
        </div>
    );
}

export default App;
