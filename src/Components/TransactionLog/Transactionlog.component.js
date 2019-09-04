import React, { Component } from "react";
import "./TransactionLog.style.scss";

class Transactionlog extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [
        {
          id: "1",
          user: "Tarik",
          item: "XYZ",
          price: "125",
          time: "04:06am"
        },
        {
          id: "2",
          user: "Tarik",
          item: "XYZ",
          price: "125",
          time: "04:06am"
        },
        {
          id: "3",
          user: "Tarik",
          item: "XYZ",
          price: "125",
          time: "04:06am"
        },
        {
          id: "4",
          user: "Tarik",
          item: "XYZ",
          price: "125",
          time: "04:06am"
        },
        {
          id: "5",
          user: "Tarik",
          item: "XYZ",
          price: "125",
          time: "04:06am"
        },
        {
          id: "6",
          user: "Tarik",
          item: "XYZ",
          price: "125",
          time: "04:06am"
        },
        {
          id: "7",
          user: "Tarik",
          item: "XYZ",
          price: "125",
          time: "04:06am"
        }
      ]
    };
  }
  render() {
    const { transactions } = this.state;
    return (
      <div className="transaction">
        <div className="transaction_log-container">
          <div className="header_row row">
            <div className="title col-10">Activity Log for 24h</div>
            <div className="time col-2">Time</div>
          </div>
          <div className="transactions">
            {transactions.map(transaction => (
              <div className="transaction_row">
                <div className="activity_row-img col-2">
                  <img
                    src={`https://robohash.org/${transaction.id}?set=set2&size=160x180`}
                    alt="img"
                    className="profile_img"
                  />
                </div>
                <div className="activity_row-text col-8">
                  {transaction.user} bought {transaction.item} for{" "}
                  {transaction.price} tokens
                </div>

                <div className="activity_row-time col-2">
                  {transaction.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Transactionlog;
