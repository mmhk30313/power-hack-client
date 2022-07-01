import { combineReducers } from "redux";
import dashboard_reducer from "./combinations/dashboard_reducer";
import billing_reducer from "./combinations/billing_reducer";
import login_logout_reducer from "./combinations/login_logout_reducer";

export default combineReducers({
    login_logout_reducer,
    dashboard_reducer,
    billing_reducer,
});