import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

import Inventory from './Components/Inventory/inventory.component.js';
import ProfileHeader from "./Components/ProfileHeader/profileHeader.component.js";

import "./Profile.scss";

import jsonList from "./list.json";
import profileJson from './profile.json';

export class Profile extends Component {

    constructor() {
        super();

        this.state = {
            itemList: jsonList,
            profile: profileJson
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

    render() {
        return (
            <div>
                <div className="profile-header">
                    {this.profileHeader()}
                </div>
                <Inventory itemList={this.state.itemList} />
            </div>
        )
    }
};

export default Profile;
