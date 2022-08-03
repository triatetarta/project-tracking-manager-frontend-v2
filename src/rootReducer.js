import { combineReducers } from "@reduxjs/toolkit";
import { reducer as auth } from "./Auth";
import { reducer as header } from "./Header";
import { reducer as tickets } from "./Tickets";
import { reducer as projects } from "./Projects";
import { reducer as modal } from "./Modal";
import { reducer as comment } from "./Comments";

const rootReducer = combineReducers({
  auth,
  header,
  tickets,
  projects,
  modal,
  comment,
});

export default rootReducer;
