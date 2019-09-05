import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';


import "./Item.style.scss";

export function Item(props){
    
    const [modalState,setModalShow] = useState(false);
    const [modalType,setModalType] = useState("");
    const [hoveredInfoText,setHoverText] = useState("Name");
    const [hoveredTokenValue,setHoverTokenValue] = useState("Token Value");

    const changeHeader = category => {
        if(category==="Badge" || category==="Games" || category==="Skin")
            setModalType("Activate");
        else if(category==="Merch")
            setModalType("Purchasse");
    }

    const updatePrice = category => {
        if(category==="Badge" || category==="Games" || category==="Skin")
            setHoverTokenValue(props.itemActivateValue+" Tokens");
        else if(category==="Merch")
            setHoverTokenValue(props.itemValue+" Tokens");
    }

        
    return (
    
        <div className="itemCard" style={{background:props.background}}>

            <p className="itemCategory">{props.itemCategory}</p>
            
            <i className={props.itemIcon}></i>

            <div className="itemDetails">
                <p className="itemName">{props.itemName}</p>
                <p className="itemValue">{props.itemValue} Tokens</p>
                <p className="itemType">{props.itemType}</p>
            </div>

            <div className="hovered" onMouseEnter={()=>changeHeader(props.itemCategory)}>

                <div className="buttons">
                    <div className="itemButton activate" onClick={()=> setModalShow(true)} onMouseEnter={()=>{setHoverText(modalType);updatePrice(props.itemCategory)}}>    
                        <p>{modalType}</p>
                    </div>

                    <div className="itemButton gift" onClick={()=> setModalShow(true)} onMouseEnter={()=>{setHoverText("Gifting is free"); setHoverTokenValue("Click to select user !")}}>    
                        <p>GIFT</p>
                    </div>

                    <div className="itemButton activate" onClick={()=> setModalShow(true)} onMouseEnter={()=>{setHoverText("Disenchant value"); setHoverTokenValue(props.itemDisenchantValue+" Tokens")}}>                             
                        <p>DISENCHANT</p>
                    </div>
                </div>

                <div className="hoveredInfo">
                    <p className="infoText">{hoveredInfoText}</p>
                    <p className="tokenValue">{hoveredTokenValue}</p>
                </div>

                <Modal show={modalState} className="itemModal">
                        
                        <Modal.Header className="modalHeader">
                        <Modal.Title>{modalType} Item</Modal.Title>
                        </Modal.Header>
                        
                        <Modal.Body>You are about to {modalType.toLowerCase()} <span className="modalSpan"> {props.itemName}</span> for <span className="modalSpan">{hoveredTokenValue} </span> Tokens </Modal.Body>
                            <Modal.Footer>
                            <div variant="secondary" className = "modalButton" onClick={() => {props.disenchantItem(props.itemId)}}>
                                <p>ACCEPT</p>
                            </div>
                            <div variant="primary" className = "modalButton" onClick={() => setModalShow(false)}>
                                <p>CANCEL</p>
                            </div>
                        </Modal.Footer>
                    
                </Modal>


            </div>
        
        </div>

    )

}


export default Item;
