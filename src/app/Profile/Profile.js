import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import jwtdecode from 'jwt-decode';

import { profile, tokenTransactions } from "../../api/index";
import Badge from "../../Components/Badges/Badge.component";
import {
  ActivityLog,
  ActivityLogMobile
} from "../../Components/ActivityLog/ActivityLog.component";
import {
  FilterOptions,
  FilterOptionsMobile
} from "../../Components/FilterOptions/FilterOptions.component";
import Item from "../../Components/Item/Item.component";
import LoadingElement from "../../Components/LoadingElement/LoadingElement.component";
import GiftItemModal from '../../Components/Modals/GiftItemModal/GiftItemModal.component';

import jsonProfileList from "./profile.json";

import "./Profile.scss";

function Profile(props) {

    const [profileInfo, setProfileInfo] = useState({});
    const [inventoryList, setInventoryList] = useState([]);
    const [isFetchingInventory, setIsFetchingInv] = useState();

    const [badges, setBadges] = useState([]);
    const [activeBadges, setActiveBadges] = useState([]);

    const [userTokens, setUserTokens] = useState();
    const [inventoryValue, setInventoryValue] = useState();
    
    const [stateChanged, rerenderDOM] = useState(false);

    const currentUser = jwtdecode(localStorage.getItem("access_token")).Username;

    const routeParams = props.history.location.pathname.split("/");
    const pageUser = routeParams[2];
    

    useEffect(() => {

        const fetchData = async () => {
            
            const profileInfoResponse = await profile.profileInfo.get(pageUser);

            setIsFetchingInv(true)

            const fetchProfileInventory = await profile.fetchProfileInventory.get(
                profileInfoResponse.data.id
            );

            const fetchInventoryValueResponse = await profile.getInventoryValue.get(profileInfoResponse.data.id);

            setProfileInfo(profileInfoResponse.data);

            setInventoryList(fetchProfileInventory.data
                .filter(inventory => !inventory.isActive))

            setActiveBadges(
                fetchProfileInventory.data.filter(
                inventory =>
                    inventory.isActive && inventory.item.type.name === "Badge"
                )   
            );
            
            setInventoryValue(fetchInventoryValueResponse.data);

            setIsFetchingInv(false)

            const fetchAvailableTokens = await tokenTransactions.fetchTokenValue.get(profileInfoResponse.data.username);

            setUserTokens(fetchAvailableTokens.data);
        }

        fetchData();

    },[stateChanged]);

    const refactorBadges = activeBadges => {

        for(let i=activeBadges.length;i<3;i++) {
            badges.push({
                "isActive":false,
                "item":{
                    "name":"empty"
                }
            });
        }
    }

    const toggleBadge = async itemId => {     

        await profile.toggleActivate.get(
            itemId,
            profileInfo.id
        );
        
        rerenderDOM(!stateChanged);
    };

    const giftItem = async (senderId,recieverId,inventoryId) => {

        //console.log(senderId, recieverId, inventoryId);

        const giftItemResponse = await profile.giftItem.get(
            senderId,
            recieverId,
            inventoryId
        );

        if (giftItemResponse.data == 500) {
            alert("You can't gift items to yourself!");
        } else {
            rerenderDOM(!stateChanged);
        }
        
    };

    const searchFilter = async searchText => {
    
        setIsFetchingInv(true)
        
        if (searchText === "") searchText = " ";

        const searchProfileInventory = await profile.searchProfileInventory.get(
            searchText,
            profileInfo.id
        );

        setInventoryList(searchProfileInventory.data
            .filter(inventory=> !inventory.isActive)
        )

        setIsFetchingInv(false)

    };

    const typeFilter = async (sort, isAscending) => {

        setIsFetchingInv(true)

        const order = isAscending === true ? "asc" : "desc";

        const fetchSortedProfileInventory = await profile.fetchSortedProfileInventory.get(
            sort,
            order,
            profileInfo.id
        );
        
        setInventoryList(fetchSortedProfileInventory.data
            .filter(inventory=> !inventory.isActive)
        )

        setIsFetchingInv(false);

    };

    const disenchantItem = async (username, itemId) => {
        var newTokensResponse = await tokenTransactions.disenchantItem.post(username, itemId);
        setUserTokens(userTokens + newTokensResponse.data);

        rerenderDOM(!stateChanged);
    }

    const editProfileClick = () => {
        
        props.history.push({
            pathname: "/editprofile",
            state: { username: profileInfo.username }
        });
    };

    return (

        <div className="profile">

            <div className="profileDisplayComponent">
                
                <img
                    className="profilePicture"
                    src={`https://robohash.org/${profileInfo.id}`}
                    alt="user"
                />

                <div className="profileDetails">
                    {pageUser == currentUser ? (
                        <div className="editProfileButton" onClick={editProfileClick}>
                            <p>EDIT PROFILE</p>
                        </div>
                    ) : (
                        <div className="editProfileButton">
                            <GiftItemModal 
                            giftToUser={pageUser}
                            giftItem={giftItem} />
                        </div>
                    )}
                    

                    <h1 className="username">{profileInfo.username}</h1>

                    <p className="userTitle">
                        {jsonProfileList.title
                        ? jsonProfileList.title
                        : "User special title goes here"}
                    </p>

                    <div className="tokenRelated">
                        <p className="availableTokens">
                        Available tokens: {userTokens}
                        </p>
                        <p className="profileValue">
                        Profile value: {inventoryValue + userTokens}
                        </p>
                        <p className="profileRank">#6</p>
                    </div>

                    <div className="badges">
                        {
                            refactorBadges(activeBadges)
                        }
                        { isFetchingInventory ? 
                            <div></div> :(
                            badges.map((badge,value) => {
                                return (
                                    <Badge
                                        key = {value}
                                        badgeData = {badge}
                                        item = {badge.item}
                                        deactivateBadge = {toggleBadge}
                                    />
                                );
                            }))
                        }

                    </div>
                    
                </div>

                <ActivityLog />

                <ActivityLogMobile />
        </div>

            <div className="inventoryContainer">
                
                <div className="infoSection">

                    <div className="infoText">
                        <p className="inventoryText">Inventory</p>
                        <p className="inventoryValue">
                        (INVENTORY VALUE:
                        
                        <span className="tokenValue">
                            {inventoryValue}
                        </span>
                        
                        Tokens)
                        </p>
                    </div>

                    <FilterOptions
                        searchFilter={searchFilter}
                        typeFilter={typeFilter}
                    />

                    <FilterOptionsMobile
                        searchFilter={searchFilter}
                        typeFilter={typeFilter}
                    />

                </div>

                <div className="itemsContainer">
                    { isFetchingInventory ? 
                        <LoadingElement/> :
                        inventoryList.map((inventory,value) => {
                        return (
                        <Item
                            key = {value}
                            inventoryItem = {inventory}
                            inventoryId = {inventory.id}
                            itemId = {inventory.item.id}
                            background = {inventory.item.rarity.backgroundColor}
                            itemType = {inventory.item.type.name}
                            itemIcon = {inventory.item.image}
                            itemName = {inventory.item.name}
                            itemValue = {inventory.item.value}
                            itemRarity = {inventory.item.rarity.name}
                            currentUsername = {currentUser}
                            pageUsername = {pageUser}
                            disenchant = {disenchantItem}
                            badgesLength = {badges.length}
                            activateBadge = {toggleBadge}
                            giftItem = {giftItem}
                        /> // Bolji destructure uradit ovde
                        );
                    })}

                </div>

            </div>

        </div>

    );

}

export default withRouter(Profile);
