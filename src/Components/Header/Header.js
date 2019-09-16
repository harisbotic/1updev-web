import React, { useState } from 'react';
import './Header.scss';
import Logo from '../../Assets/logo.png'
import { withRouter } from "react-router";
import img from "../../Assets/Image 545.png";
import { Dropdown } from 'react-bootstrap'
import { profile } from "../../api/index";


function Header (props) {

    const [userList, setUserList] = useState({
        userList: []
    });

    const handleRedirect = (route) => {
        props.history.push(route);
    }

    const logout = (route) => {
        props.history.push(route);
        localStorage.clear();
    }

   const onChangeHandler = async (event) =>
    {
        const searchQueryResponse = await profile.searchByQuery.get(event.target.value);

        console.log(searchQueryResponse.data);

        setUserList({
            userList: searchQueryResponse.data
        })
    }

    const DisplayDataHandler = () => {
        // Declare variables
        var input, filter, ul, li, a, i;
        input = document.getElementById("mySearch");
        filter = input.value.toUpperCase();
        ul = document.getElementById("myMenu");
        li = ul.getElementsByTagName("li");
      
        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
          a = li[i].getElementsByTagName("a")[0];
          if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
          } else {
            li[i].style.display = "none";
          }
        }
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
                <div  className="col rightWrapper search" style={{ color: "white" }}>
                    <input type="text" id="mySearch" placeholder="search user" onChange={onChangeHandler} onKeyUp={DisplayDataHandler} />
                    <ul id="myMenu">
                    {userList.userList.map((user, index) => {
                        return (
                            <li> {user.firstName} {user.lastName} </li>
                        )
                    })}
                    </ul>
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
        </div>
    );
}

export default withRouter(Header);