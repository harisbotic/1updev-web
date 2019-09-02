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
    return (
      <div className='shop-header row xs-column'>
          <div className='in_use col-6 row xs-column'>
             <div className='col-9'><BadgesInUse /></div>
             <div className='col-3'><SkinInUse /></div>
                    <div className="available-tokens">
                      AVAILABLE TOKENS:
                      <span className="token-count">455</span>
                    </div>
                    <div className="items-own">
                      ITEMS OWN:
                      <span className="own-count">22</span>
                    </div>
          </div>
           <div className='transaction_log'> 
              <TransactionLog />
           </div>
          </div>
      );
  }
}
export default Shop;
