import { combineReducers } from "redux";
import Admin from "./Admin";
import auth from "./auth";
import userData from "./userData";
import Owner from "./Owner";
export default combineReducers({ auth,userData,Admin,Owner});
