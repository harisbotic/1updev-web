import React from 'react';
import './Buttons.css';

function PurpleButton(props) {
    return <button  className="Butns" id="PurpleButton" onClick={props.onClick}>{props.title}</button>
}
export default PurpleButton;