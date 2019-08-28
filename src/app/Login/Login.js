import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { auth } from "../../api/index";

import "./Login.scss";

const Login = props => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        let response;
        try {
            response = await auth.login(credentials);
        } catch (err) {
            if (err) {
                alert("Error");
                return;
            }
        }
        setLoading(false);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        console.log(credentials.email);
        //props.history.push(`/profile/${credentials.email}`);
        props.history.push("/profile");
    };

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    return (
        <div className={`login ${loading ? "loading" : null}`}>
            <div className="login_widget-wrap">
                <form onSubmit={onSubmit} className="login_widget">
                    <div className="title">
                        OneUpDev
                    </div>

                    <div className="label">Email</div>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="input_default"
                        value={credentials.email}
                        onChange={handleChange}
                    />
                    <div className="label">Password</div>
                    <input
                        type="password"
                        placeholder="Password"
                        className="input_default"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="button-secondary login_button"
                        disabled={loading}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default withRouter(Login);
