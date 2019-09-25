import React, { useState } from "react";
import "./TransactionLog.style.scss";

function Transactionlog() {
  const transactions = [
    {
      id: "1",
      user: "Tarik",
      item: "Boost",
      price: "125",
      time: "01:06am"
    },
    {
      id: "2",
      user: "Brnjo",
      item: "Hoodie",
      price: "125",
      time: "02:06am"
    },
    {
      id: "3",
      user: "Zgembo",
      item: "Shirt",
      price: "125",
      time: "03:06am"
    },
    {
      id: "4",
      user: "Topuz ",
      item: "Mouse",
      price: "125",
      time: "04:06am"
    },
    {
      id: "5",
      user: "cvaja",
      item: "Keyboard",
      price: "125",
      time: "05:06am"
    },
    {
      id: "6",
      user: "Fes",
      item: "Speakers",
      price: "125",
      time: "06:06am"
    },
    {
      id: "7",
      user: "Tarik",
      item: "XYZ",
      price: "125",
      time: "07:06am"
    }
  ];

  const [transactionLog, setTransaction] = useState(transactions);

  return (
    <div className="transaction">
      <div className="transaction_log-container">
        <div className="header_row row">
          <div className="title col-10">TRANSACTION LOG FOR 24h</div>
          <div className="time col-2">TIME</div>
        </div>
        <div className="transactions">
          {transactionLog.map(transaction => {
            return (
              <div className="transaction_row">
                {/* <div className="activity_row-img col-2">
                  <img
                    src={`https://robohash.org/${transaction.id}?set=set2&size=160x180`}
                    alt="img"
                    className="profile_img"
                  />
                </div> */}
                <div className="activity_row-text col-10">
                  <img
                    src={`https://robohash.org/${transaction.id}?set=set2&size=160x180`}
                    alt="img"
                    className="profile_img"
                  />
                  {transaction.user} bought {transaction.item} for{" "}
                  {transaction.price} tokens
                </div>

                <div className="activity_row-time col-2">
                  {transaction.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Transactionlog;
