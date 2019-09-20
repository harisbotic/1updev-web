import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { profile, tokenTransactions } from "../../api/index";
import jwtdecode from 'jwt-decode';

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

import jsonProfileList from "./profile.json";

import "./Profile.scss";

function Profile(props) {

    const [itemsList, setItemsList] = useState({itemList: []});
    const [badgesChanged,modifyBadges] = useState(false);
    const [activeBadges, setBadges] = useState({badges: []});
    const [isLoading, setIsFetchingInv] = useState({isFetchingInventory: false})
    const [profileInfo, setProfileInfo] = useState({user: {}});
    const [userTokens, setUserTokens] = useState();

    const { user } = profileInfo;
    const { isFetchingInventory } = isLoading;
    const { badges } = activeBadges;
    const { itemList } = itemsList;

    const currentUser = jwtdecode(localStorage.getItem("access_token")).Username;

    const routeParams = props.history.location.pathname.split("/");
    const pageUser = routeParams[2];
    

    useEffect(() => {

        const fetchData = async () => {
            const profileInfoResponse = await profile.profileInfo.get(pageUser);

            setProfileInfo({user: profileInfoResponse.data});

            setIsFetchingInv({isFetchingInventory: true})

            const fetchProfileInventory = await profile.fetchProfileInventory.get(
                profileInfoResponse.data.id
            );

            setItemsList({itemList: fetchProfileInventory.data
                .filter(inventory => !inventory.isActive)
                .map(inventory => inventory.item)})

            setBadges({
                badges: fetchProfileInventory.data.filter(
                inventory =>
                    inventory.isActive && inventory.item.type.name === "Badge"
                )   
            });
            
            setIsFetchingInv({isFetchingInventory: false});

            const fetchAvailableTokens = await tokenTransactions.fetchTokenValue.get(profileInfoResponse.data.username);

            setUserTokens(fetchAvailableTokens.data);
        }

        fetchData();

    },[badgesChanged]);

    const refactorBadges = badges => {
            
        for(let i=badges.length;i<3;i++) {
            badges.push({
                "isActive":false,
                "item":{
                    "name":"empty"
                }
            });
        }
    }

    const toggleBadge = async badgeId => {
        
        await profile.toggleBadge.get(
            badgeId,
            user.id
        );
        
        modifyBadges(!badgesChanged);
    };

    const activateMerch = async merch  => {
        
        // Send mail

        // Disenchant
        
        modifyBadges(!badgesChanged);
    };

    const activateGame = async gameId => {
        
    }

    const searchFilter = async searchText => {
    
        setIsFetchingInv({isFetchingInventory: true})
        
        if (searchText === "") searchText = " ";

        const searchProfileInventory = await profile.searchProfileInventory.get(
            searchText,
            user.id
        );

        setItemsList({
            itemList: searchProfileInventory.data
            .filter(inventory=> !inventory.isActive)
            .map(inventory => inventory.item)
        })

        setIsFetchingInv({isFetchingInventory: false})

    };

    const categoryFilter = async (sort, isAscending) => {

        setIsFetchingInv({isFetchingInventory: true})

        const order = isAscending === true ? "asc" : "desc";

        const fetchSortedProfileInventory = await profile.fetchSortedProfileInventory.get(
            sort,
            order,
            user.id
        );
        
        setItemsList({
        itemList: fetchSortedProfileInventory.data
            .filter(inventory=> !inventory.isActive)
            .map(inventory => inventory.item)
        })

        setIsFetchingInv({isFetchingInventory: false})

    };

    const editProfileClick = () => {
        
        props.history.push({
            pathname: "/editprofile",
            state: { username: user.username }
        });
    };

    return (

        <div className="profile">

            <div className="profileDisplayComponent">
                
                <img
                    className="profilePicture"
                    src={`https://robohash.org/${user.id}`}
                    alt="user"
                />

                <div className="profileDetails">
                    {pageUser == currentUser ? (
                        <div className="editProfileButton" onClick={editProfileClick}>
                            <p>EDIT PROFILE</p>
                        </div>
                    ) : (
                        <div className="editProfileButton" onClick={editProfileClick}>
                            <p>SEND GIFT</p>
                        </div>
                    )}
                    

                    <h1 className="username">{user.username}</h1>

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
                        {
                            refactorBadges(badges)
                        }
                        { isFetchingInventory ? 
                            <div></div> :(
                            badges.map((badge,value) => {
                            return (
                                <Badge
                                    key={value}
                                    badgeData={badge}
                                    item={badge.item}
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
                            {" "}
                            {jsonProfileList.identity.profile.tokenValue}{" "}
                        </span>
                        
                        Tokens)
                        </p>
                    </div>

                    <FilterOptions
                        searchFilter={searchFilter}
                        categoryFilter={categoryFilter}
                    />

                    <FilterOptionsMobile
                        searchFilter={searchFilter}
                        categoryFilter={categoryFilter}
                    />

                </div>

                <div className="itemsContainer">
                    { isFetchingInventory ? 
                        <LoadingElement/> :
                        itemList.map(item => {
                        return (
                        <Item
                            key={item.id}
                            itemId={item.id}
                            background={"#702dbc"}
                            itemType={item.type.name}
                            itemIcon={item.image}
                            itemName={item.name}
                            itemValue={item.value}
                            itemRarity={item.rarity.name}
                            currentUsername={currentUser}
                            pageUsername={pageUser}
                            activateBadge={toggleBadge}
                        /> // Bolji destructure uradit ovde
                        );
                    })}

                </div>

            </div>

        </div>

    );

}

export default withRouter(Profile);
