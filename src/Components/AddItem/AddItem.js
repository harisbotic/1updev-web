import React, { useState, useEffect } from "react";
import { shop } from "../../api/index";

import "./AddItem.scss";

function AddItem(props) {

  const [modalShowState, setModalShowState] = useState("none");
  const [itemTypesAndRarities, setItemTypesAndRarities] = useState({
    allItemTypes: [],
    allItemRarities: []
  });

  const [addItem, setAddItem] = useState({
    image: "",
    name: "",
    price: 0,
    quantity: 0,
    value: 0,
    typeId: 0,
    rarityId: 0
  });

  const handleClose = () => setModalShowState("none");
  const handleShow = () => setModalShowState("block");

  useEffect(() => {
    const fetchData = async () => {

      const itemTypesResponse = await shop.itemTypes.get();
      const itemRaritiesResponse = await shop.itemRarities.get();

      setItemTypesAndRarities({
        allItemTypes: itemTypesResponse.data,
        allItemRarities: itemRaritiesResponse.data
      });

      console.log(itemTypesResponse.data);
      console.log(itemRaritiesResponse.data);
    };

    fetchData();
  }, []);

  const {
    allItemRarities,
    allItemTypes
  } = itemTypesAndRarities;

  const {
    image,
    name,
    price,
    value,
    quantity,
    typeId,
    rarityId
  } = addItem;


  var typeOptions = allItemTypes.map((type) => {
    return <option key={`option_${type.id}`} value={type.id}>{type.name}</option>;
  });

  var rarityOptions = allItemRarities.map((rarity) => {
    return <option key={`option_${rarity.id}`} value={rarity.id}>{rarity.name}</option>;
  });


  const handleChange = (event) => {
    event.persist();
    setAddItem(addItem => ({
      ...addItem,
      [event.target.name]: event.target.value
    }));
    console.log(addItem);
  }


  const submitForm = async event => {
    event.preventDefault();

    await shop.addShopItem.post(addItem);

    props.rerender(!props.stateChange);
    handleClose();
  }

  return (
    <>
      <i className="fas fa-plus" onClick={() => handleShow()}></i>
      <div className="addItem" style={{ display: modalShowState }}>
        <div className="addItemModal">
          <form className="addItemForm" id="addItemForm" onSubmit={(e) => { submitForm(e); }}>
            <div className="addItemFormLeft">
              <label>Add image:
              <input type="text" name="image" value={image}
                  onChange={(e) => { handleChange(e) }} />
              </label>
            </div>
            <div className="addItemFormRight">
              <div className="formText">
                <label>Item name:
                <input type="text" name="name" value={name}
                    onChange={(e) => { handleChange(e) }}
                    required />
                </label><br />
                <label>Item price:
                <input type="number" name="price" value={price}
                    onChange={(e) => { handleChange(e) }}
                    required />
                </label><br />
                <label>Disenchant value:
                <input type="number" name="value" value={value}
                    onChange={(e) => { handleChange(e) }}
                    required
                  />
                </label><br />
                <label>Quantity:
                <input type="number" name="quantity" value={quantity}
                    onChange={(e) => { handleChange(e) }}
                    required />
                </label><br />
                <label>Item type:
                <select name="typeId" onChange={(e) => { handleChange(e) }}>{typeOptions}</select>
                </label><br />
                <label>Item rarity:
                <select name="rarityId" onChange={(e) => { handleChange(e) }} required>{rarityOptions}</select>
                </label>
              </div>
              <div className="formButtons">
                <button type="submit" form="addItemForm" className="addItemFormButton"><p>ADD</p></button>
                <button className="addItemFormButton" onClick={() => handleClose()}><p>CANCEL</p></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default AddItem;
