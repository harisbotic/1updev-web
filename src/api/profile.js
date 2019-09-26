import customAxios from "./customAxios";
import { BASE_URL, getHeaders, tokenRefreshHandler } from "./shared";

const fetchProfileInventory = {
  get: profileID =>
    tokenRefreshHandler(
      customAxios.get(`${BASE_URL}/Inventory/get/${profileID}`, {
        headers: getHeaders()
      })
    )
};

const profileInfo = {
  get: identifier =>
    tokenRefreshHandler(
      customAxios.get(`${BASE_URL}/profiles/${identifier}`, {
        headers: getHeaders()
      })
    )
};

const editProfile = {
  update: (user, currentUsername) =>
    tokenRefreshHandler(
      customAxios.put(
        `${BASE_URL}/profiles/${currentUsername}`,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          identity: {
            username: user.username
          }
        },
        {
          headers: getHeaders()
        }
      )
    )
};

const fetchSortedProfileInventory = {
  get: (sort, order, profileID) =>
    tokenRefreshHandler(
      customAxios.get(`${BASE_URL}/Inventory/${sort}/${order}/${profileID}`, {
        headers: getHeaders()
      })
    )
};

const searchProfileInventory = {
  get: (userInput, profileID) =>
    tokenRefreshHandler(
      customAxios.get(
        `${BASE_URL}/Inventory/search/${userInput}/${profileID}`,
        {
          headers: getHeaders()
        }
      )
    )
};

const searchAndSortInventory = {
  get: (profileId,userInput,sort,order) =>
    tokenRefreshHandler(
      customAxios.get(
        `${BASE_URL}/Inventory/sortAndSearchInventory/${profileId}/${userInput}/${sort}/${order}`,
        {
          headers: getHeaders()
        }
      )
    )
};

const searchByQuery = {
  get:query => 
  tokenRefreshHandler(
      customAxios.get(`${BASE_URL}/Profiles/getByQuery?=${query}`),
      {
          headers: getHeaders()
      }
  )
};

const toggleActivate = {
  get:(activateId,profileId) => 
  tokenRefreshHandler(
      customAxios.get(`${BASE_URL}/Inventory/toggleActivate/${activateId}/${profileId}`),
      {
          headers: getHeaders()
      }
  )
};

const giftItem = {
  get:(senderId,recieverId,inventoryId) => 
  tokenRefreshHandler(
      customAxios.get(`${BASE_URL}/Inventory/giftItem/${senderId}/${recieverId}/${inventoryId}`),

      {
          headers: getHeaders()
      }
  )
};

const getInventoryValue = {
  get: profileId => 
  tokenRefreshHandler(
    customAxios.get(`${BASE_URL}/inventory/inventoryValue/${profileId}`),
    {
      headers: getHeaders()
    }
  )
};

const countActiveBadges = {
  get: profileId => 
  tokenRefreshHandler(
    customAxios.get(`${BASE_URL}/Inventory/countActiveBadges/${profileId}`),
    {
      headers: getHeaders()
    }
  )
};

export default {
  profileInfo,
  editProfile,
  fetchProfileInventory,
  fetchSortedProfileInventory,
  searchProfileInventory,
  searchByQuery,
  toggleActivate,
  giftItem,
  getInventoryValue,
  countActiveBadges,
  searchAndSortInventory
};


