import customAxios from './customAxios';
import { BASE_URL, getHeaders, tokenRefreshHandler } from './shared';
import React, { useState, useEffect } from "react";

const fetchBadges = {
    get: () =>
      tokenRefreshHandler(
        customAxios.get(`${BASE_URL}/shops/get/badges`, {
          headers: getHeaders()
        })
      )
};

const fetchSortedShopItems = {
    get: (sort, order) =>
      tokenRefreshHandler(
        customAxios.get(`${BASE_URL}/shops/${sort}/${order}`, {
          headers: getHeaders()
        })
      )
  };
  
  const searchShopItem = {
    get: ( searchText ) =>
      tokenRefreshHandler(
        customAxios.get(`${BASE_URL}/shops/search?searchText=${searchText}`, {
          headers: getHeaders()
        })
      )
  };

const shopItems = {
    get: () => tokenRefreshHandler(
            customAxios.get(
                `${BASE_URL}/shops/get`,
                {
                    headers: getHeaders()
                }
            )
        )
};

const spinTheWheelItems = {
    get: () => tokenRefreshHandler(
            customAxios.get(
                `${BASE_URL}/Shops/get/SpinTheWheel`,
                {
                    headers: getHeaders()
                }
            )
        )
};

const BuyItem = {
    post: (identifier) => tokenRefreshHandler(
            customAxios.post(
                `${BASE_URL}/shops/buyItem/${identifier}`,
                {},
                {
                    headers: getHeaders()
                }
            )
        )
}

const itemTypes = {
    get: () => tokenRefreshHandler(
        customAxios.get(
            `${BASE_URL}/shops/itemTypes`,
            {
                headers: getHeaders()
            }
        )
    )
};

const itemRarities = {
    get: () => tokenRefreshHandler(
        customAxios.get(
            `${BASE_URL}/shops/itemRarities`,
            {
                headers: getHeaders()
            }
        )
    )
};

const addShopItem = {
    post: body => tokenRefreshHandler(
        customAxios.post(
            `${BASE_URL}/shops/create`, body,
            {
                headers: getHeaders()
            }
        )
    )
}


export default {
    shopItems,
    spinTheWheelItems,
    BuyItem,
    itemTypes,
    itemRarities,
    addShopItem,
    fetchSortedShopItems,
    searchShopItem,
    fetchBadges
}