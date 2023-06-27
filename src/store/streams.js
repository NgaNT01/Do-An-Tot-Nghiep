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

export const getAllStream = createAsyncThunk('stream/getAllStream',async () => {
    const response = await streamApi.getAllStream();
    return response.data;
});

export const getAllStreamByName = createAsyncThunk('stream/getAllStreamByName',async () => {
    const response = await streamApi.getAllStreamByName();
    return response.data;
});

const initialState = {
    inputSearch: '',
    currentBroadcastingStreams: [],
    currentBroadcastingStreamsByCategory: [],
    currentListStream: [],
    currentPublishStream: {},
    isLoading: false,
}

const streamSlice = createSlice({
    name: "stream",
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
        [startStream.pending.type]: (state) => {
            state.isLoading = true;
        },
        [startStream.fulfilled.type]: (state,action) => {
            state.isLoading = false
            state.currentPublishStream = action.payload;
        },
        [stopStream.pending.type]: (state) => {
            state.isLoading = false
        },
        [stopStream.fulfilled.type]: (state,action) => {
            state.isLoading = false
            state.currentPublishStream = {};
        },
        [getListBroadcastingStreams.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getListBroadcastingStreams.fulfilled.type]: (state,action) => {
            state.isLoading = false
            state.currentBroadcastingStreams = action.payload;
        },
        [getListBroadcastingStreamsByCategory.pending.type]: (state) => {
            state.isLoading = true
        },
        [getListBroadcastingStreamsByCategory.fulfilled.type]: (state,action) => {
            state.isLoading = false
            state.currentBroadcastingStreamsByCategory = action.payload;
        },
        [getAllStreamByName.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getAllStreamByName.fulfilled.type]: (state,action) => {
            state.isLoading = false
            state.currentListStream = action.payload
        },
    },
});

const {actions,reducer: streamReducer } = streamSlice;
export const {signOut} = actions
export default streamReducer;
