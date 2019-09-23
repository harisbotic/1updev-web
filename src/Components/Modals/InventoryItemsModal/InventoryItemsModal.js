import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { profile } from "../../../api/index";
import jwtdecode from "jwt-decode";
import "./InventoryItemsModal.style.scss"

import Item from "../../Item/Item.component";

const InventoryItemModal = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [itemsList, setItemsList] = useState([]);

    const [selectedItem, setSelectedItem] = useState({
        background: props.inventoryItem.item.rarity.backgroundColor,
        icon: props.inventoryItem.item.image
    });

    const currentUserId = jwtdecode(localStorage.getItem("access_token")).ProfileId;

    const handleClick = (inventoryItem) => {
        setSelectedItem({
            background: inventoryItem.item.rarity.backgroundColor,
            icon: inventoryItem.item.image
        });

        props.setItem(inventoryItem);

        setModalShow(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            const fetchProfileInventory = await profile.fetchProfileInventory.get(currentUserId);

            setItemsList(fetchProfileInventory.data
                    .filter(inventory => !inventory.isActive));
        }

        fetchData();
    }, []);

    const { itemList } = itemsList;

    return (
        <>
            <div className="itemCard" style={{ background: selectedItem.background }} onClick={() => {
                setModalShow(true);
            }}>
                <img src={selectedItem.icon} alt="" />
            </div>
            <Modal show={modalShow} className="inventoryItemsModal">
                <Modal.Header>
                    <p>Select Item...</p>
                </Modal.Header>

                <Modal.Body className="inventoryItemsModalList">
                        {itemsList.map(inventoryItem => {
                            return (
                                <div className="itemCard"
                                style={{ background: inventoryItem.item.rarity.backgroundColor }}
                                onClick={() => {
                                    handleClick(inventoryItem)
                                }} >
                                    <img src={inventoryItem.item.image} alt="" />
                                    <p>{inventoryItem.item.name}</p>
                                    <p>{inventoryItem.item.value}</p>
                                </div>
                            )
                        })}
                </Modal.Body>
                
                <Modal.Footer>
                    <div variant="primary" className="modalButton" onClick={() => setModalShow(false)}>
                        <p>CANCEL</p>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )


}

export default InventoryItemModal;