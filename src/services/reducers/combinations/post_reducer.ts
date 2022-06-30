import { posts_get_request, posts_get_success, posts_get_failure } from "../../types";

const initial_state = {
    is_loading: false,
    post_list: [],
    error: null,
};

export default (state = initial_state, action: any) => {
    // console.log({action});
    
    switch (action.type) {
        case posts_get_request:
            return {
                ...state,
                is_loading: true,
            };
        case posts_get_success:
            return {
                ...state,
                is_loading: false,
                ...action?.payload
            };
        case posts_get_failure:
            return {
                ...state,
                is_loading: false,
                post_list: [],
                error: action.payload,
            };
        default:
            return state;
    }
}