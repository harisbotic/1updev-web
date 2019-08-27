import React, { Component } from 'react'
import Item from '../Item/Item.component.js'

import './inventory.style.scss';


export class Inventory extends Component {
    
    constructor() {
        super();

        this.state = {
            'searchField':""
        }
    }

    render() {
        
        const searchField = this.state.searchField;
        const itemList = this.props.itemList.items;

        const filteredList = itemList.filter(item =>
            item.name.toLowerCase().includes(searchField.toLowerCase()));
            
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
                        <p>Sort by Name <i className="fas fa-caret-down"></i></p>
                        <p>Sort by Price<i className="fas fa-caret-down"></i></p>     
                        <p>Sort by Category <i className="fas fa-caret-down"></i></p>
                        <input 
                        type="search" 
                        placeholder="Search inventory..." 
                        id="searchInventory"
                        onChange={e => {
                            this.setState({'searchField':e.target.value})
                        }}/>    
                        </div>
                </div>
                <div className="itemsContainer">
                {
                    filteredList.map((v)=> {

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
