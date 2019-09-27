import React, { useState, useEffect } from "react";
import { mockRanks } from "../../api/ranking_mock";
import jwtdecode from 'jwt-decode';
import { profile, tokenTransactions } from "../../api/index";
//import jsonProfileList from "./profile.json";
import jsonProfileList from '../Profile/profile.json';
import Badge from "../../Components/Badges/Badge.component";

import { mockActivity } from "../../api/activity_mock";
import './Ranking.scss';
import { ActivityLog, ActivityLogMobile } from '../../Components/ActivityLog/ActivityLog.component';


function Ranking(props) {
    const [itemsList, setItemsList] = useState({ itemList: [] });
    const [stateChanged, rerenderDOM] = useState(false);
    const [activeBadges, setBadges] = useState({ badges: [] });
    const [isLoading, setIsFetchingInv] = useState({ isFetchingInventory: false })
    const [profileInfo, setProfileInfo] = useState({ user: {} });
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

            setIsFetchingInv({ isFetchingInventory: true })

            const fetchProfileInventory = await profile.fetchProfileInventory.get(
                profileInfoResponse.data.id
            );

            setProfileInfo({ user: profileInfoResponse.data });

            setItemsList({
                itemList: fetchProfileInventory.data
                    .filter(inventory => !inventory.isActive)
                    .map(inventory => inventory.item)
            })

            setBadges({
                badges: fetchProfileInventory.data.filter(
                    inventory =>
                        inventory.isActive && inventory.item.type.name === "Badge"
                )
            });

            setIsFetchingInv({ isFetchingInventory: false });

            const fetchAvailableTokens = await tokenTransactions.fetchTokenValue.get(profileInfoResponse.data.username);

            setUserTokens(fetchAvailableTokens.data);
        }

        fetchData();

    }, [stateChanged]);

    const refactorBadges = badges => {

        for (let i = badges.length; i < 3; i++) {
            badges.push({
                "isActive": false,
                "item": {
                    "name": "empty"
                }
            });
        }
    }

    const toggleBadge = async badgeId => {

        await profile.toggleBadge.get(
            badgeId,
            user.id
        );

        rerenderDOM(!stateChanged);
    };





    const disenchantItem = async (username, itemId) => {
        var newTokensResponse = await tokenTransactions.disenchantItem.post(username, itemId);
        setUserTokens(userTokens + newTokensResponse.data);

        rerenderDOM(!stateChanged);
    }

    const editProfileClick = () => {

        props.history.push({
            pathname: "/editprofile",
            state: { username: user.username }
        });
    };




    return (
        <div className="wrapper">
            <div className="profileDisplayComponent">

                <img
                    className="profilePicture"
                    src={`https://robohash.org/${user.id}`}
                    alt="user"
                />
                <div className="profileInfo">
                    <p> User special title goes here</p>
                    <h1 className="username">{user.username}</h1>
                    <p> RANKING: 6 </p>
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


            <div class="container col-12">
                <div class="col-6">
                    <div className="wholeTable">
                        <div className="title">
                            <div className="name col-6"> Ranking table:</div>
                            <div className="titleValue col-6">Value</div>
                        </div>
                        <div className="subtitle">
                            <div className="number col-1"></div>
                            <div className="picture col-1"></div>
                            <div className="usernameTitle col-2">Username</div>
                            <div className="specialTitle col-3">Special Title</div>
                            <div className="valueOfInventory col-2">Value of Inventory</div>
                            <div className="badgesIcon col-3">Badges</div>
                        </div>
                        <div className="data">
                            {mockRanks.map((x, index) => (
                                <div className="data_rows">
                                    <div className="orderNumber col-1">{index + 1}</div>
                                    <div className="picture col-1">{<img src={x.profileImg} />}</div>
                                    <div className="username col-2">{x.user}</div>
                                    <div className="ttl col-3">{x.title}</div>
                                    <div className="value col-2">{x.value}</div>
                                    <div className="badges col-3">{x.badges.map(y => <img src={y} />)}</div>
                                </div>
                            ))}
                        </div>

                    </div>
                    {/* close whole table */}
                </div>
                <div>
                    <ActivityLog />

                    <ActivityLogMobile />
                </div>
            </div>
        </div>
    );
}

export default Ranking;