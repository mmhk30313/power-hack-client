import { 
    filter_bills_request,
    filter_bills_success,
    filter_bills_failure,
    add_bill_request,
    add_bill_success,
    add_bill_failure,
    update_bill_request,
    update_bill_success,
    update_bill_failure,
    delete_bill_request,
    delete_bill_success,
    delete_bill_failure,
} from "../../types";

const initial_state = {
    is_loading: false,
    billing_list: [],
    billing_data_length: 0,
    total_paid_amount: 0,
    error: null,
    billing_data: {},
}

export default (state = initial_state, action: any) => {
    // console.log({action});
    
    switch (action.type) {
        case filter_bills_request || add_bill_request || update_bill_request || delete_bill_request:
            return {
                ...state,
                is_loading: true,
            };
        case filter_bills_success || add_bill_success || update_bill_success || delete_bill_success:
            return {
                ...state,
                is_loading: false,
                ...action?.payload,
            };
        case filter_bills_failure || add_bill_failure || update_bill_failure || delete_bill_failure:
            return {
                ...state,
                is_loading: false,
                billing_list: [],
                error: action.payload,
                billing_data_length: 0,
                total_paid_amount: 0,
                billing_data: {},

            };
        default:
            return state;
    }
}

