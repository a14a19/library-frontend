import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/userData/userSlice";
import bookDataReducer from "../features/bookData/bookDataSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        bookData: bookDataReducer
    }
})