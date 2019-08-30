import React, { Component } from "react";
import './ActivityLog.style.scss';
import { UserAvatar } from './UserAvatar';
import { TransactionTime } from './TransactionTime';

export default class ActivityLog extends Component {
  constructor() {
    super();
    this.state = {
      users: [
        {
          id: 1,
          img: "https://picsum.photos/id/835/25",
          name: "mawagirl",
          item: "XYZ",
          price: 125,
          timestamp: "04:47 am"
        },
        {
          id: 2,
          img: "https://picsum.photos/id/845/25",
          name: "johnsmith",
          item: "XYZ",
          price: 125,
          timestamp: "05:34 am"
        },
        {
          id: 3,
          img: "https://picsum.photos/id/875/25",
          name: "barackobama",
          item: "XYZ",
          price: 125,
          timestamp: "04:36 am"
        },
        {
          id: 4,
          img: "https://picsum.photos/id/855/25",
          name: "theking",
          item: "XYZ",
          price: 125,
          timestamp: "03:14 am"
        },
        {
          id: 5,
          img: "https://picsum.photos/id/865/25",
          name: "randomguy",
          item: "XYZ",
          price: 125,
          timestamp: "11:38 am"
        },
        {
          id: 6,
          img: "https://picsum.photos/id/885/25",
          name: "randomguy",
          item: "XYZ",
          price: 125,
          timestamp: "11:38 am"
        },
        {
          id: 7,
          img: "https://picsum.photos/id/815/25",
          name: "randomguy",
          item: "XYZ",
          price: 125,
          timestamp: "11:38 am"
        },
        {
          id: 8,
          img: "https://picsum.photos/id/855/25",
          name: "theking",
          item: "XYZ",
          price: 125,
          timestamp: "03:14 am"
        },
        {
          id: 9,
          img: "https://picsum.photos/id/875/25",
          name: "barackobama",
          item: "XYZ",
          price: 125,
          timestamp: "04:36 am"
        },
        {
          id: 10,
          img: "https://picsum.photos/id/865/25",
          name: "randomguy",
          item: "XYZ",
          price: 125,
          timestamp: "11:38 am"
        },
        {
          id: 11,
          img: "https://picsum.photos/id/865/25",
          name: "randomguy",
          item: "XYZ",
          price: 125,
          timestamp: "11:38 am"
        }
      ]
    };
  }
  render() {
    return (
      <div className="activityLog">
        <span className='activityHeaders'>
          <p>ACTIVITY LOG FOR 24h</p>
          <p>TIME</p>
        </span>
        <div className='scrollableLog'>
          {this.state.users.map(user => {
            const { id, img, name, item, price, timestamp } = user;
            return (
              <span key={id} className='transactionDetails'>
                <span>
                  <UserAvatar img={img} />
                  <b>{name}</b> bought <b>{item}</b> item for <b>{price}</b> tokens
                </span>
                <TransactionTime timestamp={timestamp}/>
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}