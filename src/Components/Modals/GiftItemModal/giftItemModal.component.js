import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./giftItemModal.style.scss";
import jwtdecode from "jwt-decode";


const GiftItemModal = (props) => {
    const username = jwtdecode(localStorage.getItem("access_token")).Username;

    const [modalShow, setModalShow] = useState(false);


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
                    You are about to gift <span className="modalSpan"> {props.itemName} </span>
                </Modal.Body>

                <Modal.Footer>
                    {/* implement onClick for item activation */}
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