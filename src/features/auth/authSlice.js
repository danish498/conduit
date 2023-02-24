import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import APIClient from '../../api/APIClient';
import { authService } from './authService';
// import Cookies from 'js-cookie';

const initialState = {
  error: null,
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  token: '',
  isLoading: false,
  message: '',
};

export const getAuthData = createAsyncThunk(
  'auth/data',
  async (requestParams, thunkAPI) => {
    try {
      const response = await authService.getAuth(requestParams);
      return response.data.user;
      // return thunkAPI.dispatch({
      //   data: response.data.user,
      //   onSuccess: requestParams?.onSuccess(),
      // });
    } catch (error) {
      console.log('errror fo thunk', error);
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const getLoginAuth = createAsyncThunk(
  'login/data',
  async (requestParams, ThunkAPI) => {
    console.log(requestParams);

    try {
      return await authService.getAuthLogin(requestParams);
    } catch (error) {
      console.log('errror fo thunk', error);
      return ThunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout(state) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.isSuccess = false;
      state.token = '';
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAuthData.pending, (state, action) => {
      state.isLoading = true;
      state.isLoggedIn = false;
    });
    builder.addCase(getAuthData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.isSuccess = true;
      state.image = action.payload.image;
      state.username = action.payload.username;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      APIClient.setHeader(action.payload.token);
    });
    builder.addCase(getAuthData.rejected, (state, action) => {
      state.error = action.payload;
      state.isSuccess = false;
      state.isError = true;
      state.isLoggedIn = false;
    });
    builder.addCase(getLoginAuth.pending, (state, action) => {
      state.isLoading = true;
      state.isLoggedIn = false;
    });
    builder.addCase(getLoginAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.isSuccess = true;
      state.image = action.payload.image;
      state.username = action.payload.username;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      APIClient.setHeader(action.payload.token);
    });
    builder.addCase(getLoginAuth.rejected, (state, action) => {
      state.error = action.payload;
      console.log(action.payload);
      state.isSuccess = false;
      state.isError = true;
      state.isLoggedIn = false;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
