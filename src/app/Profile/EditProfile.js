import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { profile } from "../../api/index";

import "./editProfile.scss";

function EditProfile(props) {
    const [state, setState] = useState({
        user: {}
    });

    useEffect(() => {
        const fetchData = async () => {
            //const profileInfoResponse = await profile.profileInfo.get("profiles");

            var routeParams = props.history.location.pathname.split("/");

            const profileInfoResponse = await profile.profileInfo.get(routeParams[2]);

            setState({
                user: profileInfoResponse.data
            });

        }

        fetchData();
    }, []);

    const submitHandler = () =>
    {
        const editData = async () => {
            //const profileInfoResponse = await profile.profileInfo.get("profiles");

            var routeParams = props.history.location.pathname.split("/");

            const editProfileResponse = await profile.editProfile.put(routeParams[2]);


        }

        editData();
    }



    const {
        user
    } = state;

    const BackToProfile = () => {
        props.history.push(`/profile/${user.username}`)
    }
    
    
    return (
        <div className="editProfile">

            <div className="profileDisplayComponent">
                <img className="profilePicture" src="https://icon-library.net/images/default-user-icon/default-user-icon-4.jpg" alt="user" />
                <div className="ProfileDetails">
                    <h3> {user.firstName+user.lastName} </h3>
                    <p>User special title goes here</p>
                </div>
                <div className="Buttons">
                    <div className="saveChangesButton">
                        SAVE CHANGES
                    </div>
                    <div className="backProfileButton" onClick={BackToProfile}>
                        BACK TO PROFILE
                    </div>
                </div>


            </div>
            <div className="ContactForm">
                <form className="Forma">
                    <h3> Contact </h3>
                    <div className="FullName">
                        <label>
                            First name:
                            <input type="text" name="firstname" placeholder={user.firstName} />
                        </label>
                        <label className="lastName">
                            Last name:
                            <input type="text" name="lastname" placeholder={user.lastName} />
                        </label>
                    </div>

                    <div>
                        <label>
                            Email:
                        <input type="text" name="email" placeholder={user.email} />
                        </label>
                    </div>

                    <div>
                        <label>
                            Username:
                        <input type="text" name="username" placeholder={user.username} />
                        </label>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default withRouter(EditProfile);

