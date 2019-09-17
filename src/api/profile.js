import customAxios from "./customAxios";
import { BASE_URL, getHeaders, tokenRefreshHandler } from "./shared";

const searchByQuery = {
    get:query => 
    tokenRefreshHandler(
        customAxios.get(`${BASE_URL}/Profiles/getByQuery?=${query}`),
        {
            headers: getHeaders()
        }
    )
}

export default {searchByQuery};