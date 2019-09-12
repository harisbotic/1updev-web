import React, { useState } from "react";
import './ActivityLog.style.scss';
import { UserAvatar } from './UserAvatar';
import { TransactionTime } from './TransactionTime';
import users from './users.json';

export default function ActivityLog() {

    return (
      <div className="activityLog">
        <span className='activityHeaders'>
          <p>ACTIVITY LOG FOR 24h</p>
          <p>TIME</p>
        </span>
        <div className='scrollableLog'>
          {users.map(user => {
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