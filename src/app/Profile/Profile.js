import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Accordion, Button, Card } from 'react-bootstrap';
import { profile } from "../../api/index";

import Item from '../../Components/Item/Item.component';
import ActivityLog from './/ActivityLog/ActivityLog';

import "./Profile.scss";

import jsonItemList from "./itemList.json";
import jsonProfileList from './profile.json';

import './Profile.scss';

function Profile(props) {

    const [itemList, fetchItemList] = useState(jsonItemList);
    const [profileList, fetchProfileData] = useState(jsonProfileList.identity);
    const [filteredList, updateFilteredList] = useState(jsonItemList.items);
    const [modalState, toggleModal] = useState("none");

    const [state, setState] = useState({
        user: {},
        userList: []
    });
    
    useEffect(() => {
        const fetchData = async () => {
            var routeParams = props.history.location.pathname.split("/");

            const profileInfoResponse = await profile.profileInfo.get(routeParams[2]);

            setState({
                user: profileInfoResponse.data
            });
        }

        fetchData();
    }, []);

    const {
        user
    } = state;



    const searchFilterInventory = (searchText) => {

        updateFilteredList(
            itemList.items.filter(item =>
                item.name.toLowerCase().includes(searchText.toLowerCase())
            )
        )

    }

    const typeFilter = (target) => {

    }

    const disenchantItem = (id) => {

        /* LOGIC TO REMOVE IT FROM DATABASE */

        updateFilteredList(filteredList.filter(item => item.id !== id));

    }

    const editProfileClick = () => {
        //props.history.push(`/editprofile/${user.username}`)
        props.history.push({
            pathname: "/editprofile",
            state: { username: user.username }
        });
    }
    

    return(

        <div className="profile">

            <div className="profileDisplayComponent">

                <img className="profilePicture" src="https://icon-library.net/images/default-user-icon/default-user-icon-4.jpg" alt="user" />

                    <div className="profileDetails">
                        <div className="editProfileButton" onClick={editProfileClick}>
                            EDIT PROFILE
                        </div>


                    <p className="userTitle">{profileList.title ?
                        (profileList.title)
                        : ("User special title goes here")}
                    </p>

                    <h1 className="username">@{user.nickname}</h1>

                    <div className="tokenRelated">
                        <p className="availableTokens">Available tokens: {profileList.availableTokens}</p>
                        <p className="profileValue">Profile value: {profileList.availableTokens}</p>
                        <p className="profileRank">#6</p>
                    </div>

                    <div className="badges">

                        {
                            jsonItemList.items.map(item => {
                                if (item.category === "Badge" && item.isActive)
                                    return (
                                        <div key={item.id} className="badge">
                                            <i className={item.icon}></i>
                                        </div>
                                    )
                                else return null;
                            })
                        }
                    </div>

                </div>

                <div className="activityLogContainer">

                    <div className="logsDesktop">
                        <ActivityLog className="logsDesktop" />
                    </div>

                    <center>
                        <Accordion className="logsMobile">

                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Show Activity Log
                                </Accordion.Toggle>
                            <Accordion.Collapse className="collapseWindow" eventKey="0">
                                <ActivityLog />
                            </Accordion.Collapse>
                        </Accordion>

                    </center>
                </div>

            </div>


            <div className="inventoryContainer">

                <div className="infoSection">

                    <div className="infoText">
                        <p className="inventoryText">Inventory</p>
                        <p className="inventoryValue">(INVENTORY VALUE:
                                <span className="tokenValue"> {jsonProfileList.identity.profile.tokenValue} </span>
                            Tokens)</p>
                    </div>

                    <div className="filterOptionsContainer">

                        <div className="filterOptionsDesktop">
                            <div className="filterOptions">
                                <p>FILTER</p>
                                <p id="sortByName" onClick={typeFilter("name")}>Name <i className="fas fa-caret-down"></i></p>
                                <p id="sortByValue" onClick={typeFilter("value")}>Value<i className="fas fa-caret-down"></i></p>
                                <p id="sortByCategory" onClick={typeFilter("category")}>Category <i className="fas fa-caret-down"></i></p>

                                <div className="searchBoxComponent">
                                    <i className="fas fa-search"></i>
                                    <input
                                        type="text"
                                        name="search"
                                        className="searchBox"
                                        onChange={(e) => searchFilterInventory(e.target.value)}
                                        placeholder="Search items..."
                                    />
                                </div>
                            </div>
                        </div>

                        <Accordion className="filterOptionsMobile">
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    Show Filter Options
                                    </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <div className="filterOptions">
                                            <p id="sortByName" onClick={() => this.typeFilter("name")}>Name <i className="fas fa-caret-down"></i></p>
                                            <p id="sortByValue" onClick={() => this.typeFilter("value")}>Value<i className="fas fa-caret-down"></i></p>
                                            <p id="sortByCategory" onClick={() => this.typeFilter("category")}>Category <i className="fas fa-caret-down"></i></p>
                                        </div>
                                        <div className="searchBoxComponent">
                                            <i className="fas fa-search"></i>
                                            <input
                                                type="text"
                                                name="search"
                                                className="searchBox"
                                                onChange={(e) => this.searchFilterInventory(e.target.value)}
                                                placeholder="Search items..."
                                            />
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>

                    </div>

                </div>

                <div className="itemsContainer">
                    {
                        filteredList.map((item) => {

                            return (
                                <Item
                                    key={item.id}
                                    itemId={item.id}
                                    background={item.background}
                                    itemCategory={item.category}
                                    itemIcon={item.icon}
                                    itemName={item.name}
                                    itemValue={item.value}
                                    itemType={item.type}
                                    itemActivateValue={item.activatePrice}
                                    itemDisenchantValue={item.disenchantValue}
                                    disenchantItem={disenchantItem}
                                />

                            )

                        })
                    }
                </div>

            </div>

        </div>

    );

}

export default withRouter(Profile);
