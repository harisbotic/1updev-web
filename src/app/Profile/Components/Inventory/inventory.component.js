import React, { Component } from 'react'
import Item from '../Item/Item.component.js'

import './inventory.style.scss';

export class Inventory extends Component {
    render() {
        return (
            <div className="inventoryContainer">
                <div className="filterSectiobn"></div>
                <h1>
                    <span className="inventoryText">Inventory</span>
                    <span className="inventoryValue">(INVENTORY VALUE:
                        <span className="tokenValue">1250</span> Tokens)
                    </span>
                </h1>
                <div className="itemsContainer">
                    <Item />
                    <Item />
                    <Item />
                </div>
            </div>
        )
    }
}

export default Inventory;
