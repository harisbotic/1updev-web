import React, { Component } from "react";
import { Accordion, Button, Card } from 'react-bootstrap';

import Item from './Components/Item/Item.component';
import ActivityLog from './Components/ActivityLog/ActivityLog.js';

import "./Profile.scss";

import jsonItemList from "./itemList.json";
import jsonProfileList from './profile.json';

import './Profile.scss';

export class Profile extends Component {

    constructor() {
        super();

        this.state = {
            itemList: jsonItemList,
            searchField: "",
            profile: jsonProfileList,
            isAscending: true,
            filteredList: jsonItemList.items
        }
    }

    searchFilterInventory = (searchText) => {

        const itemList = this.state.itemList.items;

        this.setState({
            "filteredList":
                itemList.filter(item =>
                    item.name.toLowerCase().includes(searchText.toLowerCase()))
        })
    }

    typeFilter = (target) => {

        const filteredList = this.state.filteredList;
        const isAscending = this.state.isAscending;

        if (isAscending) {
            this.setState({
                "filteredList":
                    filteredList.sort((a, b) => a[target].toString().localeCompare(b[target].toString(), undefined, { numeric: (target === "value") }))
            })
        } else if (!isAscending) {
            this.setState({
                "filteredList":
                    filteredList.sort((a, b) => b[target].toString().localeCompare(a[target].toString(), undefined, { numeric: target === "value" }))
            })
        }

        this.setState({ "isAscending": !isAscending });
    }

    getBadges = () => {

        jsonItemList.items.map((item) => {
            return (
                <div className="badge">
                    <i className="fa fas-trophy"></i>
                </div>
            )
        })
    }

    disenchantItem = (id) => {

        const filteredList = this.state.filteredList.filter(item => item.id !== id)

        /* LOGIC TO REMOVE IT FROM DATABASE */

        this.setState({ "filteredList": filteredList });

    }

    render() {

        const filteredList = this.state.filteredList;
        
        return (

            <div className="profile">

                <div className="profileDisplayComponent">

                    <img className="profilePicture" src="https://icon-library.net/images/default-user-icon/default-user-icon-4.jpg" alt="user" />

                    <div className="profileDetails">
                        <div className="editProfileButton"><p>EDIT PROFILE</p></div>

                        <p className="userTitle">{this.state.title ?
                            (this.state.title)
                            : ("User special title goes here")}
                        </p>

                        <h1 className="username">@{this.state.profile.identity.username}</h1>

                        <div className="tokenRelated">
                            <p className="availableTokens">Available tokens: {this.state.availableTokens}</p>
                            <p className="profileValue">Profile value: {this.state.availableTokens}</p>
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
                                <p id="sortByName" onClick={() => this.typeFilter("name")}>Name <i className="fas fa-caret-down"></i></p>
                                <p id="sortByValue" onClick={() => this.typeFilter("value")}>Value<i className="fas fa-caret-down"></i></p>
                                <p id="sortByCategory" onClick={() => this.typeFilter("category")}>Category <i className="fas fa-caret-down"></i></p>

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
                                        disenchantItem={this.disenchantItem}
                                    />

                                )

                            })
                        }
                    </div>
                
                </div>

            </div>
        )
    }
};

export default Profile;
