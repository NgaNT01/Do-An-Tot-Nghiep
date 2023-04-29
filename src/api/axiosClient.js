import axios from "axios";
import {getToken} from "../utils/auth";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
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