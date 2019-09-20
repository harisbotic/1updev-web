import customAxios from "./customAxios";
import { BASE_URL, getHeaders, tokenRefreshHandler } from "./shared";

const fetchTokenValue = {
    get: username =>
        tokenRefreshHandler(
            customAxios.get(`${BASE_URL}/tokenTransactions/${username}`, {
                headers: getHeaders()
            })
        )
};

const disenchantItem = {
  post: (username, itemId) => 
  tokenRefreshHandler(
      customAxios.post(`${BASE_URL}/tokentransactions/${username}/${itemId}`),
      {
          headers: getHeaders()
      }
  )
};

export default {
    fetchTokenValue,
    disenchantItem
}