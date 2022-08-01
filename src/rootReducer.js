import { combineReducers } from "@reduxjs/toolkit";
import { reducer as auth } from "./Auth";
import { reducer as header } from "./Header";

const rootReducer = combineReducers({
  auth,
  header,
});

export default rootReducer;
