import React, { useState } from 'react';
import './Header.scss';
import Logo from '../../assets/logo.png'
import { withRouter } from "react-router";
import img from "../../assets/Image 545.png";
import { profile } from "../../api/index";


function Header (props) {

    const [userList, setUserList] = useState({
        userList: []
    });

    const handleRedirect = (route) => {
        props.history.push(route);
    }

   const onChangeHandler = async (event) =>
    {
        const searchQueryResponse = await profile.searchByQuery.get(event.target.value);

        console.log(searchQueryResponse.data);

        setUserList({
            userList: searchQueryResponse.data
        })
    }

    

    return (
        <div className="container-fluid" id="header-container">

            <div className="row" id="header">
                <div className="col header">
                    <img className="header-logo" alt="X" src={Logo} />
                </div>

                <div className="col btn">

                    <button className="header-nav-button"
                        id={(props.location.pathname == "/profile" || props.location.pathname == "/") ? 'header-nav-blue_button' : 'header-nav-purple_button'}
                        onClick={() => handleRedirect("/profile")} >PROFILE</button>

                    <button className="header-nav-button"
                        id={props.location.pathname == "/shop" ? 'header-nav-blue_button' : 'header-nav-purple_button'}
                        onClick={() => handleRedirect("/shop")} >SHOP</button>

                    <button className="header-nav-button"
                        id={props.location.pathname == "/ranking" ? 'header-nav-blue_button' : 'header-nav-purple_button'}
                        onClick={() => handleRedirect("/ranking")} >RANKS</button>

                </div>

                <div className="col rightWrapper search" style={{ color: "white" }}>
                    <input type="text" placeholder="search user" onChange={onChangeHandler} />
                 </div>

                <div className="col rightWrapper">
                    <img className="header-user-img" alt="X" src={img} />

                    <button className="btn dropdown-toggle"
                        type="button" id="dropdownMenuButton"
                        style={{ color: "white" }}>
                        @NekoNekic </button>
                </div>
            </div>

            <div className="search">
                Ovdje ide search
                </div>
        </div>
    );
}

export default withRouter(Header);