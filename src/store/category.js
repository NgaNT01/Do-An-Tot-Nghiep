import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {categoriesApi} from "../api/categoriesApi";
export const getListCategories = createAsyncThunk('stream/startStream',async (payload) => {
    const response = await categoriesApi.getListCategories();
    console.log(response.data);
    return response.data;
});

const initialState = {
    inputSearch: '',
    currentListCategorìes: [],
}

const userSlice = createSlice({
    name: "user",
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
    },
});

const {actions,reducer: authReducer } = userSlice;
export const {signOut} = actions
export default authReducer;
