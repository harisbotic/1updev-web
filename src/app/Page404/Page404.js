import React from 'react';
import { withRouter } from "react-router-dom";
import jwtdecode from 'jwt-decode';

import "./Page404.style.scss";

function Page404(props) {
    const handleClick = () => {
        const currentUser = jwtdecode(localStorage.getItem("access_token")).Username;
        props.history.push(`/profile/${currentUser}`);
    }

    return(
        <div className="page404">
            <div className="wrapper404">
                <h1 className="header404">Page Not Found</h1>
                <hr/>
                <p>The requested page does not exist!</p>
                <p>Please go to the 1UpDev home page by clicking the button below</p>
                <div className="homeButton" onClick={handleClick}>1UpDev Home</div>
            </div>
        </div>
    )
};

export default withRouter(Page404);