import React, { useState } from 'react'

import ActivateItemModal from '../Modals/ActivateItemModal/ActivateItemModal.component';
import GiftItemModal from '../Modals/GiftItemModal/GiftItemModal.component';
import DisenchantModal from "../Modals/DisenchantItemModal/DisenchantItemModal.component";


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
    
    const {
        itemId,
        background,
        itemType,
        itemIcon,
        itemName,
        itemValue,
        itemRarity,
        activateBadge,
        badgesLength,
        giftItem,
        disenchant,
        inventoryItem,
    } = props;

    return (

        <div className="itemCard" style={{ background: background }}>

            <p className="itemType">{itemType}</p>

            <img src={itemIcon} />

            <div className="itemDetails">
                <p className="itemName">{itemName}</p>
                <p className="itemValue">{itemValue} Tokens</p>
                <p className="itemRarity">{itemRarity}</p>
            </div>

            <div className="hovered" style={{display: checkVisiting()}}>

                <div className="buttons">

                    <ActivateItemModal
                        itemId={itemId}
                        itemName={itemName}
                        itemType={itemType}
                        itemValue={itemValue}
                        activateBadge={activateBadge}
                        badgesLength = {props.badgesLength} />

                    <GiftItemModal
                        inventoryItem={inventoryItem} 
                        giftItem = {giftItem}/>

                    <DisenchantModal
                        itemId={itemId}
                        itemName={itemName}
                        itemValue={itemValue}
                        disenchantItem={disenchant} />
                        
                </div>

            </div>

        </div>

    )

}


export default Item;
