import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { commentsService } from './commentService';

const initialState = {
  comments: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getCommentsData = createAsyncThunk(
  'comments',
  async (requestParams, ThunkAPI) => {
    console.log('$$$$$$$$$$$$$$CHECK THE THUNK$$$$$$$$$$', ThunkAPI);
    try {
      return commentsService.getComment(requestParams);
    } catch (error) {
      return error;
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCommentsData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCommentsData.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.comments = action.payload;
    });
    builder.addCase(getCommentsData.rejected, (state, action) => {
      state.isError = false;
    });
  },
});

export default commentsSlice.reducer;
