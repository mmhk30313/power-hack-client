import { 
    user_bills_request,
    user_bills_success,
    user_bills_failure,
 } from "../../types"

const initial_state = {
    is_loading: false,
    dashboard_data: [],
    user_length: 0,
    bill_length: 0,
    error: null,
}

export default (state = initial_state, action: any) => {
    // console.log({action});
    
    switch (action.type) {
        case user_bills_request:
            return {
                ...state,
                is_loading: true,
            };
        case user_bills_success:
            return {
                ...state,
                is_loading: false,
                // ...action?.payload,
                dashboard_data: [...action?.payload?.data],
                user_length: action?.payload?.user_length,
                bill_length: action?.payload?.bill_length,
            };
        case user_bills_failure:
            return {
                ...state,
                is_loading: false,
                dashboard_data: [],
                error: action.payload,
            };
        default:
            return state;
    }
}