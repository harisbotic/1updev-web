import React from 'react';
import './Header.scss';
import Logo from '../../Assets/logo.png'
import { withRouter } from "react-router";
import img from "../../Assets/Image 545.png";
import { Dropdown } from 'react-bootstrap'


const Header = (props) => {

    const handleRedirect = (route) => {
        props.history.push(route);
    }

    const logout = (route) => {
        props.history.push(route);
        localStorage.clear();
    }

    return (
        <div className="container-fluid" id="header-container">

            <div className="row" id="header">
                <div className="col header">
                    <img className="header-logo" alt="X" src={Logo} />
                </div>

                <div className="col header-btn">

                    <button className="header-nav-button"
                        id={(props.location.pathname === "/profile" || props.location.pathname === "/") ? 'header-nav-blue_button' : 'header-nav-purple_button'}
                        onClick={() => handleRedirect("/profile")} >PROFILE</button>

                    <button className="header-nav-button"
                        id={props.location.pathname === "/shop" ? 'header-nav-blue_button' : 'header-nav-purple_button'}
                        onClick={() => handleRedirect("/shop")} >SHOP</button>

                    <button className="header-nav-button"
                        id={props.location.pathname === "/ranking" ? 'header-nav-blue_button' : 'header-nav-purple_button'}
                        onClick={() => handleRedirect("/ranking")} >RANKS</button>

                </div>

                <div className="col header-rightWrapper" style={{ color: "white" }}>
                    <input className="header-search" type="text" placeholder=" Search user" />
                </div>

                <div className="col header-rightWrapper">
                    <img className="header-user-img" alt="X" src={img} />
                    <Dropdown>
                        <Dropdown.Toggle className="header-user_name_btn" id="dropdown-basic ">NekoNekic </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item id="header-dropdown-item" onClick={() => logout("/login")}>Log out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <div className="header-search-wrapper">
            <input className="header-search" type="text" placeholder=" Search user" />
            </div>
        </div>
    );
}

export default withRouter(Header);