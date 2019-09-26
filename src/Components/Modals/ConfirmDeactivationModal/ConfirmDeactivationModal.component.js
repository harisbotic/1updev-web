import React,{useState} from 'react'
import Modal from 'react-bootstrap/Modal';

import './ConfirmDeactivationModal.style.scss';

export default function ConfirmDeactivationModal(props) {
    
    const [isModalVisible,setModalVisible]=useState(false);
    
    const {
        item,
        deactivateBadge,
        closeInitialModal
    } = props;

    return (
        <div className="confirmDeactivationModal">

            <div className = "modalButton actionButton" onClick={()=>{setModalVisible(true)}}>
                <p>DEACTIVATE</p>
            </div>

            <Modal show={isModalVisible} className="badgeModal">
                                
                <Modal.Header>
                    <Modal.Title>Confirm Deactivation</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    You are about to deactive your badge <span className="bold">{item.name}</span>
                    <br/>Note that this badge will go back to your inventory and you can activate it again whenever you want !
                    <br/>
                </Modal.Body>
                    
                <Modal.Footer>
                <div className = "modalButton closeButton" onClick={()=>{setModalVisible(false); deactivateBadge(item.id)}}>
                        <p>ACCEPT</p>
                    </div>
                    <div className = "modalButton closeButton" onClick={()=>setModalVisible(false)} >
                        <p>CLOSE</p>
                    </div>
                </Modal.Footer>
                
            </Modal>
        </div>
    )
}
