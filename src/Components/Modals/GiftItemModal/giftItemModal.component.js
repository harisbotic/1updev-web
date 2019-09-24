import React, { useState, useEffect } from "react";
import { Modal, Dropdown } from "react-bootstrap";
import { profile } from "../../../api/index";
import jwtdecode from "jwt-decode";

import "./GiftItemModal.style.scss";

import InventoryItemsModal from "../InventoryItemsModal/InventoryItemsModal";


const GiftItemModal = (props) => {
    const currentUserId = jwtdecode(localStorage.getItem("access_token")).ProfileId;

    const [selectedItem, setSelectedItem] = useState({
        id: 0,
        item: {
            name: "",
            image: "",
            backgroundColor: ""
        }
    });

    useEffect(() => {
        if (props.inventoryItem){
            setSelectedItem(props.inventoryItem);
        }
    }, [])
    
    const [selectedUser, setSelectedUser] = useState({});

    const [toggleList, setToggleList] = useState("block");

    const [inputs, setInputs] = useState({});

    const [modalShow, setModalShow] = useState(false);

    const [userList, setUserList] = useState({
        userList: []
    });

    const onChangeHandler = async event => {
        event.persist();

        setInputs(inputs => ({
            ...inputs,
            [event.target.name]: event.target.value
        }));

        const searchQueryResponse = await profile.searchByQuery.get(
            event.target.value
        );

        console.log(event.target.value);

        setUserList({
            userList: searchQueryResponse.data
        });

        setToggleList("block");
    };

    const onListItemClickHandler = (event, user) => {
        event.persist();

        setInputs(inputs => ({
            ...inputs,
            giftToUser: `${user.firstName} ${user.lastName}`
        }));

        setToggleList("none");

        console.log(user);

        setSelectedUser(user);
    }


    return (
        <>
            <div className="itemButton activate" onClick={() => setModalShow(true)}>
                <p>SEND GIFT</p>
            </div>

            <Modal show={modalShow} className="itemModal giftModal">

                <Modal.Header className="modalHeader">
                    <Modal.Title>Gift Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="giftTo">
                        <p>Gift To:</p>
                        <input type="text" name="giftToUser" onChange={onChangeHandler} value={inputs.giftToUser} />
                        <ul className="giftToUserList" style={{display: toggleList}}>
                            {userList.userList.map((user, index) => {
                                return (
                                    <li onClick={(event) => {
                                        onListItemClickHandler(event, user);
                                    }}
                                        key={index}>
                                        {user.firstName} {user.lastName}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="giftItem">
                        <p>Item: {selectedItem.item.name}</p>

                        {props.inventoryItem ? (
                        <InventoryItemsModal
                            background={selectedItem.item.backgroundColor}
                            icon={selectedItem.item.image}
                            inventoryItem={selectedItem}
                            setItem={setSelectedItem} />
                        ) : (
                            <InventoryItemsModal setItem={setSelectedItem} />
                        )}
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    {userList.userList.length != 0 ? (
                        <div variant="secondary" className="modalButton" onClick={() => { props.giftItem(currentUserId, selectedUser.id, selectedItem.id); setModalShow(false) }}>
                            <p>SEND</p>
                        </div>
                    ) : (
                            <div className="modalButton" style={{background: "gray"}}>
                                <p>SEND</p>
                            </div>
                        )}

                    <div variant="primary" className="modalButton cancel" onClick={() => setModalShow(false)}>
                        <p>CANCEL</p>
                    </div>
                </Modal.Footer>

            </Modal>
        </>
    )
};


export default GiftItemModal;