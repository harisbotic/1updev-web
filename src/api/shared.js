import auth from './auth';

const BASE_AUTH_URL = 'https://localhost:6001';
const BASE_URL = 'https://localhost:5001';

const clientAuthHeader = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic dHdjOjlDMTc3MTBBLTg5QzAtNEQ5MS1BOTQ1LTlBRUM5RjA3MUVFMQ=='
}

const getHeaders = () => {
    return {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    }
}

const tokenRefreshHandler = async (request) => { 
    try {
        return await request;
    } catch (err) {
        if (err.code !== 401) throw err
        else {
            await auth.refreshToken().then(response => {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
            });
            return await request;
        }
    }
}

const toFormData = (object) => {
    const formData = new FormData();
    Object.keys(object).forEach(function (key, index) {
        formData.append(key, object[key]);
    });
    return formData;
}

export {
    getHeaders,
    clientAuthHeader,
    tokenRefreshHandler,
    BASE_AUTH_URL,
    BASE_URL,
    toFormData
}