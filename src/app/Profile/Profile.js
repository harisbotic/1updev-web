import React, { useEffect, useState } from "react";
import Inventory from './Components/Inventory/inventory.component.js';
import ProfileHeader from "./Components/ProfileHeader/ProfileHeader.js";

import "./Profile.scss";

const Profile = () => {
    return (
        <div>
            <ProfileHeader />
            <Inventory />
        </div>
    )
};

export default Profile;
