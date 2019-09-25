import React, { useState } from 'react';

import './ShopItem.scss';
import BuyItemModal from '../BuyItemModal/BuyItemModal';
import EditItem from '../EditItem/EditItem';

export const ShopItem = (props) => {

    const [buyItemModal, setBuyItemModal] = useState(false);
    const [editItemModalShow, setEditItemModalShow] = useState("none");

    const handleShow = () => setEditItemModalShow("block");

    return (
        <>
            <EditItem
                modalShow={editItemModalShow}
                modalClose={setEditItemModalShow}
                id={props.id}
                itemId={props.itemId}
                itemQuantity={props.itemQuantity}
                itemIcon={props.itemIcon}
                itemName={props.itemName}
                itemPrice={props.itemPrice}
                itemValue={props.itemValue}
                itemType={props.itemType}
                itemTypeId={props.itemTypeId}
                itemRarity={props.itemRarity}
                itemRarityId={props.itemRarityId}
                submitEditForm={props.submitEditForm}
                deleteItem={props.deleteItem}
            />
            <div className="shopItem">
                <div className="shopItemCard" style={{ background: props.background }}>

                    <p className="shopItemType">{props.itemType}</p>

                    <img src={props.itemIcon} />

                    <div className="shopItemDetails">
                        <p className="shopItemName">{props.itemName}</p>
                        <p className="shopItemValue">{props.itemPrice} Tokens</p>
                        <p className="shopItemRarity">{props.itemRarity}</p>
                    </div>

                    <div className="shopitem-hovered" >
                        <div className='shopitem-hoveredInfo'>
                            <p className="shopitem-infoText"> Price: </p>
                            <p className="shopitem-tokenValue">{props.itemPrice}</p>
                        </div>
                        <div className="shopitem-buttons">
                            <BuyItemModal
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
                            <div className="shopItemButton" onClick={() => handleShow()}><p>EDIT</p></div>

                        </div>
                        <div className="shopitem-hoveredInfo">
                            <p className='shopitem-infotext'> Left: </p>
                            <p className='shopitem-tokenValue'> {props.itemQuantity} </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopItem;