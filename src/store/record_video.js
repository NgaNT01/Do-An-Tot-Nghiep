import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {recordApi} from "../api/recordApi";

export const getListRecordByCategory = createAsyncThunk('record/getListRecordByCategory',async (payload) => {
    const response = await recordApi.getListRecordByCategory(payload);
    return response.data;
});

export const getRecordByStreamId = createAsyncThunk('record/getRecordByStreamId',async (payload) => {
    const response = await recordApi.findRecordByStreamId(payload);
    return response.data;
});

export const getAllRecordByName = createAsyncThunk('record/getAllRecordByName',async (payload) => {
    const response = await recordApi.getAllRecordByName(payload);
    return response.data;
});

export const getAllRecordByUserId = createAsyncThunk('record/getAllRecordByUserId',async (param) => {
    const response = await recordApi.getAllRecordByUserId(param);
    return response.data;
});

export const downloadByUrl = createAsyncThunk('record/downloadByUrl',async (payload) => {
    const response = await recordApi.downloadRecordByUrl(payload);
    return response.data;
});

const initialState = {
    listRecordByCategory: [],
    currentListRecord: [],
    isLoading: false,
    currentMyListRecord: []
}

const recordSlice = createSlice({
    name: "record",
    initialState,
    reducers: {
    },
    extraReducers: {
        [getListRecordByCategory.rejected.type]: () => {},
        [getListRecordByCategory.fulfilled.type]: (state,action) => {
            state.isLoading = false
            state.listRecordByCategory = action.payload;
        },
        [getListRecordByCategory.pending.type]: (state) => {
            state.isLoading = true
        },
        [getRecordByStreamId.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getRecordByStreamId.fulfilled.type]: (state,action) => {
            state.isLoading = false;
        },
        [getAllRecordByName.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getAllRecordByName.fulfilled.type]: (state,action) => {
            state.isLoading = false;
            state.currentListRecord = action.payload
        },
        [getAllRecordByUserId.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getAllRecordByUserId.fulfilled.type]: (state,action) => {
            state.isLoading = false;
            state.currentMyListRecord = action.payload;
        },
        [getAllRecordByUserId.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [downloadByUrl.pending.type]: (state) => {
            state.isLoading = true;
        },
        [downloadByUrl.fulfilled.type]: (state) => {
            state.isLoading = false;
        },
        [downloadByUrl.rejected.type]: (state) => {
            state.isLoading = false;
        },
    },
});

const {actions,reducer: recordReducer } = recordSlice;
export const {} = actions
export default recordReducer;
