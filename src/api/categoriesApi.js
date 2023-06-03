import axiosClient from "./axiosClient";
import axiosClientAnt from "./axiosClientAnt";

export const categoriesApi = {
    getListCategories: () => {
        const url = '/category/all';
        return axiosClient.get(url);
    },
}