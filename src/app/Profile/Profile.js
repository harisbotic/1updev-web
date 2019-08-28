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
            itemList: jsonItemList.items,
            searchField: "",
            profile: jsonProfileList,
            filteredList: jsonItemList.items
        }
        
    }

    searchFilterInventory = (searchText) => {

        const itemList = this.state.itemList;

        this.setState({"filteredList":
            itemList.filter(item =>
            item.name.toLowerCase().includes(searchText.toLowerCase()))
        })
    }

    typeFilter = (target) => {

        const filteredList = this.state.filteredList;
        
        switch(target) {
            case "name":
                this.setState({"filteredList":
                filteredList.sort((a, b) => a.name.localeCompare(b.name)) })
                break
            case "value":
                this.setState({"filteredList":
                filteredList.sort((a, b) => a.value.toString().localeCompare(b.value.toString(),undefined,{numeric: true}))  })
                break
            case "category":
                this.setState({"filteredList":
                filteredList.sort((a, b) => a.category.localeCompare(b.category)) })
                break
        }

    }


    getBadges = () => {

        this.state.filteredList.items.map((item) => {
            return (
                <div className="badge">
                    <i className="fa fas-trophy"></i>
                </div>
            )
        })
    }
        

    render() {
     
        const searchField = this.state.searchField;
        const itemList = this.state.itemList;
        const filteredList = this.state.filteredList;
     
        return (
        <div>
            
            <div className="profile-display-component">

            <Button variant="info">Edit Profile</Button>

            <div className="profile-display">

                <img className="profile-picture" src="https://icon-library.net/images/default-user-icon/default-user-icon-4.jpg" alt="user" />

                <div className="profile-details">

                    <p className="user-title">{this.state.title ?
                        (this.state.title)
                        : ("User title goes here")}
                    </p>
                    <h1 className="user-name">@{this.state.profile.identity.username}</h1>
                    <div className="token-related">
                        <p className="available-tokens">Available tokens: {this.state.availableTokens}</p>
                        <p className="profile-value">Profile value: {this.state.availableTokens}</p>
                        <p className="profile-rank">#6</p>
                    </div>

                    <div className="badges">
                        {
                            itemList.map((item) => {
                                if (item.category == "Badge" && item.isActive)
                                return (
                                    <div className="badge">
                                        <i className={item.icon}></i>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        
            <div className="inventoryContainer">
                <div className="infoSection">
            <h1 className="heading">
                <span className="inventoryText">Inventory</span>
                <span className="inventoryValue">(INVENTORY VALUE:
                    <span className="tokenValue"> 1250</span> Tokens)
                </span>
            </h1>
            <div className="filterOptions">
                <p>Sort by : </p>    
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
                <div className="itemsContainer">
                    {
                        filteredList.map((item) => {

                            return (
                                <Item
                                    key={item.id}
                                    background={item.background}
                                    itemCategory={item.category}
                                    itemIcon={item.icon}
                                    itemName={item.name}
                                    itemValue={item.value}
                                    itemType={item.type}
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
