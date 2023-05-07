import axiosClient from "./axiosClient";
import axiosClientAnt from "./axiosClientAnt";

const streamApi = {
    startStream: (payload) => {
        const url = '/stream/start';
        return axiosClient.post(url,payload);
    },
}

export default streamApi;