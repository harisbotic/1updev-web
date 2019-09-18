import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import Header from "../../Components/Header/Header";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            localStorage.getItem('access_token') ? (
                <>
                <Header/>
                <Component {...props} />
                </>
            ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />
                )
        }
    />
)

export default PrivateRoute;