import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { shop } from "../../api/index";

import Item from "../../Components/Item/Item.component";
import TransactionLog from "../../Components/TransactionLog/Transactionlog.component";
import BadgesInUse from "../../Components/BadgesInUse/badges-in-use";
import SkinInUse from "../../Components/SkinInUse/skin-in-use";
import SpinTheWheelModal from "../../Components/SpinTheWheelModal/SpinTheWheelModal";

import "./Shop.scss";

import itemsList from "./list.json";

export const Shop = () => {
  const [shopItems, setShopItems] = useState({
    allShopItems: []
  });

  const [filter, setFilter] = useState({
    filteredList: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const shopItemsResponse = await shop.shopItems.get;

      setShopItems({
        allShopItems: shopItemsResponse.data
      });
      setFilter({
        filteredList: shopItemsResponse.data
      });
    };

    fetchData();
  }, []);

  // console.log(filter.filteredList);

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
        <SpinTheWheelModal />
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
              {/* <div className="filterOptionsDesktop"> */}
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
                {/* </div> */}
              </div>
            </div>
          </div>

          <div className="itemsContainer">
            <div className="item-card xs-column" id="add">
              <i className="fas fa-plus"></i>
            </div>
            {shopItems.allShopItems.map((item, index) => {
              return (
                <Item
                  key={index}
                  itemId={item.id}
                  background="#000000"
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
    </>
  );
};

// export class Shop extends Component {
//   constructor() {
//     super();
//     this.state = {
//       itemList: jsons,
//       searchField: ""
//     };
//   }

//   render() {
//     const searchField = this.state.searchField;
//     const itemList = this.state.itemList.items;
//     const filteredList = itemList.filter(item =>
//       item.name.toLowerCase().includes(searchField.toLowerCase())
//     );

//     return (
//       <div>
//         <SpinTheWheelModal />
//         <div className="shop-header row xs-column">
//           <div className="in_use col-xs-12 col-lg-6 row">
//             <div className="row">
//               <div className="col-9">
//                 <BadgesInUse />
//               </div>
//               <div className="col-3">
//                 <SkinInUse />
//               </div>
//             </div>

//             <div className="row tmp">
//               <div className="available-tokens col-xs-6">
//                 AVAILABLE TOKENS:
//                 <span className="token-count">455</span>
//               </div>
//               <div className="items-own col-xs-6">
//                 ITEMS OWN:
//                 <span className="own-count">22</span>
//               </div>
//             </div>
//           </div>
//           <div className="transaction_log col-lg-6 col-sm-12">
//             <TransactionLog />
//           </div>
//         </div>

//         <div className="shopContainer">
//           <div className="infoSection">
//             <div className="infoText">
//               <p className="shopText">Shop</p>
//             </div>
//             <div className="filterOptionsContainer">
//               {/* <div className="filterOptionsDesktop"> */}
//               <div className="filterOptions">
//                 <p id="filter">
//                   Filter<i className="fas fa-chevron-up"></i>
//                 </p>
//                 <p id="sortByName">
//                   Sort by name<i className="fas fa-chevron-up"></i>
//                 </p>
//                 <p id="sortByValue">
//                   Sort by value<i className="fas fa-chevron-up"></i>
//                 </p>

//                 <p id="sortByCategory">
//                   Sort by category<i className="fas fa-chevron-up"></i>
//                 </p>

//                 <div className="searchBoxComponent">
//                   <i className="fas fa-search"></i>
//                   <input
//                     type="text"
//                     name="search"
//                     className="searchBox"
//                     onChange={e => {
//                       this.setState({ searchField: e.target.value });
//                     }}
//                     placeholder="Search items..."
//                   />
//                 </div>
//                 {/* </div> */}
//               </div>
//             </div>
//           </div>

//           <div className="itemsContainer">
//             <div className="item-card xs-column" id="add">
//               <i className="fas fa-plus"></i>
//             </div>
//             {filteredList.map(item => {
//               return (
//                 <Item
//                   key={item.id}
//                   itemId={item.id}
//                   background={item.background}
//                   itemCategory={item.category}
//                   itemIcon={item.icon}
//                   itemName={item.name}
//                   itemValue={item.value}
//                   itemType={item.type}
//                   itemActivateValue={item.activatePrice}
//                   itemDisenchantValue={item.disenchantValue}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default Shop;
