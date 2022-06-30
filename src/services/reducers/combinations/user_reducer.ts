import { user_get_failure, user_get_success, user_request } from "../../types";

const initial_state = {
    is_loading: false,
    users: [],
    error: null,
};

export default (state = initial_state, action: any) => {
    switch (action.type) {
        case user_request:
            return {
                ...state,
                is_loading: true,
            };
        case user_get_success:
            return {
                ...state,
                is_loading: false,
                users: action.payload,
            };
        case user_get_failure:
            return {
                ...state,
                is_loading: false,
                users: [],
                error: action.payload,
            };
        default:
            return state;
    }
}