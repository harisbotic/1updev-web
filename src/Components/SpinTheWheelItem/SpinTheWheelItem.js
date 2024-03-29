import React from 'react';

import './SpinTheWheelItem.scss';

export const SpinTheWheelItem = (props) => {

    return (
            <div className="spinTheWheelItem">
                <div className="item_card" style={{ background: props.background }}>
                    <p className="item_type">{props.itemType}</p>
                    <img src={props.itemIcon}></img>

                    <div className="item_details">
                        <p className="item_name">{props.itemName}</p>
                        <p className="item_value">{props.itemValue}</p>
                        <p className="item_rarity">{props.itemRarity}</p>
                    </div>

                </div>
            </div>
    )
}