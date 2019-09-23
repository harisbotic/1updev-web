import React, { useState } from "react";
import { Modal, Dropdown } from "react-bootstrap";
import { profile } from "../../../api/index";
import "./giftItemModal.style.scss";
import jwtdecode from "jwt-decode";

import InventoryItemsModal from "../InventoryItemsModal/InventoryItemsModal";


const GiftItemModal = (props) => {
    const username = jwtdecode(localStorage.getItem("access_token")).Username;

    const[selectedItem, setSelectedItem] = useState({});

    const [inputs, setInputs] = useState({});

    const [modalShow, setModalShow] = useState(false);

    const [userList, setUserList] = useState({
        userList: []
    });

    const onChangeHandler = async event => {event.persist();

        setInputs(inputs => ({
            ...inputs,
            [event.target.name]: event.target.value
        }));

        const searchQueryResponse = await profile.searchByQuery.get(
            event.target.value
        );

        setUserList({
            userList: searchQueryResponse.data
        });
    };

    const onListItemClickHandler = (event, user) => {
        event.persist();

        setInputs(inputs => ({
            ...inputs,
            giftToUser: `${user.firstName} ${user.lastName}`
        }));
    }


    return (
        <>
            <div className="itemButton activate" onClick={() => setModalShow(true)}>
                <p>SEND GIFT</p>
            </div>
            <Modal show={modalShow} className="itemModal">

                <Modal.Header className="modalHeader">
                    <Modal.Title>Gift Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="giftTo">
                        <p>Gift To:</p>
                        <input type="text" name="giftToUser" onChange={onChangeHandler} value={inputs.giftToUser}/>
                        <ul className="giftToUserList">
                            {userList.userList.map((user, index) => {
                                return (
                                    <li onClick={(event) => {
                                        onListItemClickHandler(event, user);
                                        }}
                                        id={user.username} key={index}>
                                        {user.firstName} {user.lastName}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="giftItem">
                        <p>Item:</p>
                        
                        <InventoryItemsModal background={props.background} icon={props.icon} setItem={setSelectedItem}/>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <div variant="secondary" className="modalButton" onClick={() => setModalShow(false)}>
                        <p>SEND</p>
                    </div>
                    <div variant="primary" className="modalButton" onClick={() => setModalShow(false)}>
                        <p>CANCEL</p>
                    </div>
                </Modal.Footer>

            </Modal>
        </>
    )
};


export default GiftItemModal;