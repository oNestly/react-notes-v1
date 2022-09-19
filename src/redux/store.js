import { configureStore } from "@reduxjs/toolkit";
import todo from './slices/todoSlice'

export const store = configureStore({
	reducer: {
		todo,
	}
})