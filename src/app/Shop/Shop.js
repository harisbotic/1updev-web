import React, { useState, useEffect } from "react";
import { shop } from "../../api/index";

import ShopItem from '../../Components/ShopItem/ShopItem';
import TransactionLog from "../../Components/TransactionLog/Transactionlog.component";
import BadgesInUse from "../../Components/BadgesInUse/badges-in-use";
import SkinInUse from "../../Components/SkinInUse/skin-in-use";
import SpinTheWheelModal from "../../Components/SpinTheWheelModal/SpinTheWheelModal";
import BuyItemModal from '../../Components/BuyItemModal/BuyItemModal';
import AddItem from "../../Components/AddItem/AddItem";

import "./Shop.scss";

export const Shop = () => {

  const [stateChange, rerenderShop] = useState(false);
  const [shopItems, setShopItems] = useState({
    allShopItems: []
  });

  const [filter, setFilter] = useState({
    filteredList: []
  });

  useEffect(() => {
    const fetchData = async () => {

      const shopItemsResponse = await shop.shopItems.get();

      setShopItems({
        allShopItems: shopItemsResponse.data
      });
      setFilter({
        filteredList: shopItemsResponse.data
      });
    };

    fetchData();
  }, [stateChange]);


  const submitEditForm = async (id, body) => {

    await shop.editShopItem.update(id, body);

  }

  const searchFilter = searchText => {
    setFilter({
      filteredList: filter.filteredList.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      )
    });
  };

  return (
    <>
      <div>

        {/* { Item item = shopItems.allShopItems.Where( x=>x.id == 1 ).SingleOrDefault();}; */}

        <SpinTheWheelModal />
        {/* <EditItem /> */}
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
                <span className="token-count"> 455</span>
              </div>
              <div className="items-own col-xs-6">
                ITEMS OWN:
                <span className="own-count"> 22</span>
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
            <div className="filterOptionsContainer">
              <div className="filterOptions">
                <p id="filter">
                  Filter<i className="fas fa-chevron-up"></i>
                </p>
                <p id="sortByName">
                  Sort by name<i className="fas fa-chevron-up"></i>
                </p>
                <p id="sortByValue">
                  Sort by value<i className="fas fa-chevron-up"></i>
                </p>

                <p id="sortByCategory">
                  Sort by category<i className="fas fa-chevron-up"></i>
                </p>

                <div className="searchBoxComponent">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    name="search"
                    className="searchBox"
                    onChange={e => searchFilter(e.target.value)}
                    placeholder="Search items..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="itemsContainer">
            <div className="item-card xs-column" id="add">
              <AddItem
                rerender={rerenderShop}
                stateChange={stateChange}
              />

            </div>

            {shopItems.allShopItems.map((item, value) => {
              return (
                <div>
                  <ShopItem
                    key={value}
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
