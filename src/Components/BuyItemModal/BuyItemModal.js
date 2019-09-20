import React, { useState,useEffect } from 'react';
import { Button,Modal } from 'react-bootstrap';
import { BASE_URL, getHeaders, tokenRefreshHandler } from '../../api/shared';
import customAxios from '../../api/customAxios';

import './BuyItemModal.scss';
import itemList from '../../app/Shop/list.json';
// import BuyItem from '../../api/shop';
import {shop} from '../../api/index';

import Axios from 'axios';
import ShopItem from '../ShopItem/ShopItem';



export const BuyItemModal = (props) => {
    // console.log( props.itemId );
     console.log( props );
    const [show, setShow] = useState(false);
    const [insufficientTokens, setInsufficientTokens] = useState( "none" );
    const handleClose = () =>{
      setInsufficientTokens("none");
      setShow(false);
    } 
    const handleShow = () => setShow(true);
    const closeTokens =() => setInsufficientTokens("none");

   
     /* const confirmPurchase = () =>{ 
        setShow(false);
        BuyItem(  )
      }*/
      // useEffect(() => {
        const confirmPurchase =  async() =>{
          const BuyItem = await shop.BuyItem.post( props.itemId
        );
          if( BuyItem.data == false ){
            setInsufficientTokens("block");
            //return false;
            console.log( "Not enough money" );
            // <p> Not enough money </p>
          }
          else{
            setInsufficientTokens("none");
            setShow(false);
          }
          //return true;
        //setShow(false);
        }
      // }, []);
      
      return (
        <>
          <Button variant="primary" onClick={handleShow}>
            Launch Buy Modal
          </Button>
    
          <Modal show={show} onHide={handleClose}>

            <Modal.Body>        
              <div className='row tmp'>
                <div className='col-6'>
              <ShopItem
              itemId={props.itemId}
              background={props.background}
              itemIcon={props.itemIcon}
              itemName={props.itemName}
              itemPrice={props.itemPrice}
              itemValue={props.itemValue}
              itemType={props.itemValue}
              itemRarity={props.itemRarity}
              itemActivateValue={props.itemActivateValue}
              itemDisenchantValue={props.itemDisenchantValue}
              />
              </div>
              {/* <p className='confirmation-text col-7'>Are u sure u want to <b>buy</b> this item?</p> */}
              <div className='col-6'>
              <div className='confirmation-text '>Are u sure u want to <b>buy</b> this item?</div>
              </div>
              </div>
              
            </Modal.Body>
    
            <Modal.Footer>
              
              {/* <Button variant="secondary" onClick={confirmPurchase(props.itemId)} className='yes-button'> */}
              <p className='col-6' style={{ display: insufficientTokens }} > You don't have enough money </p>
                       
              <Button 
              variant="primary" 
              onClick={() =>  {
                confirmPurchase();
                closeTokens();
               // setInsufficientTokens("none");
             //   setShow(false);
               }}
              className='yes-button col-3'>
              <div className='col-12'>Yes</div>  
              </Button>
              
              <Button variant="primary" onClick={handleClose} className='no-button col-3'>
              <div className='col-12'>No</div>
              </Button>
              
            </Modal.Footer>
          </Modal>
        </>
      );
    };

  
  

export default BuyItemModal;