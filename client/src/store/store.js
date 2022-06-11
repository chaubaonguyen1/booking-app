import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    auth: authReducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }) // get rid of serializablecheck error
})