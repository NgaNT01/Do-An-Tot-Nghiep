import axios from "axios";
import {getToken} from "../utils/auth";

const axiosClient = axios.create({
    baseURL: 'https://tannga.space:8443/api',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
})

axiosClient.interceptors.request.use(
    config => {
        const token = getToken();
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export default axiosClient;