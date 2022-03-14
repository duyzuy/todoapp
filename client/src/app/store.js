import { configureStore } from '@reduxjs/toolkit';
import todoSlice from '../features/todo/todoSlice';
import authSlice from '../features/auth/authSlice'
export const store = configureStore({
  reducer: {
    todos: todoSlice,
    auth: authSlice
  },
});
