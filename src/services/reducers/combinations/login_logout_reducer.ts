import { signed_up_request, signed_up_success, signed_up_failure } from './../../types';
import { 
    logged_in_request,
    logged_in_success,
    logged_in_failure,

    logged_out_request,
    logged_out_success,
    logged_out_failure,
} from "../../types";

const initial_state = {
    is_logged_in: false,
    full_name: "",
    email: "",
    phone: "",
    avatar: "",
    gender: "",
    token: "",
    error: "",
};

export default (state = initial_state, action: any) => {
    // console.log({action});
    
    switch (action.type) {
        case logged_in_request:
            return {
                ...state,
                is_logged_in: false,
            };
        case signed_up_request:
            return {
                ...state,
                is_logged_in: false,
            };
        case logged_out_request:
            return {
                ...state,
            };
        case logged_in_success:
            return {
                ...state,
                is_logged_in: true,
                ...action?.payload,
            };
        case signed_up_success:
            return {
                ...state,
                is_logged_in: true,
                ...action?.payload,
            };
        case logged_out_success:
            return {
                full_name: "",
                email: "",
                phone: "",
                avatar: "",
                gender: "",
                token: "",
                error: "",
                is_logged_in: false,
            }    
        case signed_up_failure:
            return {
                is_logged_in: false,
                ...action?.payload,
            };
        case logged_in_failure:
            return {
                is_logged_in: false,
                ...action?.payload,
            }
        case logged_out_failure || 'error_clear':
            return {
                full_name: "",
                email: "",
                phone: "",
                avatar: "",
                gender: "",
                token: "",
                error: "",
                is_logged_in: false,
            }
        default:
            return {...state};
    }
}