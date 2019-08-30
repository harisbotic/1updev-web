import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !localStorage.getItem("token") ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/profile",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PublicRoute;