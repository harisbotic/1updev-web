import React, { useState } from 'react'
import DisenchantModal from "../Modals/DisenchantItemModal/disenchantItemModal.component";
import ActivateItemModal from '../Modals/ActivateItemModal/activateItemModal.component';
import GiftItemModal from '../Modals/GiftItemModal/giftItemModal.component';

import "./Item.style.scss";

export function Item(props) {
    
    const [hoveredInfoText, setHoverText] = useState("Name");
    const [hoveredTokenValue, setHoverTokenValue] = useState("Token Value");

    const updatePrice = type => {
        if (type === "Badge" || type === "Games" || type === "Skin")
            setHoverTokenValue(props.itemActivateValue + " Tokens");
        else if (type === "Merch")
            setHoverTokenValue(props.itemValue + " Tokens");
    }

    const checkVisiting = () => {
        if (props.currentUsername == props.pageUsername){
            return "flex"
        }
        return "none"
    }

    return (

        <div className="itemCard" style={{ background: props.background }}>

            <p className="itemType">{props.itemType}</p>

            <img src={props.itemIcon} />

            <div className="itemDetails">
                <p className="itemName">{props.itemName}</p>
                <p className="itemValue">{props.itemValue} Tokens</p>
                <p className="itemRarity">{props.itemRarity}</p>
            </div>

            <div className="hovered" style={{display: checkVisiting()}}>

                <div className="buttons">

                    <ActivateItemModal
                        itemId={props.itemId}
                        itemName={props.itemName}
                        itemType={props.itemType}
                        itemValue={props.itemValue}
                        activateBadge={props.activateBadge} />

                    <GiftItemModal
                        itemId={props.itemId}
                        itemName={props.itemName}
                        itemValue={props.itemValue} />

                    <DisenchantModal
                        itemId={props.itemId}
                        itemName={props.itemName}
                        itemValue={props.itemValue}
                        disenchantItem={props.disenchant} />
                </div>

                {/* <div className="hoveredInfo">
                    <p className="infoText">{hoveredInfoText}</p>
                </div> */}

            </div>

        </div>

    )

}


export default Item;
