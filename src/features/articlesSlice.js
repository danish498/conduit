import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { articleService } from './articlesService';

const initialState = {
  articleData: null,
  favoritesCount: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getArticleData = createAsyncThunk(
  'article/data',
  async (requestParams, ThunkAPI) => {
    // console.log('========== REQUEconst STPARAMS========', requestParams);
    console.log(ThunkAPI);
    try {
      return articleService.getArticle(requestParams);
    } catch (error) {
      console.log('ERRRRRRORRRRR FROM CREATEASYNC THUNK', error);
      throw error;
    }
  }
);

const articleSlice = createSlice({
  name: 'article',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getArticleData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getArticleData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      console.log('check the valu in the slice', action.payload);
      state.articleData = action.payload;
      state.favoritesCount = action.payload.articles.map(
        (data) => data.favoritesCount
      );

      // state.articleData = 'there are some values over here';
    });
    builder.addCase(getArticleData.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default articleSlice.reducer;
