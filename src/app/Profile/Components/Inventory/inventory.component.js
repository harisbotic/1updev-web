import React, { Component } from 'react'
import Item from '../Item/Item.component.js'

import './inventory.style.scss';


export class Inventory extends Component {
    
    render() {
        return (
            <div className="inventoryContainer">
                <div className="infoSection">
                    <h1 className="heading">
                        <span className="inventoryText">Inventory</span>
                        <span className="inventoryValue">(INVENTORY VALUE:
                            <span className="tokenValue"> 1250</span> Tokens)
                        </span>
                    </h1>
                    <div className="filterOptions">
                    <p>Filter</p>
                    <i className="fas fa-caret-down"></i>
                    <p>Sort by Name</p>
                    <i className="fas fa-caret-down"></i>
                    <p>Sort by Price</p>
                    <i className="fas fa-caret-down"></i>
                    <p>Sort by Category</p>
                    <i className="fas fa-caret-down"></i>
                    <div className="SearchComponent"></div>
                    </div>
                </div>
                <div className="itemsContainer">
                {
                    this.props.itemList.items.map((v)=> {

                    return(
                        <Item 
                            key = {v.id}
                            background = {v.background} 
                            itemCategory = {v.category}
                            itemIcon = {v.icon} 
                            itemName = {v.name} 
                            itemValue = {v.value} 
                            itemType = {v.type}
                        />
    
                    )
                    
                    })
                }
                </div>
            </div>
        )
    }
}

export default Inventory;
