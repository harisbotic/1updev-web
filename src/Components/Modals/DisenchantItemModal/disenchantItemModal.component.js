import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./DisenchantItemModal.style.scss";

import jwtdecode from "jwt-decode";
import { tokenTransactions } from "../../../api/index";


const DisenchantModal = (props) => {
    const username = jwtdecode(localStorage.getItem("access_token")).Username;

    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <div className="itemButton activate" onClick={() => setModalShow(true)}>
                <p>DISENCHANT</p>
            </div>
            <Modal show={modalShow} className="itemModal disenchantModal">

                <Modal.Header className="modalHeader">
                    <Modal.Title>Disenchant Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    You are about to disenchant <span className="modalSpan"> {props.itemName} </span> for <span className="modalSpan"> {props.itemValue} </span> tokens
                </Modal.Body>

                <Modal.Footer>
                    <div variant="secondary" className="modalButton" onClick={() => {props.disenchantItem(username, props.itemId); setModalShow(false)}}>
                        <p>ACCEPT</p>
                    </div>
                    <div variant="primary" className="modalButton" onClick={() => setModalShow(false)}>
                        <p>CANCEL</p>
                    </div>
                </Modal.Footer>

            </Modal>
        </>
    )
};


export default DisenchantModal;