import React from 'react';
import { withRouter } from "react-router-dom";
import jwtdecode from 'jwt-decode';
import Logo from "../../Assets/logo.png";

import "./Page404.style.scss";

function Page404(props) {
    const handleClick = () => {
        const currentUser = jwtdecode(localStorage.getItem("access_token")).Username;
        props.history.push(`/profile/${currentUser}`);
    }

    return (
        <div className="page404">
            <div className="wrapper404">
                <div className="header404">
                    <p>Page Not Found</p>
                </div>
                <div className="body404">
                    <hr />
                    <p>The requested page does not exist!</p>
                    <p>Please go to your 1UpDev Profile Page by clicking/tapping the button below.</p>
                </div>
                <hr />

                <div className="footer404">
                    <div className="profileButton" onClick={handleClick}>Profile Page</div>
                </div>

            </div>
        </div>
    )
};

export default withRouter(Page404);