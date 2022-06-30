import { ascending_order_user_post, descending_order_user_post } from './../types';
import { get_user_details, get_user_posts } from './../service_function/user_service';
import { user_posts_get_failure, user_posts_get_success, user_posts_request } from "../types";


// try_catch_error_handling is used here for using async/await
export const get_user_details_posts = (userId: number) => {
    return async(dispatch: any) => {
        try {
            dispatch({
                type: user_posts_request,
            });

            const user_details = await get_user_details("https://jsonplaceholder.typicode.com/users?id="+userId);
            // console.log({user_details});
            
            // const user = users?.data[Math.floor(Math.random() * 10)];
            const user_posts = await get_user_posts(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            dispatch({
                type: user_posts_get_success,
                payload: {user_details: user_details[0], user_posts: user_posts || []},
            });
                
            
        } catch (error: any) {
            dispatch({
                type: user_posts_get_failure,
                payload: error.message,
            });
        }
            
    };   
}

export const ascending_user_post_order = () => {
    return (dispatch: any) => {
        dispatch({
            type: ascending_order_user_post,
        });
    };
}

export const descending_user_post_order = () => {
    return (dispatch: any) => {
        dispatch({
            type: descending_order_user_post,
        });
    };
}