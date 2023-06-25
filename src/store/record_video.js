import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {recordApi} from "../api/recordApi";

export const getListRecordByCategory = createAsyncThunk('stream/getListRecordByCategory',async (payload) => {
    const response = await recordApi.getListRecordByCategory(payload);
    return response.data;
});

export const getRecordByStreamId = createAsyncThunk('stream/getRecordByStreamId',async (payload) => {
    const response = await recordApi.findRecordByStreamId(payload);
    return response.data;
});

const initialState = {
    listRecordByCategory: [],
    isLoading: false
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
    },
});

const {actions,reducer: recordReducer } = recordSlice;
export const {} = actions
export default recordReducer;
