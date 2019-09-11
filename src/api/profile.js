import customAxios from './customAxios'; import { BASE_URL, getHeaders, tokenRefreshHandler } from "./shared";


const profileInfo = {
    get: route =>
        tokenRefreshHandler(
            customAxios.get(
                `${BASE_URL}/profiles/${route}`,
                {
                    headers: getHeaders()
                }

            )
        )
};

const allProfiles = {
    get: route =>
        tokenRefreshHandler(
            customAxios.get(
                `${BASE_URL}/${route}/get`,
                {
                    headers: getHeaders()
                }
            )
        )
}

export default {
    profileInfo,
    allProfiles
};