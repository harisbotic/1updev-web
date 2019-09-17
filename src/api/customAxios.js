import { BASE_URL, BASE_AUTH_URL, clientAuthHeader, toFormData } from "./shared";
import axios from "axios";
import jwtdecode from "jwt-decode";

let customAxios = axios.create({
    baseURL: BASE_URL
});

const axiosCall = () => {
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_AUTH_URL}/connect/token`, toFormData({
            grant_type: "refresh_token",
            refresh_token: localStorage.getItem("refresh_token"),
            resource: 'https://localhost:5001',
            scope: 'offline_access oudAPI'
        }), { headers: clientAuthHeader }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            window.location.replace(window.location.origin + "/login");
            reject(error);
        })
    });
}

customAxios.interceptors.request.use(async (config) => {
    const decoded = jwtdecode(localStorage.getItem("access_token"));
    if (decoded &&
        (new Date()).getTime() > decoded.exp * 1000) {
        const tokenResponse = await axiosCall();
        localStorage.setItem('access_token', tokenResponse.access_token);
        localStorage.setItem('refresh_token', tokenResponse.refresh_token);
        config.headers.Authorization = `Bearer ${tokenResponse.access_token}`
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default customAxios; 