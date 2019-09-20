import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./activateItemModal.style.scss";
import jwtdecode from "jwt-decode";


const DisenchantModal = (props) => {
    const username = jwtdecode(localStorage.getItem("access_token")).Username;

    const [modalShow, setModalShow] = useState(false);
    const [hoveredInfoText, setHoverText] = useState("Name");


    return (
        <>
            <div className="itemButton activate" onClick={() => setModalShow(true)} onMouseEnter={props.onHover(`Disenchant for ${props.itemValue}`)}>
                <p>ACTIVATE</p>
            </div>
            <Modal show={modalShow} className="itemModal">

                <Modal.Header className="modalHeader">
                    <Modal.Title>Activate Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    You are about to activate <span className="modalSpan"> {props.itemName} </span>
                </Modal.Body>

                <Modal.Footer>
                    {/* implement onClick for item activation */}
                    <div variant="secondary" className="modalButton" onClick={() => setModalShow(false)}>
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