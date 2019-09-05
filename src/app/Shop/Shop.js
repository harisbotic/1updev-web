import React, { useEffect, useState, Component } from "react";
import {
  Button,
  ButtonToolbar,
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Card
} from "react-bootstrap";
import "./Shop.scss";
import AddItem from '../../Components/AddItem/AddItem';
import Item from "../../Components/Item/Item.component";
import jsonItemList from "./list.json";
import TransactionLog from '../../Components/TransactionLog/Transactionlog.component';
import BadgesInUse from "../../Components/BadgesInUse/badges-in-use";
import SkinInUse from "../../Components/SkinInUse/skin-in-use";

// const [modalShow, setModalShow] = useState(false);

export class Shop extends Component {
  constructor() {
    super();
    this.state = {
      itemList: jsonItemList,
      searchField: ""
    };
  }
  
  render() {
    const searchField = this.state.searchField;
    const itemList = this.state.itemList.items;
    const filteredList = itemList.filter(item =>
      item.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div>
      <div className='shop-header row xs-column'>
          <div className='in_use col-xs-12 col-lg-6 row'>
              <div className='row'>
              <div className='col-9'><BadgesInUse /></div>
              <div className='col-3'><SkinInUse /></div>
              </div>
             
                    <div className='row tmp'>
                    <div className="available-tokens col-xs-6">
                      AVAILABLE TOKENS:
                      <span className="token-count">455</span>
                    </div>
                    <div className="items-own col-xs-6">
                      ITEMS OWN:
                      <span className="own-count">22</span>
                    </div>
                    </div>
                    
          </div>
           <div className='transaction_log col-lg-6 col-sm-12'> 
              <TransactionLog />
           </div>
      </div>

<div className="inventoryContainer xs-column">
<div className="infoSection xs-column">
  <h1 className="heading">
    <span className="inventoryText">Inventory</span>
    <span className="inventoryValue xs-column">
      (INVENTORY VALUE:
      <span className="tokenValue"> 1250</span> Tokens)
    </span>
  </h1>
  <div className="filterOptions xs-column">
    <p>
      Sort by Name <i className="fas fa-caret-down"></i>
    </p>
    <p>
      Sort by Price<i className="fas fa-caret-down"></i>
    </p>
    <p>
      Sort by Category <i className="fas fa-caret-down"></i>
    </p>
    <input
      type="search"
      placeholder="Search inventory..."
      id="searchInventory"
      onChange={e => {
        this.setState({ searchField: e.target.value });
      }}
    />
  </div>
</div>
<div className="itemsContainer row xs-column">
  {filteredList.map(v => {
    return (
      <Item
        key={v.id}
        background={v.background}
        itemCategory={v.category}
        itemIcon={v.icon}
        itemName={v.name}
        itemValue={v.value}
        itemType={v.type}
      />
    );
  })}
</div>
</div>
</div>
      );
  }
}
export default Shop;
