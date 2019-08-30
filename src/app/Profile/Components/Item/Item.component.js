import React, { Component } from 'react'

import "./Item.style.scss";

export class Item extends Component {

    constructor() {
        super();

        this.state = {
            isHovered : false,
            hoveredButton:""
        }
    }

<<<<<<< HEAD
=======
    toggleHover(state){
        this.setState({'isHovered':!this.state.isHovered});
    }

>>>>>>> b0db9ab52fa1db72a4c4999b423eaced3f52c6d7
    switchHoverInfo(hoveredButton) {
    
        switch(hoveredButton) {
            case 'activate':
                return( 
                    <div className="hoverText">
                        <p>Activate price</p>
                        <p>{this.props.itemActivatePrice} Tokens</p>
                    </div>
                );
            case 'gift':
                return( 
                    <div className="hoverText">
                        <p>Gifting is</p>
                        <p>free :D</p>
                    </div>
                );
            case 'disenchant':
                return( 
                    <div className="hoverText">
                        <p>Disenchant value</p>
                        <p>{this.props.itemDisenchantValue} Tokens</p>
                    </div>
                );
            default:
                    return( 
                        <div className="hoverText">
                        <p>.</p>
                        <p>.</p>
                        </div>
                    );
      }

    }
   
    
    render() {

        const isHovered = this.state.isHovered;
        const hoveredButton = this.state.hoveredButton;

        return (
        
<<<<<<< HEAD
            <div className="item-card" style={{background:this.props.background}} onMouseEnter = {()=>this.setState({'isHovered':true})} onMouseLeave = {()=>this.setState({'isHovered':false})}>
=======
            <div className="item-card" style={{background:this.props.background}} onMouseEnter = {()=>this.toggleHover(this.state)} onMouseLeave = {()=>this.toggleHover(this.state)}>
>>>>>>> b0db9ab52fa1db72a4c4999b423eaced3f52c6d7
            { !isHovered ? (
                <div>
                    <p className="itemCategory">{this.props.itemCategory}</p>
                    <i className={this.props.itemIcon}></i>
                    <p className="itemName">{this.props.itemName}</p>
                    <p className="itemValue">{this.props.itemValue} Tokens</p>
                    <p className="itemType">{this.props.itemType}</p>
                </div>
                ) : (
                    
                    <div className="hoveredState">
                        <div 
                            className="editProfileButton" 
                            onMouseEnter = {()=>this.setState({"hoveredButton":"activate"})} 
                            onMouseLeave = {()=>this.setState({"hoveredButton":""})}
                            onClick = {() => {this.props.disenchantItem(this.props.itemId); this.setState({"isHovered":true}); }}
                        >    
                            <p>ACTIVATE</p>
                        </div>
                        <div 
                            className="editProfileButton" 
                            onMouseEnter = {()=>this.setState({"hoveredButton":"gift"})} 
                            onMouseLeave = {()=>this.setState({"hoveredButton":""})}
                        >    
                            <p>GIFT</p>
                        </div>
                        <div 
                            className="editProfileButton" 
                            onMouseEnter = {()=>this.setState({"hoveredButton":"disenchant"})} 
                            onMouseLeave = {()=>this.setState({"hoveredButton":""})}
                            onClick = {() => {this.props.disenchantItem(this.props.itemId)}}
                        >    
                            <p>DISENCHANT</p>
                        </div>
<<<<<<< HEAD
                        {this.switchHoverInfo(hoveredButton)}
                    </div>
                )}
=======
                    </div>
                )}

                {this.switchHoverInfo(hoveredButton)}
                    
>>>>>>> b0db9ab52fa1db72a4c4999b423eaced3f52c6d7
            </div>
        )
    }
};

export default Item;
