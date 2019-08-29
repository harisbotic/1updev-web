import React from 'react';
import './Buttons.css';

function  PinkButton (props) {
    return <button  className="Butns" 
    id="PinkButton"
    onClick={props.onClick}>
    {props.title}</button>
}
export default PinkButton;