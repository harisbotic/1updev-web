import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./ActivateItemModal.style.scss";
import jwtdecode from "jwt-decode";


const ActivateItemModal = (props) => {
    const username = jwtdecode(localStorage.getItem("access_token")).Username;

    const [modalShow, setModalShow] = useState(false);
    const [hoveredInfoText, setHoverText] = useState("Name");
    

    const activationRedirect = type => {
        
        switch(type) {
            case "Badge":
                if(props.badgesLength<3)
                    props.activateBadge(props.itemId);
        }

    }


    return (
        <>
            <div className="itemButton activate" onClick={() => setModalShow(true)}>
                <p>ACTIVATE</p>
            </div>
            <Modal show={modalShow} className="itemModal activateModal">

                <Modal.Header className="modalHeader">
                    <Modal.Title>Activate Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    You are about to activate <span className="modalSpan"> {props.itemName} </span>
                </Modal.Body>

                <Modal.Footer>
                    <div variant="secondary" className="modalButton" onClick={() => { activationRedirect(props.itemType); setModalShow(false)}}>
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


export default ActivateItemModal;