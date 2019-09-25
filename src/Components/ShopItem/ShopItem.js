import React, { useState } from 'react';

import './ShopItem.scss';
import BuyItemModal from '../BuyItemModal/BuyItemModal';

export const ShopItem = (props) => {

    const [buyItemModal, setBuyItemModal] = useState("none");

    return (
        <div className="shopItem">
            <div className="shopItemCard" style={{ background: props.background }}>

                <p className="shopItemType">{props.itemType}</p>

                <i className={props.itemIcon}></i>

                <div className="shopItemDetails">
                    <p className="shopItemName">{props.itemName}</p>
                    <p className="shopItemValue">{props.itemPrice} Tokens</p>
                    <p className="shopItemRarity">{props.itemRarity}</p>
                </div>
                {props.showModal == "block" ? 
                <div className="shopitem-hovered"  >

                    <div className='shopitem-hoveredInfo'>
                        <p className="shopitem-infoText"> Price: </p>
                        <p className="shopitem-tokenValue">{props.itemPrice}</p>
                    </div>
                    <div className="shopitem-buttons">
                        <BuyItemModal
                            // className='vertical-center'
                            // key={index}
                            itemQuantity={props.itemQuantity}
                            itemId={props.itemId}
                            background={props.background}
                            itemIcon={props.itemIcon}
                            itemName={props.itemName}
                            itemPrice={props.itemPrice}
                            itemValue={props.itemValue}
                            itemType={props.itemType}
                            itemRarity={props.itemRarity}
                            itemActivateValue={props.itemActivateValue}
                            itemDisenchantValue={props.itemDisenchantValue}
                        />
                    </div>
                    <div className="shopitem-hoveredInfo">
                        <p className='shopitem-infotext'> Left: </p>
                        <p className='shopitem-tokenValue'> {props.itemQuantity} </p>
                    </div>
                </div> : ''}
                

            </div>
        </div>
    )
}

export default ShopItem;