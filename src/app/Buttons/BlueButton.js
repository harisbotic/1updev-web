import React from 'react';
import './Buttons.css';

function BlueButton(props) {
    return <button className="Butns" id="BlueButton" onClick={props.onClick}>{props.title}</button>
}
export default BlueButton;