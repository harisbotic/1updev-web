import React, { Component }  from "react";
import Inventory from './Components/Inventory/inventory.component.js';
import ProfileHeader from "./Components/ProfileHeader/ProfileHeader.js";

import "./Profile.scss";

import jsonItemList from "./list.json"

export class Profile extends Component {

    constructor(){
        super();

        this.state = {
            itemList: jsonItemList
        }
    }
    
    render(){
        return (
            <div>
                <ProfileHeader />
                <Inventory itemList={this.state.itemList}/>
            </div>
        )
    }
};

export default Profile;
