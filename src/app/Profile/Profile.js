import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { profile } from "../../api/index";

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
import ActivityLog from ".//ActivityLog/ActivityLog";

import jsonProfileList from "./profile.json";

import "./Profile.scss";

function Profile(props) {
  const [state, setState] = useState({
    user: {},
    inventory: [],
    itemList: [],
    badges: [],
    isFetchingInventory: false // Mozda dodati da se triggera nakon 1/2 sekunde a ne stalno
  });

  var profileID = 12; // Izbrisi ovo i dole u request salji ID

  useEffect(() => {
    const fetchData = async () => {
      setState({ isFetchingInventory: true });

      var routeParams = props.history.location.pathname.split("/");

      const profileInfoResponse = await profile.profileInfo.get(routeParams[2]);

      const fetchProfileInventory = await profile.fetchProfileInventory.get(
        profileID
      );

      setState({
        user: profileInfoResponse.data,
        inventory: fetchProfileInventory.data,
        itemList: fetchProfileInventory.data.map(inventory => inventory.item),
        badges: fetchProfileInventory.data.filter(
          inventory =>
            inventory.isActive && inventory.item.type.name === "Badge"
        ),
        isFetchingInventory: false
      });
    };

    fetchData();
  }, []);

  const { user, inventory, itemList, badges, isFetchingInventory } = state;

  const deactivateBadge = async badgeID => {
    // Remove from database by ID
    // Refresh page
  };

  const searchFilter = async searchText => {
    setState({ isFetchingInventory: true });

    if (searchText === "") searchText = " ";

    const searchProfileInventory = await profile.searchProfileInventory.get(
      searchText,
      profileID
    );

    setState({
      itemList: searchProfileInventory.data.map(inventory => inventory.item),
      isFetchingInventory: false
    });
  };

  const categoryFilter = async (sort, isAscending) => {
    setState({ isFetchingInventory: true });

    const order = isAscending === true ? "asc" : "desc";

    const fetchSortedProfileInventory = await profile.fetchSortedProfileInventory.get(
      sort,
      order,
      profileID
    );

    setState({
      itemList: fetchSortedProfileInventory.data.map(
        inventory => inventory.item
      ),
      isFetchingInventory: false
    });
  };

  const disenchantItem = itemID => {
    // Remove from database by ID
    // Refresh page
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
          src="https://icon-library.net/images/default-user-icon/default-user-icon-4.jpg"
          alt="user"
        />

        <div className="profileDetails">
          <div className="editProfileButton" onClick={editProfileClick}>
            EDIT PROFILE
          </div>

          <h1 className="username">@{user.nickname}</h1>

          <p className="userTitle">
            {jsonProfileList.title
              ? jsonProfileList.title
              : "User special title goes here"}
          </p>

          <div className="tokenRelated">
            <p className="availableTokens">
              Available tokens: {jsonProfileList.availableTokens}
            </p>
            <p className="profileValue">
              Profile value: {jsonProfileList.availableTokens}
            </p>
            <p className="profileRank">#6</p>
          </div>

          <div className="badges">
            {isFetchingInventory ? (
              <LoadingElement />
            ) : (
              badges.map(badge => {
                return (
                  <Badge
                    key={badge.item.id}
                    badgeData={badge}
                    item={badge.item}
                  />
                );
              })
            )}
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
          {isFetchingInventory ? (
            <LoadingElement />
          ) : (
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
                  itemActivateValue={item.price}
                  itemDisenchantValue={item.value}
                  disenchantItem={disenchantItem}
                /> // Bolji destructure uradit ovde
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Profile);
