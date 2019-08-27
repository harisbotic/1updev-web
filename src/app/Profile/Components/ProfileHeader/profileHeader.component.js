import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

import './ProfileHeader.style.scss';


class ProfileHeader extends Component {

    state = {
        identity: this.props.profile.identity,
        profile: this.props.profile.identity.profile,
        inventory: null,
        activeBadges: 0,
        activeSkins: 0,
        activeTitles: 0
    }

    checkInventory = () => {
        this.props.inventoryList.map((inv) => {
            if (inv === this.state.profile.inventoryId) {
                this.setState({inventory: inv})
            }
        });
    }

    render() {
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
                        <h1 className="user-name">@{this.state.identity.username}</h1>
                        <div className="token-related">
                            <p className="available-tokens">Available tokens: {this.state.availableTokens}</p>
                            <p className="profile-value">Profile value: {this.state.availableTokens + this.state.inventoryValue}</p>
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
}

export default ProfileHeader;