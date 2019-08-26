import React, { Component } from "react";

import './ProfileHeader.scss'

class ProfileHeader extends Component {
    render() {
        return (
            <div className="profile-display-component">

                <button>Edit Profile</button>

                <div className="profile-display">

                    <img src="https://icon-library.net/images/default-user-icon/default-user-icon-4.jpg" alt="user" />

                    <div className="profile-details">

                        <p className="user-title">User title goes here</p>
                        <h1 className="user-name">@tradoncic1</h1>
                        <div className="token-related">
                            <p className="available-tokens">Available tokens: 455</p>
                            <p className="profile-value">Profile value: 455</p>
                            <p className="profile-rank">#6</p>
                        </div>

                        <div className="badges">
                            <div className="badge"></div>
                            <div className="badge"></div>
                            <div className="badge"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileHeader;