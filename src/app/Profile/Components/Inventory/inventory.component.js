import React, { Component } from 'react'
import Item from '../Item/Item.component.js'

import './inventory.style.scss';

export class Inventory extends Component {
    render() {
        return (
            <div>
                <Item/>
            </div>
        )
    }
}

export default Inventory;
