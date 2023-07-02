import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {followApi} from "../api/followApi";

export const follow = createAsyncThunk('follow/follow',async (payload) => {
    const response = await followApi.follow(payload);
    return response.data;
});

export const checkFollow = createAsyncThunk('follow/checkFollow',async (payload) => {
    const response = await followApi.checkFollow(payload);
    return response.data;
});

export const unfollow = createAsyncThunk('follow/unfollow',async (payload) => {
    const response = await followApi.unfollow(payload);
    return response.data;
});

export const getListFollowing = createAsyncThunk('follow/getListFollowing',async (param) => {
    const response = await followApi.listFollowing(param);
    return response.data;
});

const initialState = {
    isLoading: false,
    currentListFollowing: []
}

const followSlice = createSlice({
    name: "follow",
    initialState,
    reducers: {
    },
    extraReducers: {
        [follow.pending.type]: (state, action) => {
            state.isLoading = true;
        },
        [follow.fulfilled.type]: (state,action) => {
            state.isLoading = false;
        },
        [checkFollow.pending.type]: (state, action) => {
            state.isLoading = true;
        },
        [checkFollow.fulfilled.type]: (state, action) => {
            state.isLoading = false
        },
        [unfollow.pending.type]: (state, action) => {
            state.isLoading = true;
        },
        [unfollow.fulfilled.type]: (state, action) => {
            state.isLoading = false
        },
        [getListFollowing.pending.type]: (state, action) => {
            state.isLoading = true;
        },
        [getListFollowing.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.currentListFollowing = action.payload;
        },
    },
});

const {actions,reducer: followReducer } = followSlice;
export const {} = actions
export default followReducer;
