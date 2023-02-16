import axios from 'axios';
import { getToken } from './services/auth';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "content-type": "application/json",
        "accept-language": "pt-BR",
    },
    validateStatus: function (status) {
        return status >= 200 && status < 410; // default
    }
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

export const createApiTokenFunctions = () => {

    const getData = (url, params) => {
        let localUrl = new URL(API_BASE_URL + url);
        if (params) {
            localUrl.search = new URLSearchParams(params).toString();
        }
        return api.get(localUrl);

        // return authFetch(localUrl);
    };

    const postData = (url, params) => {

        return api.post(API_BASE_URL + url, params);
        // return authFetch(API_BASE_URL + url, {
        //     method: 'POST',
        //     body: JSON.stringify(params)
        // });
    };

    const putData = (url, id, params) => {
        return api.put(API_BASE_URL + url + '/' + id, params);
        // return authFetch(API_BASE_URL + url + '/' + id, {
        //     method: 'PUT',
        //     body: JSON.stringify(params)
        // });
    };

    const deleteData = (url, params) => {
        return api.delete(API_BASE_URL + url, params);
        // return authFetch(API_BASE_URL + url, {
        //     method: 'DELETE',
        //     body: JSON.stringify(params)
        // });
    };

    const postImage = (url, params) => {
        const config = {
            'Content-Type': 'multipart/form-data',
        }

        return api.post(API_BASE_URL + url, params, config);

        // return authFileFetch(API_BASE_URL + url, {
        //     method: 'POST',
        //     body: params
        // });
    }

    const putImage = (url, params) => {
        const config = {
            'Content-Type': 'multipart/form-data',
        }

        return api.put(API_BASE_URL + url, params, config);
        // return authFileFetch(API_BASE_URL + url, {
        //     method: 'PUT',
        //     body: params
        // });
    }

    const getImage = (url) => {
        const config = {
            'Content-Type': 'multipart/form-data',
        }

        return api.get(API_BASE_URL + url, config);
        // return authFileFetch(API_BASE_URL + url, {
        //     method: 'GET'
        // });
    }

    return {
        getData, postData, putData, deleteData,
        postImage, putImage, getImage
    };
}

export const { getData, postData, putData, deleteData,
    postImage, putImage, getImage } = createApiTokenFunctions();


