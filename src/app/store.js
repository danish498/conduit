import articlesReducer from '../features/articlesSlice';
import authReducer from '../features/auth/authSlice';
import tagReducer from '../features/articleTagSlice';
import commentReducer from '../features/comments/commentSlice';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import createMigrate from 'redux-persist/es/createMigrate';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  // migrate: createMigrate(migrations, { debug: false }),
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persistedReducer,
    article: articlesReducer,
    tags: tagReducer,
    comments: commentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// {
//   article: articlesReducer,
//   auth: authReducer,
//   tags: tagReducer,
//   comments: commentReducer,
// },
