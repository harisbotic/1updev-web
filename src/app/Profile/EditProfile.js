import React, { Component } from 'react';

import "./editProfile.scss";

class EditProfile extends Component {

    
        
    render() {
        return (
           <div className = "editProfile">
               
               <div className = "profileDisplayComponent">
               <img className="profilePicture" src="https://icon-library.net/images/default-user-icon/default-user-icon-4.jpg" alt="user" />
                <div className="ProfileDetails">
                        <h3> @edissijaric </h3>
                        <p>User special title goes here</p>
                </div>
                <div className="Buttons">
                <div>
                    <button> SAVE CHANGES </button>
                </div>
                <div>
                    <button> BACK TO PROFILE </button>
                </div> 
                </div>
                

               </div>
               <div className="ContactForm">
               <form className="Forma">
                   <div>
                    <label>
                            First name:
                            <input type="text" name="firstname" value="Edis" />
                        </label>
                        <label>
                            Last name:
                            <input type="text" name="lastname" value="Sijaric" />
                        </label>
                   </div>
                    
                    <div>
                    <label>
                        Email:
                        <input type="text" name="email" value="edissijaric@tayra.io" />
                     </label>
                    </div>
                     
                     <div>
                     <label>
                        Username:
                        <input type="text" name="username" value="edissijaric" />
                     </label>
                     </div>
                     
                     <label>
                         Date of Birth
                         <input type="date" name="date" />
                     </label>
                </form>
                </div>
           </div>
        )
    }
}

export default EditProfile;

