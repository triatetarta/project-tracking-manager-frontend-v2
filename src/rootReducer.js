import { combineReducers } from "@reduxjs/toolkit";
import { reducer as auth } from "./Auth";
import { reducer as header } from "./Header";
import { reducer as tickets } from "./Tickets";
import { reducer as projects } from "./Projects";

const rootReducer = combineReducers({
  auth,
  header,
  tickets,
  projects,
});

export default rootReducer;
