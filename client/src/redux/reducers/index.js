import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import recipes from "./recipes";
// import filters from "./filters";

export default combineReducers({
  auth,
  message,
  recipes,
});