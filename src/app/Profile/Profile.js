import React, { useEffect, useState } from "react";
import "./Profile.scss";
import Header from "../Header/Header.js"
import {withRouter} from "react-router-dom";

class Profile extends React.Component {
    render() {
        
        return (
        <div className="mainWrapper">
            <h1 style={{marginTop:"88px"}}>Profile page</h1>
        </div>
        );
    }

}

export default withRouter(Profile);
