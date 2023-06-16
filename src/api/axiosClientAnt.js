import axios from "axios";

const axiosClientAnt = axios.create({
    baseURL: 'https://baongan.online:5443/WebRTCAppEE/rest/v2',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosClientAnt;