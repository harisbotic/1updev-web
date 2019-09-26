import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { profile } from "../../../api/index";
import jwtdecode from "jwt-decode";
import "./InventoryItemsModal.style.scss"

const InventoryItemModal = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [itemsList, setItemsList] = useState([]);

    const [selectedItem, setSelectedItem] = useState({
        background: "#79BEFF",
        icon: ""
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

        if (props.inventoryItem) {
            setSelectedItem({
                background: props.inventoryItem.item.rarity.backgroundColor,
                icon: props.inventoryItem.item.image
            })
        }

        fetchData();
    }, []);

    const { itemList } = itemsList;

    return (
        <>
            {selectedItem.icon ? (
                <div className="itemCard" style={{ background: selectedItem.background }} onClick={() => {
                    setModalShow(true); }}>
                    <img className="selectedItemIcon" src={selectedItem.icon} alt="" />
                </div>
            ) : (
                    <div className="selectItemCard" style={{ background: selectedItem.background }} onClick={() => {
                        setModalShow(true); }}>
                        <img className="noSelectedItemIcon" src="https://icon-library.net/images/three-dots-icon/three-dots-icon-29.jpg" alt="itemCardImage" />
                    </div>
                )}
            <Modal show={modalShow} className="inventoryItemsModal">
                <Modal.Header>
                    <p>Select Item...</p>
                </Modal.Header>

                <Modal.Body className="inventoryItemsModalList">
                    {itemsList.map((inventoryItem, index) => {
                        return (
                            <div className="itemCard"
                                key={index}
                                style={{ background: inventoryItem.item.rarity.backgroundColor }}
                                onClick={() => {
                                    handleClick(inventoryItem);
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