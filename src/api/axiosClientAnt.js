import axios from "axios";

const axiosClientAnt = axios.create({
    baseURL: 'http://178.128.124.146:5080/WebRTCAppEE/rest/v2',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosClientAnt;