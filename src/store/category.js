import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {categoriesApi} from "../api/categoriesApi";
export const getListCategories = createAsyncThunk('category/getListCategories',async (payload) => {
    const response = await categoriesApi.getListCategories();
    return response.data;
});

const initialState = {
    inputSearch: '',
    currentListCategories: [],
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        signOut(state) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('current_user');
            console.log("token",localStorage.getItem('access_token'));
            state.isLoggedIn = false;
            // alert('asasd');
            // state.auth.isLoggedIn = false;
            // state.auth.isLoading = false;
            // state.auth.current = {};
        }
    },
    extraReducers: {
        [getListCategories.pending.type]: (state,action) => {

        },
        [getListCategories.fulfilled.type]: (state,action) => {
            state.currentListCategories = action.payload;
        },
        [getListCategories.rejected.type]: (state,action) => {

        },
    },
});

const {actions,reducer: categoryReducers } = categorySlice;
export const {signOut} = actions
export default categoryReducers;
