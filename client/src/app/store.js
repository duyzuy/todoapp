import { configureStore } from '@reduxjs/toolkit';
import todoSlice from '../features/todo/todoSlice';
import authSlice from '../features/auth/authSlice'
import todoReducer from '../features/todo/todoReducer';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    auth: authSlice
  },
});
