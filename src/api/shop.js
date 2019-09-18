import customAxios from './customAxios';
import { BASE_URL, getHeaders, tokenRefreshHandler } from './shared';

const shopItems = {
    get:  tokenRefreshHandler(
            customAxios.get(
                `${BASE_URL}/shops/get`,
                {
                    headers: getHeaders()
                }
            )
        )
};

const spinTheWheelItems = {
    get: tokenRefreshHandler(
            customAxios.get(
                `${BASE_URL}/Shops/get/SpinTheWheel`,
                {
                    headers: getHeaders()
                }
            )
        )
};

export default {
    shopItems,
    spinTheWheelItems
}