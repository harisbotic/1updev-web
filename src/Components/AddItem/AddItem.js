import React, { useState, useEffect } from "react";
import { shop } from "../../api/index";

import "./AddItem.scss";

function AddItem(props) {

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

  const handleClose = () => { props.modalClose("none") };

  useEffect(() => {
    const fetchData = async () => {

      const itemTypesResponse = await shop.itemTypes.get();
      const itemRaritiesResponse = await shop.itemRarities.get();

      setItemTypesAndRarities({
        allItemTypes: itemTypesResponse.data,
        allItemRarities: itemRaritiesResponse.data
      });

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
  }

  return (
    <>
      <div className="addItem" style={{ display: props.modalShow }}>
        <div className="addItemModal">
          <form className="addItemForm" id="addItemForm" onSubmit={(e) => {
            props.submitAddForm(e, addItem); props.modalClose("none"); setAddItem({
              image: "", name: "", price: 0, quantity: 0, value: 0, typeId: 0, rarityId: 0
            })
          }}>
            <div className="addItemFormLeft">
              <label>
                <div className="addImage"><p>Add Image</p>
                  <input type="text" name="image" value={image}
                    onChange={(e) => { handleChange(e) }} />
                </div>
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
                <button onClick={() => props.modalClose("none")} className="cancelFormButton"><p>CANCEL</p></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default AddItem;
