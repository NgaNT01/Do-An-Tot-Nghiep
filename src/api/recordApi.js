import axiosClient from "./axiosClient";
import axiosClientAnt from "./axiosClientAnt";

export const recordApi = {
    getListRecordByCategory: (payload) => {
        const url = `/record-video/record-by-category/${payload}`;
        return axiosClient.get(url);
    },
    findRecordByStreamId: (payload) => {
        const url = `/record-video/record-by-streamid/${payload}`;
        return axiosClient.get(url);
    }
}