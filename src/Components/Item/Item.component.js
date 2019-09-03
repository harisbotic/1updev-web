import React, { Component } from 'react'

import "./Item.style.scss";

export class Item extends Component {

    constructor() {
        super();

        this.state = {
            isHovered : false
        }
    }

    toggleHover(state){
        this.setState({'isHovered':!this.state.isHovered});
    }
   

      
    render() {
        return (
        
            <div className="item-card xs-column" style={{background:this.props.background}} onMouseEnter = {()=>this.toggleHover(this.state)} onMouseLeave = {()=>this.toggleHover(this.state)}>
                <p className="itemCategory">{this.props.itemCategory}</p>
                <i className={this.props.itemIcon}></i>
                <p className="itemName">{this.props.itemName}</p>
                <p className="itemValue">{this.props.itemValue} Tokens</p>
                <p className="itemType">{this.props.itemType}</p>
            </div>
        )
    }
};

export default Item;
