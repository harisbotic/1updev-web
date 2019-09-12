import customAxios from "./customAxios";
import { BASE_URL, getHeaders, tokenRefreshHandler } from "./shared";

const fetchProfileInventory = {
    get: (profileID) =>
        tokenRefreshHandler(
            customAxios.get(
                `${BASE_URL}/Inventory/get/${profileID}`,
                {
                    headers: getHeaders()
                }
            )
        )
};

const fetchSortedProfileInventory = {
    get: (sort,order,profileID) =>
        tokenRefreshHandler(
            customAxios.get(
                `${BASE_URL}/Inventory/${sort}/${order}/${profileID}`,
                {
                    headers: getHeaders()
                }
            )
        )
};

const searchProfileInventory = {
    get: (userInput,profileID) =>
        tokenRefreshHandler(
            customAxios.get(
                `${BASE_URL}/Inventory/search/${userInput}/${profileID}`,
                {
                    headers: getHeaders()
                }
            )
        )
};

export default {
    fetchProfileInventory,
    fetchSortedProfileInventory,
    searchProfileInventory
};
