import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import userApi from "../api/userApi";

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (payload, thunkAPI) => {
      const response = await userApi.signIn(payload);
      console.log("ket qua", response);


      // Save access token and user info to storage
      const accessToken = response.data.accessToken;
      const currentUser = {
          username: response.data.username,
          email: response.data.email,
          avatar_url: response.data.avatar_url
      };
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('current_user',JSON.stringify(currentUser));

      return response.data;
    }
);

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (payload, thunkAPI) => {
        const response = await userApi.signUp(payload);
        console.log("ket qua", response.data);

        return response.data;
    }
);

export const getListUsers = createAsyncThunk('auth/getListUsers',async () => {
  const response = await userApi.getListUsers();
  return response.data.data;
});

export const getListUsersStreaming = createAsyncThunk('auth/getListUsersStreaming',async () => {
    console.log("call api ant get list");
    const response = await userApi.getListUsersStreaming();
    return response.data;
});

export const getUserById = createAsyncThunk('auth/getUserById',async (payload, thunkAPI) => {
  const response = await userApi.getUserById(payload);
  return response.data;
});

export const getUserByName = createAsyncThunk('auth/getUserByName',async (payload, thunkAPI) => {
    const response = await userApi.getUserByName(payload);
    return response.data;
});

export const cleanUsersStreamList = createAsyncThunk('auth/cleanUsersStreamList', (payload, thunkAPI) => {
    state.currentListUser = [];
    console.log("hello",state.currentListUser);
});

export const findUser = createAsyncThunk('auth/findUser',async (payload) => {
  const response = await userApi.findUser(payload);
  return response.data.data;
});

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  inputSearch: '',
  currentListUser: [],
  currentUser: {},
  currentStream: {}
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
