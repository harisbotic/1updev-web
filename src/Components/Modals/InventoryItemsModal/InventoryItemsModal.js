import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { profile } from "../../../api/index";
import jwtdecode from "jwt-decode";
import "./InventoryItemsModal.style.scss"

import Item from "../../Item/Item.component";

const InventoryItemModal = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [itemsList, setItemsList] = useState({ itemList: [] });

    const [selectedItem, setSelectedItem] = useState({
        background: props.background,
        icon: props.icon
    });

    const currentUserId = jwtdecode(localStorage.getItem("access_token")).ProfileId;

    const handleClick = (item) => {
        setSelectedItem({
            background: item.rarity.backgroundColor,
            icon: item.image
        });

        setModalShow(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            const fetchProfileInventory = await profile.fetchProfileInventory.get(currentUserId);

            console.log(fetchProfileInventory.data);

            setItemsList({
                itemList: fetchProfileInventory.data
                    .filter(inventory => !inventory.isActive)
                    .map(inventory => inventory.item)
            })
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
                        {itemList.map(item => {
                            return (
                                <div className="itemCard"
                                style={{ background: item.rarity.backgroundColor }}
                                onClick={() => {
                                    handleClick(item)
                                }} >
                                    <img src={item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>{item.value}</p>
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