import axiosClient from "./axiosClient";
import axiosClientAnt from "./axiosClientAnt";

export const streamApi = {
    startStream: (payload) => {
        const url = '/stream/start';
        return axiosClient.post(url,payload);
    },
}