import { get_posts, get_posts_descending_order } from "../service_function/post_service";
import { posts_get_request, posts_get_success } from "../types";

export const get_posts_desc_order = () => {
    return async(dispatch: any) => {
        try {
            dispatch({
                type: posts_get_request,
            });
            const posts = await get_posts_descending_order();
            // console.log({posts});
            dispatch({
                type: posts_get_success,
                payload: {post_list: posts},
            });
                
            
        } catch (error: any) {
            dispatch({
                type: posts_get_success,
                payload: error.message,
            });
        }
            
    };
        
}

export const get_all_posts = () => {
    return async(dispatch: any) => {
        try {
            dispatch({
                type: posts_get_request,
            });
            const posts = await get_posts();
            // console.log({posts})
            dispatch({
                type: posts_get_success,
                payload: {post_list: posts},
            });
                
            
        } catch (error: any) {
            dispatch({
                type: posts_get_success,
                payload: error.message,
            });
        }
            
    };    
}
