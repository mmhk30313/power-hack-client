import { combineReducers } from "redux";
import dashboard_reducer from "./combinations/dashboard_reducer";
import billing_reducer from "./combinations/billing_reducer";
import post_reducer from "./combinations/post_reducer";
import user_reducer from "./combinations/user_reducer";
import user_posts_reducer from "./combinations/user_posts_reducer";
import login_logout_reducer from "./combinations/login_logout_reducer";

export default combineReducers({
    login_logout_reducer,
    dashboard_reducer,
    post_reducer: post_reducer,
    billing_reducer,
    user_reducer,
    user_posts_reducer,
});