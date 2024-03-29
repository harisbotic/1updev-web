import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { profile } from "../../api/index";

import "./editProfile.scss";

function EditProfile(props) {
    const [state, setState] = useState({
        user: {}
    });
    const [inputs, setInputs] = useState({});

    useEffect(() => {


        const fetchData = async () => {
            const username = props.location.state.username;

            const profileInfoResponse = await profile.profileInfo.get(username);

            setState({
                user: profileInfoResponse.data
            });

            setInputs(profileInfoResponse.data);
        }

        fetchData();
    }, []);


    const {
        user
    } = state;

    const BackToProfile = () => {
        props.history.push(`/profile/${user.username}`);
    }

    const submitHandler = async event => {
        event.preventDefault();

        await profile.editProfile.update(inputs, user.username);

        props.history.push(`/profile/${inputs.username}`);
    }

    const InputChangeHandler = (event) => {
        event.persist();

        setInputs(inputs => ({
            ...inputs,
            [event.target.name]: event.target.value
        }));
    }


    return (
        <div className="editProfile">

            <div className="profileDisplayComponent">
                <img className="profilePicture" src={`https://robohash.org/${user.id}`} alt="user" />
                <div className="ProfileDetails">
                    <h3> {user.username} </h3>
                </div>
                <div className="Buttons">
                    <button className="saveChangesButton" form="form" onSubmit={submitHandler}>
                        SAVE CHANGES
                    </button>
                    <div className="backProfileButton" onClick={BackToProfile}>
                        BACK TO PROFILE
                    </div>
                </div>


            </div>
            <div className="ContactForm">
                <form id="form" className="Form" onSubmit={submitHandler}>
                    <h3> Contact </h3>
                    <div className="FullName">
                        <label>
                            First name:
                            <input type="text" name="firstName"
                                value={inputs.firstName}
                                onChange={InputChangeHandler}
                                required />
                        </label>
                        <label className="lastName">
                            Last name:
                            <input type="text" name="lastName"
                                value={inputs.lastName}
                                onChange={InputChangeHandler}
                                required />
                        </label>
                    </div>

                    <div>
                        <label>
                            Email:
                        <input type="email" name="email"
                                value={inputs.email}
                                onChange={InputChangeHandler}
                                required />
                        </label>
                    </div>

                    <div>
                        <label>
                            Username:
                        <input type="text" name="username"
                                value={inputs.username}
                                onChange={InputChangeHandler}
                                required />
                        </label>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default withRouter(EditProfile);

