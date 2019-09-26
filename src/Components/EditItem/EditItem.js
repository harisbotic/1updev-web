import React, { useState, useEffect } from 'react';
import { shop } from '../../api/index';

import './EditItem.scss';

export default function EditItem(props) {

    const [editItem, setEditItem] = useState({
        id: props.id,
        image: props.itemIcon,
        name: props.itemName,
        price: props.itemPrice,
        quantity: props.itemQuantity,
        value: props.itemValue,
        typeId: props.itemTypeId,
        rarityId: props.itemRarityId
    });
    const [itemTypesAndRarities, setItemTypesAndRarities] = useState({
        allItemTypes: [],
        allItemRarities: []
    });

    useEffect(() => {

        const fetchData = async () => {

            const itemTypesResponse = await shop.itemTypes.get();
            const itemRaritiesResponse = await shop.itemRarities.get();


            setItemTypesAndRarities({
                allItemTypes: itemTypesResponse.data,
                allItemRarities: itemRaritiesResponse.data
            });
        }
        fetchData();
    }, []);

    const {
        allItemRarities,
        allItemTypes
    } = itemTypesAndRarities;

    const {
        id,
        image,
        name,
        price,
        value,
        quantity,
        typeId,
        rarityId
    } = editItem;

    var typeOptions = allItemTypes.map((type) => {
        return <option key={`option_${type.id}`} value={type.id}>{type.name}</option>;
    });

    var rarityOptions = allItemRarities.map((rarity) => {
        return <option key={`option_${rarity.id}`} value={rarity.id}>{rarity.name}</option>;
    });

    const InputHandler = (event) => {
        event.persist();

        setEditItem(editItem => ({
            ...editItem,
            [event.target.name]: event.target.value
        }));
    }

    return (
        <>
            <div className="editItem" style={{ display: props.modalShow }}>
                <div className="editItemModal">
                    <form className="editItemForm" >
                        <div className="editItemFormLeft">
                            <label>
                                <div className="editImage"><p>Item Image</p>
                                    <input type="text" name="image" value={image}
                                        onChange={(e) => { InputHandler(e) }} />
                                </div>
                            </label>
                        </div>
                        <div className="editItemFormRight">
                            <div className="editFormText">
                                <label>Item name:
                                <input type="text" name="name" value={name}
                                        onChange={(e) => { InputHandler(e) }}
                                        required />
                                </label><br />
                                <label>Item price:
                                <input type="number" name="price" value={price}
                                        onChange={(e) => { InputHandler(e) }}
                                        required />
                                </label><br />
                                <label>Disenchant value:
                                <input type="number" name="value" value={value}
                                        onChange={(e) => { InputHandler(e) }}
                                        required />
                                </label><br />
                                <label>Quantity:
                                <input type="number" name="quantity" value={quantity}
                                        onChange={(e) => { InputHandler(e) }}
                                        required />
                                </label><br />
                                <label>Item type:
                                <select name="typeId" onChange={(e) => { InputHandler(e) }} required>{typeOptions}</select>
                                </label><br />
                                <label>Item rarity:
                                <select name="rarityId" onChange={(e) => { InputHandler(e) }} required>{rarityOptions}</select>
                                </label>
                            </div>
                            <div className="editFormButtons">
                                <button className="saveEditButton" onClick={() => { props.submitEditForm(id, editItem); props.modalClose("none") }}><p>SAVE</p></button>
                                <button onClick={() => props.modalClose("none")} className="cancelEditButton"><p>CANCEL</p></button>
                            </div>
                            <div className="itemDelete">
                                <button className="itemDeleteButton" onClick={() => { props.deleteItem(id) }}><p>DELETE ITEM</p></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}