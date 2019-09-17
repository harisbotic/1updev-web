import axios from '../../node_modules/axios';
import { BASE_AUTH_URL, clientAuthHeader, toFormData } from './shared';

export default {
    login: (credentials) => axios.post(`${BASE_AUTH_URL}/connect/token`, toFormData({
        grant_type: "password",
        username: credentials.username,
        password: credentials.password,
        resource: 'https://localhost:5001',
        scope: 'offline_access oudAPI'
    }), { headers: clientAuthHeader }),
    refreshToken: () => axios.post(`${BASE_AUTH_URL}/connect/token`, toFormData({
        grant_type: "refresh_token",
        refresh_token: localStorage.getItem("refresh_token"),
        resource: 'https://localhost:5001',
        scope: 'offline_access oudAPI'
    }), { headers: clientAuthHeader }),
    
}