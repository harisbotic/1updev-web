import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

import Item from './Components/Item/Item.component'

//import Inventory from './Components/Inventory/inventory.component.js';

import "./Profile.scss";

import jsonItemList from "./list.json";
import jsonProfileList from './profile.json';

import './ProfileHeader.style.scss';
import './inventory.style.scss';


export class Profile extends Component {

    constructor() {
        super();

        this.state = {
            itemList: jsonItemList,
            searchField: "",
            profile: jsonProfileList
        }
    }

    profileHeader = () => {
        return (
            <div className="profile-display-component">

                <Button variant="info">Edit Profile</Button>

                <div className="profile-display">

                    <img src="https://icon-library.net/images/default-user-icon/default-user-icon-4.jpg" alt="user" />

                    <div className="profile-details">

                        <p className="user-title">{this.state.title ?
                            (this.state.title)
                            : ("User title goes here")}
                        </p>
                        <h1 className="user-name">@{this.state.profile.identity.username}</h1>
                        <div className="token-related">
                            <p className="available-tokens">Available tokens: {this.state.availableTokens}</p>
                            <p className="profile-value">Profile value: {this.state.availableTokens}</p>
                            <p className="profile-rank">#{this.state.rank}</p>
                        </div>

                        <div className="badges">
                            <div className="badge"> </div>
                            <div className="badge"> </div>
                            <div className="badge"> </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    inventoryDisplay = () => {
        const searchField = this.state.searchField;
        const itemList = this.state.itemList.items;

        const filteredList = itemList.filter(item =>
            item.name.toLowerCase().includes(searchField.toLowerCase()));

        return (
            <div className="inventoryContainer">

                <div className="infoSection">
                    <h1 className="heading">
                        <span className="inventoryText">Inventory</span>
                        <span className="inventoryValue">(INVENTORY VALUE:
                            <span className="tokenValue"> 1250</span> Tokens)
                        </span>
                    </h1>
                    <div className="filterOptions">
                        <p>Sort by Name <i className="fas fa-caret-down"></i></p>
                        <p>Sort by Price<i className="fas fa-caret-down"></i></p>
                        <p>Sort by Category <i className="fas fa-caret-down"></i></p>
                        <input
                            type="search"
                            placeholder="Search inventory..."
                            id="searchInventory"
                            onChange={e => {
                                this.setState({ 'searchField': e.target.value })
                            }} />
                    </div>
                </div>
                <div className="itemsContainer">
                    {
                        filteredList.map((v) => {

                            return (
                                <Item
                                    key={v.id}
                                    background={v.background}
                                    itemCategory={v.category}
                                    itemIcon={v.icon}
                                    itemName={v.name}
                                    itemValue={v.value}
                                    itemType={v.type}
                                />

                            )

                        })
                    }
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="profile-header">
                    {this.profileHeader()}
                </div>
                    {this.inventoryDisplay()}
            </div>
        )
    }
};

export default Profile;
