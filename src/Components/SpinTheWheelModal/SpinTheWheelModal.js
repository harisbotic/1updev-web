import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { shop } from '../../api/index';

import './SpinTheWheelModal.scss';
import { SpinTheWheelItem } from '../SpinTheWheelItem/SpinTheWheelItem';

export function SpinTheWheelModal(props) {

  const [modalState, setModalState] = useState("none");
  const [wheelItems, setWheelItems] = useState({
    allSpinTheWheelItems: []
  });

  const handleClose = () => setModalState("none");
  const handleShow = () => setModalState("block");

  useEffect(() => {

    const fetchData = async () => {

      const spinTheWheelResponse = await shop.spinTheWheelItems.get();

      setWheelItems({
        allSpinTheWheelItems: spinTheWheelResponse.data
      });
    }
    fetchData();
  }, []);

  const { allSpinTheWheelItems } = wheelItems;

  const lastItemIndex = allSpinTheWheelItems.length - 1;

  return (
    <>
      <div variant="primary" className="modalButton" onClick={() => {handleShow();}}>
        <p>SPIN THE WHEEL</p>
      </div>

      <div className="spin_the_wheel_modal" style={{ display: modalState }}>
        <div className="wheel_container">
          {allSpinTheWheelItems && allSpinTheWheelItems.length
            ? allSpinTheWheelItems.map((item, index) => {
              return (
                <SpinTheWheelItem
                  key={index}
                  id={item.id}
                  background={item.rarity.background}
                  itemIcon={item.icon}
                  itemType={item.type.name}
                  itemName={item.name}
                  itemValue={item.value}
                  itemRarity={item.rarity.name}
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
                <div className="continueButton" onClick={() => {handleClose(); props.setModalShow(false)}}>
                  <p className="buttonText">CONTINUE</p>
                </div>
              </div>
              <div className="content">
                <p className="contentText1">You have won the <span className="bold">{allSpinTheWheelItems && allSpinTheWheelItems.length
                  ? allSpinTheWheelItems[lastItemIndex].name : "..."}</span></p>
                <p className="contentText2">Item value: <span className="bold">{allSpinTheWheelItems && allSpinTheWheelItems.length
                  ? allSpinTheWheelItems[lastItemIndex].value : "..."}</span> Tokens</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpinTheWheelModal;