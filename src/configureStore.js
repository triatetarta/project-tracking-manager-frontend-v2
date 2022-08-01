import { configureStore } from "@reduxjs/toolkit";
import { getMe } from "./Auth/authSlice";
import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});

const { dispatch } = store;

dispatch(getMe());
