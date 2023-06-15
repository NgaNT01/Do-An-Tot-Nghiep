import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {streamApi} from "../api/streamApi";
export const startStream = createAsyncThunk('stream/startStream',async (payload) => {
    const response = await streamApi.startStream(payload);
    return response.data;
});

export const stopStream = createAsyncThunk('stream/stopStream',async (payload) => {
    const response = await streamApi.stopStream(payload);
    return response.data;
});

export const getListBroadcastingStreams = createAsyncThunk('stream/getListBroadcastingStreams',async () => {
    const response = await streamApi.getListBroadcastingStreams();
    return response.data;
});

export const getListBroadcastingStreamsByCategory = createAsyncThunk('stream/getListBroadcastingStreamsByCategory',async (payload) => {
    const response = await streamApi.getListBroadcastingStreamsByCategory(payload);
    return response.data;
});

export const getStreamInfoByUserName = createAsyncThunk('stream/getStreamInfoByUserName',async (payload) => {
    const response = await streamApi.getStreamInfoByUserName(payload);
    return response.data;
});

const initialState = {
    inputSearch: '',
    currentBroadcastingStreams: [],
    currentBroadcastingStreamsByCategory: [],
    currentListStream: [],
    currentPublishStream: {},
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
        [startStream.pending.type]: () => {},
        [startStream.fulfilled.type]: (state,action) => {
            state.currentPublishStream = action.payload;
        },
        [stopStream.pending.type]: () => {},
        [stopStream.fulfilled.type]: (state,action) => {
            state.currentPublishStream = {};
        },
        [getListBroadcastingStreams.pending.type]: () => {},
        [getListBroadcastingStreams.fulfilled.type]: (state,action) => {
            state.currentBroadcastingStreams = action.payload;
        },
        [getListBroadcastingStreamsByCategory.pending.type]: () => {},
        [getListBroadcastingStreamsByCategory.fulfilled.type]: (state,action) => {
            state.currentBroadcastingStreamsByCategory = action.payload;
        },
    },
});

const {actions,reducer: streamReducer } = streamSlice;
export const {signOut} = actions
export default streamReducer;
