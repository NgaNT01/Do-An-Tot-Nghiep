import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {streamApi} from "../api/streamApi";
export const startStream = createAsyncThunk('stream/startStream',async (payload) => {
    const response = await streamApi.startStream(payload);
    return response.data.data;
});

const initialState = {
    inputSearch: '',
    currentListUserStreaming: [],
    currentListStream: [],
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
        [signIn.pending.type]: (state) => {
            state.isLoading = true;
        },
        [signIn.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            if (action) {
                state.isLoggedIn = true;
                state.currentUser = action.payload;
            }
        },
        [signIn.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [signUp.pending.type]: (state) => {
            state.isLoading = true;
        },
        [signUp.fulfilled.type]: (state, action) => {
            state.isLoading = false;
        },
        [signUp.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [getListUsers.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getListUsers.fulfilled.type]: (state,action) => {
            state.isLoading = false;
            state.current = action.payload;
        },
        [getListUsers.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [getListUsersStreaming.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getListUsersStreaming.fulfilled.type]: (state,action) => {
            state.isLoading = false;
            // state.currentListUser = action.payload;
            action.payload.map((stream,index) => {
                const streamChangeToUser = {
                    username: stream.streamId,
                    streamName: stream.streamId,
                    viewerCount: stream.webRTCViewerCount,
                };
                console.log(streamChangeToUser);
                state.currentListUser.push(streamChangeToUser);
            });
        },
        [getListUsersStreaming.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [cleanUsersStreamList.pending.type]: (state) => {
            state.currentListUser = [];
        },
        [cleanUsersStreamList.fulfilled.type]: (state) => {
            state.currentListUser = [];
        },
        [getUserById.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getUserById.fulfilled.type]: (state,action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
        },
        [getUserById.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [findUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [findUser.fulfilled.type]: (state,action) => {
            state.isLoading = false;
            state.current = action.payload;
        },
        [findUser.rejected.type]: (state) => {
            state.isLoading = false;
        },
    },
});

const {actions,reducer: authReducer } = userSlice;
export const {signOut} = actions
export default authReducer;
