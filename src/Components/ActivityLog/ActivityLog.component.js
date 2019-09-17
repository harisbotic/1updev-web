import React from "react";
import { Accordion, Button } from 'react-bootstrap';

import { UserAvatar } from './UserAvatar';
import { TransactionTime } from './TransactionTime';

import users from './users.json';
import './ActivityLog.style.scss';

export function ActivityLog() {

    return (
      <div className="activityLog activityLogDesktop">
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

export function ActivityLogMobile() {

  return (
    <center>
      <Accordion className="activityLogMobile">
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <p>Show Activity Log</p>
          </Accordion.Toggle>
          <Accordion.Collapse className="collapseWindow" eventKey="0">
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
          </Accordion.Collapse>
      </Accordion>

  </center>
  
  );
}