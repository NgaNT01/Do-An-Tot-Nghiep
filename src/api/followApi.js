import axiosClient from "./axiosClient";
import axiosClientAnt from "./axiosClientAnt";

export const followApi = {
    follow: (payload) => {
        const url = '/follow';
        return axiosClient.post(url,payload);
    },
    checkFollow: (payload) => {
        const url = '/follow/check-follow'
        return axiosClient.post(url,payload);
    },
    unfollow: (payload) => {
        const url = '/follow/unfollow'
        return axiosClient.post(url,payload)
    },
    listFollowing: (param) => {
        const url = `/follow/list-following/${param}`
        return axiosClient.get(url);
    }
}