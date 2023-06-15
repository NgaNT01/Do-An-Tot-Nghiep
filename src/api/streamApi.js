import axiosClient from "./axiosClient";
import axiosClientAnt from "./axiosClientAnt";

export const streamApi = {
    startStream: (payload) => {
        const url = '/stream/start';
        return axiosClient.post(url,payload);
    },
    stopStream: (payload) => {
        const url = '/stream/stop';
        return axiosClient.post(url,payload);
    },
    getListBroadcastingStreams: () => {
        const url = '/stream/broadcasting-stream';
        return axiosClient.get(url);
    },
    getListBroadcastingStreamsByCategory: (params) => {
        const url = `/stream/stream-by-category/${params}`;
        return axiosClient.get(url);
    },
    getStreamInfoByUserName: (params) => {
        const url = `/stream/stream-by-username/${params}`;
        return axiosClient.get(url);
    }
}