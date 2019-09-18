import customAxios from "./customAxios";
import { BASE_URL, getHeaders, tokenRefreshHandler } from "./shared";

const fetchTokenValue = {
    get: username =>
        tokenRefreshHandler(
            customAxios.get(`${BASE_URL}/tokentransactions/${username}`, {
                headers: getHeaders()
            })
        )
};

export default {
    fetchTokenValue
}