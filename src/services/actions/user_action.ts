import { user_get_failure, user_get_success, user_request } from "../types";
import axios from "axios";
import { get_users } from "../service_function/user_service";

// try_catch_error_handling is used here for using async/await
export const get_all_users = () => {
    return async(dispatch: any) => {
        try {
            dispatch({
                type: user_request,
            });

            const users = await get_users("https://jsonplaceholder.typicode.com/users", null);
            // console.log({users})
            dispatch({
                type: user_get_success,
                payload: users,
            });
                
            
        } catch (error: any) {
            dispatch({
                type: user_get_failure,
                payload: error.message,
            });
        }
            
    };
        
}