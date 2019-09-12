import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import './SpinTheWheelModal.scss';
import itemList from '../../App/Shop/list.json';
import { SpinTheWheelItem } from '../SpinTheWheelItem/SpinTheWheelItem';

export const SpinTheWheelModal = () => {

  const [modalState, setModalState] = useState("none");
  const [list, setList] = useState(itemList.items);

  const lastItemIndex = itemList.items.length - 1;

  const handleClose = () => setModalState("none");
  const handleShow = () => setModalState("block");

  return (
    <>
      <Button variant="primary" onClick={() => handleShow()}>
        Launch modal
      </Button>

      <div className="modal" style={{ display: modalState }}>
        <div className="wheel_container">
          {list.map((item, index) => {
            return (
              <SpinTheWheelItem
                key={index}
                id={item.id}
                background={item.background}
                itemIcon={item.icon}
                itemType={item.category}
                itemName={item.name}
                itemValue={item.value}
                itemRarity={item.type}
              />
            )
          })
          }
        </div>
        <div className="result_container">
          <i className="fas fa-angle-double-right arrow_pointer"></i>
          <div className="wheel_result">
            <div className="result_info">
              <div className="header">
                <p className="headerText">Congratulations!</p>
                <div className="continueButton" onClick={() => handleClose()}>
                  <p className="buttonText">CONTINUE</p>
                </div>
              </div>
              <p className="contentText1">You have won the <span className="bold">{list[lastItemIndex].name}</span></p>
              <p className="contentText2">Item value: <span className="bold">{list[lastItemIndex].value}</span> Tokens</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}