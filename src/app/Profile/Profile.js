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

    const [inventoryList, setInventoryList] = useState([]);
    const [stateChanged, rerenderDOM] = useState(false);
    const [activeBadgesCount, setActiveBadgesCount] = useState();
    const [activeBadges, setActiveBadges] = useState([]);
    const [isFetchingInventory, setIsFetchingInv] = useState()
    const [profileInfo, setProfileInfo] = useState({});
    const [userTokens, setUserTokens] = useState();
    const [inventoryValue, setInventoryValue] = useState();
    
    const emptyBadge = {
        "isActive":false,
        "item":{
            "name":"empty"
        }
    }

    const currentUser = jwtdecode(localStorage.getItem("access_token")).Username;

    const routeParams = props.history.location.pathname.split("/");
    const pageUser = routeParams[2];

    useEffect(() => {

        const fetchData = async () => {
            
            setIsFetchingInv(true)

            const profileInfoResponse = await profile.profileInfo.get(
                pageUser
            );
            
            setProfileInfo(profileInfoResponse.data);
            

            const fetchActiveBadges = await profile.getActiveBadges.get(
                profileInfoResponse.data.id
            );

            setActiveBadges(fetchActiveBadges.data);

            const getActiveBadgesCount = await profile.countActiveBadges.get(
                profileInfoResponse.data.id
            );

            setActiveBadgesCount(getActiveBadgesCount.data);
            

            const fetchInventoryValueResponse = await profile.getInventoryValue.get(
                profileInfoResponse.data.id
            );

            setInventoryValue(fetchInventoryValueResponse.data);


            const fetchProfileInventory = await profile.fetchProfileInventory.get(
                profileInfoResponse.data.id
            );
        
            setInventoryList(fetchProfileInventory.data
                .filter(inventory => !inventory.isActive))   


            const fetchAvailableTokens = await tokenTransactions.fetchTokenValue.get(profileInfoResponse.data.username);

            setUserTokens(fetchAvailableTokens.data);


            setIsFetchingInv(false)
        }

        fetchData();       

    },[stateChanged]);

    const fillEmptyBadges = () => {

        for(let i=activeBadges.length;i<3;i++)
            activeBadges.push(emptyBadge);

    }

    const toggleBadge = async itemId => {     

        await profile.toggleActivate.get(
            itemId,
            profileInfo.id
        );
        
        rerenderDOM(!stateChanged);
    };

    const giftItem = async (senderId,recieverId,inventoryId) => {

        await profile.giftItem.get(
            senderId,
            recieverId,
            inventoryId
        );
        
        rerenderDOM(!stateChanged);
    };

    const searchFilter = async userInput => {
    
        setIsFetchingInv(true)
        
        if (userInput === "") userInput = " ";

        const searchProfileInventory = await profile.searchProfileInventory.get(
            userInput,
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

    const searchAndSort = async (userInput,sort,isAscending) => {

        setIsFetchingInv(true)

        if (userInput === "") userInput = " ";

        const order = isAscending === true ? "asc" : "desc";
        
        const searchAndSortInventory = await profile.searchAndSortInventory.get(
            profileInfo.id,
            userInput,
            sort,
            order
        );
        
        setInventoryList(searchAndSortInventory.data
            .filter(inventory=> !inventory.isActive)
        )

        setIsFetchingInv(false);

    }

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
                
            <div className="imgContainer">
                {isFetchingInventory ? <LoadingElement/> : 
                <img
                    className="profilePicture"
                    src={`https://robohash.org/${profileInfo.id}`}
                    alt="user"
                />}
            </div>
                

                <div className="profileDetails">
                    {pageUser == currentUser ? (
                        <div className="editProfileButton" onClick={editProfileClick}>
                            <p>EDIT PROFILE</p>
                        </div>
                    ) : (
                        <div className="editProfileButton">
                            <GiftItemModal giftItem={giftItem} />
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
                        Profile value: {jsonProfileList.availableTokens}
                        </p>
                        <p className="profileRank">#6</p>
                    </div>

                    <div className="badges">
                        {fillEmptyBadges()}
                        { isFetchingInventory ? <div></div>
                            :(
                            activeBadges.map((badge,value) => {
                                return (
                                    <Badge
                                        key = {value}
                                        badgeData = {badge}
                                        item = {badge.item}
                                        routeParams={routeParams[2]}
                                        toggleBadge = {toggleBadge}
                                        username = {profileInfo.username}
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
                        (INVENTORY VALUE: <span className="tokenValue"> {inventoryValue} </span> Tokens)
                        </p>
                    </div>

                    <FilterOptions
                        searchFilter={searchFilter}
                        typeFilter={typeFilter}
                        searchAndSort={searchAndSort}
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
                            badgesLength = {activeBadgesCount}
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
