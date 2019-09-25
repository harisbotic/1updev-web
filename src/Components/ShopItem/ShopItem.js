import React from 'react';

import './ShopItem.scss';

export const ShopItem = (props) => {

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
            </div>
        </div>
    )
}

export default ShopItem;