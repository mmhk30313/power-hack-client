import { logged_in, logged_out } from "../../types";

const initial_state = {
    is_logged_in: false
};

export default (state = initial_state, action: any) => {
    switch (action.type) {
        case logged_in:
            return {
                ...state,
                is_logged_in: true,
                ...action?.payload,
            };
        case logged_out:
            return {
                is_logged_in: false,
            };
        default:
            return {...state};
    }
}