import axios from "axios";

const axiosClientAnt = axios.create({
    baseURL: 'http://188.166.221.237:5080/WebRTCAppEE/rest/v2',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosClientAnt;