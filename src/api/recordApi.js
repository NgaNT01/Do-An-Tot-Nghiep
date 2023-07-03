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
    },
    getAllRecordByName: (payload) => {
        const url = `/record-video/all-record-by-name/${payload}`
        return axiosClient.get(url)
    },
    getAllRecordByUserId: (param) => {
        const url = `/record-video/record-by-userid/${param}`
        return axiosClient.get(url);
    },
    downloadRecordByUrl: (payload) => {
        const url = '/record-video/download-by-url/'
        return axiosClient.post(url,payload);
    }
}