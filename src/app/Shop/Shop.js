import React, { useState, useEffect } from "react";
import { shop } from "../../api/index";
import ShopItem from '../../Components/ShopItem/ShopItem';
import TransactionLog from "../../Components/TransactionLog/Transactionlog.component";
import BadgesInUse from "../../Components/BadgesInUse/badges-in-use";
import SkinInUse from "../../Components/SkinInUse/skin-in-use";
import AddItem from "../../Components/AddItem/AddItem";
import {FilterOptions,FilterOptionsMobile} from '../../Components/FilterOptions/FilterOptions.component';


import "./Shop.scss";

export const Shop = () => {

  const [stateChange, rerenderShop] = useState(false);
  const [shopItems, setShopItems] = useState({
    allShopItems: []
  });
  const [addItemModalShow, setAddItemModalShow] = useState("none");
  const handleShow = () => setAddItemModalShow("flex");
  const[userTokens,setUserTokens] = useState();
  const[userItems,setUserItems] = useState();


  useEffect(() => {
    const fetchData = async () => {
      
      const shopItemsResponse = await shop.shopItems.get();

      setShopItems({
        allShopItems: shopItemsResponse.data
      });    

      const fetchAvailableTokens = await shop.fetchAvailableTokens.get();
      setUserTokens( fetchAvailableTokens.data );

      const fetchUserItems = await shop.fetchUserItems.get();
      setUserItems( fetchUserItems.data );

    }

    fetchData();
  }, [stateChange]);


  const submitEditForm = async (id, body) => {

    await shop.editShopItem.update(id, body);

  }

  const submitAddForm = async (event, body) => {
    event.preventDefault();

    await shop.addShopItem.post(body);

    rerenderShop(!stateChange);
  }

  const categoryFilter = async (sort, isAscending) => {
    const order = isAscending === true ? "asc" : "desc";

    const fetchSortedShopItems = await shop.fetchSortedShopItems.get(
      sort,
      order
    );
    setShopItems({
      allShopItems: fetchSortedShopItems.data
    })
  };

  const searchFilter = async searchText => {

    if (searchText === "") searchText = " ";

    const searchShopItem = await shop.searchShopItem.get(
      searchText
    );

    setShopItems({
      allShopItems: searchShopItem.data
    })
  };
  const deleteShopItem = async (id) => {

    await shop.deleteShopItem.remove(id);

  }


  return (
    <>
      <AddItem
        modalShow={addItemModalShow}
        modalClose={setAddItemModalShow}
        submitAddForm={submitAddForm}
      />
      <div className="shop">
        {/* <SpinTheWheelModal /> */}
        <div className="shop-header row xs-column">
          <div className="in_use col-12 col-lg-6">
            <div className="row">
              <div className="col-9 col-lg-9 no-padding">
                <BadgesInUse />
              </div>
              <div className="col-3 col-lg-3">
                <SkinInUse />
              </div>
            </div>

            <div className="row tokens_and_items">
              <div className="available-tokens col-6 col-lg-12 col-md-12">
                <p>AVAILABLE TOKENS : </p>
                <span className="token-count">   {userTokens}</span>
              </div>
              <div className="items-own col-6 col-lg-12 col-md-12">
                <p>ITEM COUNT:</p>
                <span className="own-count"> {userItems} </span>
              </div>
            </div>
          </div>
          <div className="transaction_log col-lg-6 col-sm-12">
            <TransactionLog />
          </div>
        </div>

        <div className="shopContainer">
          <div className="infoSection">
            <div className="infoText">
              <p className="shopText">Shop</p>
            </div>
            <FilterOptions
                className='filterOptionsDesktop'
                searchFilter={searchFilter}
                categoryFilter={categoryFilter}
            />
            <FilterOptionsMobile
                className='filterOptionsMobile'
                searchFilter={searchFilter}
                categoryFilter={categoryFilter}
            />
            {
            }

          </div>
          <div className="itemsContainer">
            <div className="item-card xs-column" id="add" onClick={() => handleShow()}>
              <i className="fas fa-plus"></i>
            </div>

            {shopItems.allShopItems.map((item, value) => {
              return (
                <div key={value}>
                  <ShopItem
                    id={item.id}
                    itemQuantity={item.quantity}
                    itemId={item.itemId}
                    background={item.rarity.background}
                    itemIcon={item.image}
                    itemName={item.name}
                    itemPrice={item.price}
                    itemValue={item.value}
                    itemType={item.type.name}
                    itemTypeId={item.type.id}
                    itemRarity={item.rarity.name}
                    itemRarityId={item.rarity.id}
                    itemActivateValue={item.activatePrice}
                    itemDisenchantValue={item.disenchantValue}
                    submitEditForm={submitEditForm}
                    deleteItem={deleteShopItem}
                    showModal={"flex"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
