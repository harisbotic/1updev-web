import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { profile } from "../../api/index";

import "./editProfile.scss";

function EditProfile(props) {
    const [state, setState] = useState({
        user: {}
    });

    const [firstName, setFirstName] = useState({
        firstName: ''
    });
    const [lastName, setLastName] = useState({
        lastName: ''
    });
    const [email, setEmail] = useState({
        email: ''
    });
    const [username, setUserName] = useState({
        username: ''
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
    
    const SaveChangesHandler = (e) => {
        e.preventDefault();
        setState({
            user:{
                firstName: firstName,
                lastName: lastName,
                email: email,
                identity: {
                    username: username
                }
                
            }
        });

        console.log(user);
    }

    // const InputChangeHandler = (e) => {
    //     setState({
    //         user: {
    //             {e.target.name}: e.target.value
    //         }
    //     })
    // }

  
    
    return (
        <div className="editProfile">

            <div className="profileDisplayComponent">
                <img className="profilePicture" src="https://icon-library.net/images/default-user-icon/default-user-icon-4.jpg" alt="user" />
                <div className="ProfileDetails">
                    <h3> {user.firstName+user.lastName} </h3>
                    <p>User special title goes here</p>
                </div>
                <div className="Buttons">
                    <div className="saveChangesButton" onSubmit={SaveChangesHandler}>
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
                            <input type="text" name="firstname" 
                            placeholder={user.firstName} 
                            onChange={e => setFirstName(e.target.value)}/>
                        </label>
                        <label className="lastName">
                            Last name:
                            <input type="text" name="lastname" 
                            placeholder={user.lastName}
                            onChange={e => setLastName(e.target.value)} />
                        </label>
                    </div>

                    <div>
                        <label>
                            Email:
                        <input type="text" name="email" 
                        placeholder={user.email}
                        onChange={e => setEmail(e.target.value)} />
                        </label>
                    </div>

                    <div>
                        <label>
                            Username:
                        <input type="text" name="username" 
                        placeholder={user.username} 
                        onChange={e => setUserName(e.target.value)}/>
                        </label>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default withRouter(EditProfile);

