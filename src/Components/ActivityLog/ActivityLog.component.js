import React, { useState, useEffect } from "react";
import { Accordion, Button } from 'react-bootstrap';
import customAxios from "../../api/customAxios";
import axios from 'axios';

import { UserAvatar } from './UserAvatar';
import { TransactionTime } from './TransactionTime';
import { BASE_URL, getHeaders, tokenRefreshHandler } from "../../api/shared";

import users from './users.json';
import './ActivityLog.style.scss';
import { async } from "q";

export function ActivityLog() {

  const [userLogs, setUserLogs] = useState([]);

  const getShopItem = async (itemId) => {
    const logValue = await axios(
      `${BASE_URL}/shops?item=${itemId}`,
    );
    setTimeout(() => console.log(logValue.data), 2000);
    return logValue.data;
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const itemGiftLogs = await axios(
        `${BASE_URL}/api/itemgiftlogs?timerange=252222`,
      );
      const shopPurchaseLogs = await axios(
        `${BASE_URL}/api/shoppurchaselogs?timerange=252222`,
      );
      const logs1 = itemGiftLogs.data.map(log => ({
        gifterName: log.gifter.firstName + " " + log.gifter.lastName,
        gifterId: log.gifter.id,
        receiverName: log.receiver.firstName + " " + log.receiver.lastName,
        item: log.item.name,
        price: null,
        timestamp: log.created,
        gifterImg: `https://robohash.org/${log.gifter.id}?set=set3`,
        transactionId: `${log.gifter.id}-${log.receiver.id}`
      }))

      const logs2 = shopPurchaseLogs.data.map(log => {
        const logValue = getShopItem(log.item.id);
        return (
          {
            gifterName: log.profile.firstName + " " + log.profile.lastName,
            gifterId: log.profile.id,
            receiverName: null,
            item: log.item.name,
            price: logValue.price,
            timestamp: log.created,
            gifterImg: `https://robohash.org/${log.profile.id}?set=set3`,
            transactionId: log.id
          }
        );
      });
      const data = [...logs1, ...logs2];
      data.sort((log1, log2) => new Date(log2.timestamp) - new Date(log1.timestamp));
      setUserLogs(data);
    };
    fetchData();
  }, []);

  const renderGiftMessage = (gifterName, receiverName, itemName) => {
    return (
      <>
        <b>{gifterName}</b> gifted <b>{itemName}</b> to <b>{receiverName}</b>
      </>
    );
  }

  const renderPurchaseMessage = (buyerName, itemName, itemPrice) => {
    return (
      <>
        <b>{buyerName}</b> bought <b>{itemName}</b> for <b>{itemPrice}</b> tokens
      </>
    );
  }

  return (
    <div className="activityLog activityLogDesktop">
      <span className='activityHeaders'>
        <p>ACTIVITY LOG FOR 24h</p>
        <p>TIME</p>
      </span>
      <div className='scrollableLog'>
        {userLogs.map(({ gifterName, gifterId, receiverName, item, price, timestamp, gifterImg, transactionId }) => (
          <span key={transactionId} className='transactionDetails'>
            <span className="participants">
              <UserAvatar img={gifterImg} />
              {receiverName ?
                renderGiftMessage(gifterName, receiverName, item) :
                renderPurchaseMessage(gifterName, item, price)
              }
            </span>
            <TransactionTime timestamp={timestamp} />
          </span>))}
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
                    <TransactionTime timestamp={timestamp} />
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