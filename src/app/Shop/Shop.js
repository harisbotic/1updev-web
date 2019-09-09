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
import Item from "../../Components/Item/Item.component";
import jsonItemList from "./list.json";
import TransactionLog from "../../Components/TransactionLog/Transactionlog.component";
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
        <div className="shop-header row xs-column">
          <div className="in_use col-xs-12 col-lg-6 row">
            <div className="row">
              <div className="col-9">
                <BadgesInUse />
              </div>
              <div className="col-3">
                <SkinInUse />
              </div>
            </div>

            <div className="row tmp">
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
          <div className="transaction_log col-lg-6 col-sm-12">
            <TransactionLog />
          </div>
        </div>

        <div className="inventoryContainer">
          <div className="infoSection">
            <div className="infoText">
              <p className="shopText">Shop</p>
            </div>
            <div className="filterOptionsContainer">
              <div className="filterOptionsDesktop">
                <div className="filterOptions">
                  <p>FILTER</p>
                  <p id="sortByName">Name</p>
                  <i className="fas fa-caret-down"></i>
                  <p id="sortByValue">Value</p>
                  <i className="fas fa-caret-up"></i>
                  <p id="sortByCategory">Category</p>
                  <i className="fas fa-caret-up"></i>

                  <div className="searchBoxComponent">
                    <i className="fas fa-search"></i>
                    <input
                      type="text"
                      name="search"
                      className="searchBox"
                      onChange={e => {
                        this.setState({ searchField: e.target.value });
                      }}
                      placeholder="Search items..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="itemsContainer">
            {filteredList.map(item => {
              return (
                <Item
                  key={item.id}
                  itemId={item.id}
                  background={item.background}
                  itemCategory={item.category}
                  itemIcon={item.icon}
                  itemName={item.name}
                  itemValue={item.value}
                  itemType={item.type}
                  itemActivateValue={item.activatePrice}
                  itemDisenchantValue={item.disenchantValue}
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
