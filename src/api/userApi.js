import axiosClient from "./axiosClient";
import axiosClientAnt from "./axiosClientAnt";

const userApi = {
    signIn: (payload) => {
        const url = '/auth/sign-in';
        return axiosClient.post(url, payload);
    },
    signUp: (payload) => {
        const url = '/auth/sign-up';
        return axiosClient.post(url,payload);
    },
    getListUsers: () => {
        const url = '/user/list';
        return axiosClient.get(url);
    },
    getListUsersStreaming: () => {
      const url = '/broadcasts/list/0/5';
      return axiosClientAnt.get(url);
    },
    getUserById: (params) => {
        const url = `/user/profile/${params}`;
        return axiosClient.get(url)
    },
    findUser: (params) => {
        const url = `/user/search?q=${params}`;
        return axiosClient.get(url);
    },
    updateUserInfo: (payload) => {
        const url = `/user/update-info`;
        return axiosClient.put(url,payload);
    }
}

export default userApi;