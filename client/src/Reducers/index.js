import { combineReducers } from "redux";

import transactions from "./transactions";
import AuthReducer from "./AuthReducer";
// import auth from "./auth";

export default combineReducers({ transactions, AuthReducer });
