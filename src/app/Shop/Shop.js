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
import AddItem from "../../Components/AddItem/AddItem";
import Item from "../../Components/Item/Item.component.js";
import jsonItemList from "./list.json";
import TransactionLog from "../../Components/TransactionLog/Transactionlog.component";
import BadgesInUse from "../../Components/BadgesInUse/badges-in-use.jsx";
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
  inventoryDisplay = () => {
    const searchField = this.state.searchField;
    const itemList = this.state.itemList.items;
    const filteredList = itemList.filter(item =>
      item.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="parent-div">
        <div className="shop_header row">
          <div className="in_use col-6">
            <div className="items-in-use">
              <BadgesInUse />
              <SkinInUse />
            </div>
            <div className="available-tokens">
              AVAILABLE TOKENS:
              <span className="token-count">455</span>
            </div>
            <div className="items-own">
              ITEMS OWN:
              <span className="own-count">22</span>
            </div>
          </div>
          <div className="transaction_log col-6">
            <TransactionLog></TransactionLog>
          </div>
        </div>
        <div className="inventoryContainer">
          <div className="infoSection">
            <h1 className="heading">
              <span className="inventoryText">Inventory</span>
              <span className="inventoryValue">
                (INVENTORY VALUE:
                <span className="tokenValue"> 1250</span> Tokens)
              </span>
            </h1>
            <div className="filterOptions">
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
          <div className="itemsContainer">
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
  };
  render() {
    return <div>{this.inventoryDisplay()}</div>;
  }
}
export default Shop;
