import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { articleService } from './articlesService';

const initialState = {
  tags: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getTagsData = createAsyncThunk(
  'tags/data',
  async (requestParams, ThunkAPI) => {
    try {
      return await articleService.getTags(requestParams);
    } catch (error) {
      return error;
    }
  }
);

const tagSlice = createSlice({
  name: 'tags',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTagsData.pending, (state, action) => {});
    builder.addCase(getTagsData.fulfilled, (state, action) => {
      console.log(action.payload);
      state.tags = action.payload;
    });
    builder.addCase(getTagsData.rejected, (state, action) => {});
  },
});

export default tagSlice.reducer;
