import React from 'react';
import './Buttons.css';

function  ProfileButton (props) {
    return <button  className="Butns" 
    id="PinkButton"
    onClick={props.onClick}>
    {props.title}</button>
}
export default ProfileButton;