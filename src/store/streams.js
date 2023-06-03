import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {streamApi} from "../api/streamApi";
export const startStream = createAsyncThunk('stream/startStream',async (payload) => {
    const response = await streamApi.startStream(payload);
    console.log(response.data.message);
    return response.data.message;
});

const initialState = {
    inputSearch: '',
    currentListUserStreaming: [],
    currentListStream: [],
}

const streamSlice = createSlice({
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

const {actions,reducer: streamReducer } = streamSlice;
export const {signOut} = actions
export default streamReducer;
