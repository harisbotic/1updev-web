import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { shop } from '../../api/index';

import './SpinTheWheelModal.scss';
import { SpinTheWheelItem } from '../SpinTheWheelItem/SpinTheWheelItem';

export function SpinTheWheelModal() {

  const [modalState, setModalState] = useState("none");
  const [wheelItems, setWheelItems] = useState({
    allSpinTheWheelItems: []
  });

  const handleClose = () => setModalState("none");
  const handleShow = () => setModalState("block");

  useEffect(() => {

    const fetchData = async () => {

      const spinTheWheelResponse = await shop.spinTheWheelItems.get;

      setWheelItems({
        allSpinTheWheelItems: spinTheWheelResponse.data
      });

      console.log(spinTheWheelResponse.data);
    }
    fetchData();
  }, []);

  const { allSpinTheWheelItems } = wheelItems;

  const lastItemIndex = allSpinTheWheelItems.length - 1;

  return (
    <>
      <Button variant="primary" onClick={() => handleShow()}>
        Launch modal
      </Button>

      <div className="spin_the_wheel_modal" style={{ display: modalState }}>
        <div className="wheel_container">
          {allSpinTheWheelItems && allSpinTheWheelItems.length
            ? allSpinTheWheelItems.map((item, index) => {
              return (
                <SpinTheWheelItem
                  key={index}
                  id={item.id}
                  background={item.background}
                  itemIcon={item.icon}
                  itemType={item.category}
                  itemName={item.name}
                  itemValue={item.value}
                  itemRarity="epic"
                />
              );
            })
            : "..."}
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
              <p className="contentText1">You have won the <span className="bold">{allSpinTheWheelItems && allSpinTheWheelItems.length
                ? allSpinTheWheelItems[lastItemIndex].name : "..."}</span></p>
              <p className="contentText2">Item value: <span className="bold">{allSpinTheWheelItems && allSpinTheWheelItems.length
                ? allSpinTheWheelItems[lastItemIndex].price : "..."}</span> Tokens</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpinTheWheelModal;