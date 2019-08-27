import React from "react";

import "./Item.style.scss";

const Item = props => {

    return (
    
        <div className="item-card" style={{background:props.background}}>
            <p className="itemCategory">{props.itemCategory}</p>
            <i className={props.itemIcon}></i>
            <p className="itemName">{props.itemName}</p>
            <p className="itemValue">{props.itemValue} Tokens</p>
            <p className="itemType">{props.itemType}</p>
        </div>
    )
};

export default Item;
