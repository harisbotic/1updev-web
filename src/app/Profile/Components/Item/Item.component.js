import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import "./Item.style.scss";

export class Item extends Component {

    constructor() {
        super();

        this.state = {
            
            modalShow:false,
            modalType:"",
            hoveredInfoText:"Name",
            hoveredTokenValue:"Token Value"

        }
    }
   
    changeHeader = category => {
        if(category=="Badge" || category=="Games" || category=="Skin")
            this.setState({"modalType":"Activate"});
        else if(category=="Merch")
            this.setState({"modalType":"Purchase"});
    }

    updatePrice = category => {
        if(category=="Badge" || category=="Games" || category=="Skin")
            this.setState({"hoveredTokenValue":this.props.itemActivateValue+" Tokens"});
        else if(category=="Merch")
            this.setState({"hoveredTokenValue":this.props.itemValue+" Tokens"});
    }

    render() {

        
        return (
        
            <div className="itemCard" style={{background:this.props.background}}>

                <p className="itemCategory">{this.props.itemCategory}</p>
                
                <i className={this.props.itemIcon}></i>

                <div className="itemDetails">
                    <p className="itemName">{this.props.itemName}</p>
                    <p className="itemValue">{this.props.itemValue} Tokens</p>
                    <p className="itemType">{this.props.itemType}</p>
                </div>

                <div className="hovered" onMouseEnter={()=>this.changeHeader(this.props.itemCategory)}>

                    <div className="buttons">
                        <div className="itemButton activate" onClick={()=>this.setState({"modalShow":true})} onMouseEnter={()=>{this.setState({"hoveredInfoText":this.state.modalType+" value"});this.updatePrice(this.props.itemCategory)}}>    
                            <p>{this.state.modalType}</p>
                        </div>

                        <div className="itemButton gift" onClick={()=>this.setState({"modalShow":true,"modalType":"Gift"})} onMouseEnter={()=>this.setState({"hoveredInfoText":"Gifting is free","hoveredTokenValue":"Click to select user"})}>    
                            <p>GIFT</p>
                        </div>

                        <div className="itemButton activate" onClick={()=>this.setState({"modalShow":true,"modalType":"Disenchant"})} onMouseEnter={()=>this.setState({"hoveredInfoText":"Disenchant value","hoveredTokenValue":this.props.itemDisenchantValue+" Tokens"})}>                             
                            <p>DISENCHANT</p>
                        </div>
                    </div>

                    <div className="hoveredInfo">
                        <p className="infoText">{this.state.hoveredInfoText}</p>
                        <p className="tokenValue">{this.state.hoveredTokenValue}</p>
                    </div>

                    <Modal show={this.state.modalShow} className="itemModal">
                            
                            <Modal.Header className="modalHeader">
                            <Modal.Title>{this.state.modalType} Item</Modal.Title>
                            </Modal.Header>
                            
                            <Modal.Body>You are about to {this.state.modalType.toLowerCase()} <span className="modalSpan"> {this.props.itemName}</span> for <span className="modalSpan">{this.state.hoveredTokenValue} </span> Tokens </Modal.Body>
                                <Modal.Footer>
                                <div variant="secondary" className = "modalButton" onClick={() => {this.props.disenchantItem(this.props.itemId)}}>
                                    <p>ACCEPT</p>
                                </div>
                                <div variant="primary" className = "modalButton" onClick={()=>this.setState({"modalShow":false})}>
                                    <p>CANCLE</p>
                                </div>
                            </Modal.Footer>
                        
                    </Modal>


                </div>
            
            </div>

        )

    }

};

export default Item;
