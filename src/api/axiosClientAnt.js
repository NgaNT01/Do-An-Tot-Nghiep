import axios from "axios";

const axiosClientAnt = axios.create({
    baseURL: 'https://maelewis.store:5443/WebRTCAppEE/rest/v2',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosClientAnt;