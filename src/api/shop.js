import customAxios from './customAxios';
import { BASE_URL, getHeaders, tokenRefreshHandler } from './shared';

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
};

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
};

const editShopItem = {
    update: (id, body) => tokenRefreshHandler(
        customAxios.put(
            `${BASE_URL}/shops/update/${id}`, 
            {
                image: body.image,
                name: body.name,
                price: body.price,
                quantity: body.quantity,
                value: body.value,
                typeId: body.typeId,
                rarityId: body.rarityId
            },
            {
                headers: getHeaders()
            }
        )
    )
};

const deleteShopItem = {
    remove: (id) => tokenRefreshHandler(
        customAxios.delete(
            `${BASE_URL}/shops/delete/${id}`,
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
    editShopItem,
    deleteShopItem
}