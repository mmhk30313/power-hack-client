import { add_new_bill, get_bills, remove_bill, update_bill } from "../service_function/billing_service";
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
} from "../types";

// Search and filter with pagination for bills
export const filter_bills = (filter_obj: any) => {
    console.log({filter_obj});
    
    return async(dispatch: any) => {
        try {
            dispatch({
                type: filter_bills_request,
            });

            const bill_res = await get_bills(filter_obj);
            // console.log({bill_res});
            if(bill_res?.status){
                dispatch({
                    type: filter_bills_success,
                    payload: bill_res?.data,
                });
            }else{
                throw new Error(bill_res?.message || "Something went wrong");
            }
            
        } catch (error: any) {
            dispatch({
                type: filter_bills_failure,
                payload: {error: error.message},
            });
        }
            
    };
        
}

// Create Bill
export const add_bill = (bill_obj: any) => {
    return async(dispatch: any) => {
        try {
            dispatch({
                type: add_bill_request,
            });

            const create_bill_res = await add_new_bill(bill_obj);
            console.log({create_bill_res});
            if(create_bill_res?.status){
                dispatch({
                    type: add_bill_success,
                    payload: {...create_bill_res?.data, message: create_bill_res?.message || "Bill added successfully"},
                });
            }else{
                throw new Error(create_bill_res?.message || "Something went wrong");
            }
            
        } catch (error: any) {
            dispatch({
                type: add_bill_failure,
                payload: {error: error.message},
            });
        }
            
    };
        
}

// Update Bill
export const edit_bill = (bill_obj: any) => {
    return async(dispatch: any) => {
        try {
            dispatch({
                type: update_bill_request,
            });

            const create_bill_res = await update_bill(bill_obj);
            console.log({create_bill_res});
            if(create_bill_res?.status){
                dispatch({
                    type: update_bill_success,
                    payload: {...create_bill_res?.data, message: create_bill_res?.message || "Bill updated successfully"},
                });
            }else{
                throw new Error(create_bill_res?.message || "Something went wrong");
            }
            
        } catch (error: any) {
            dispatch({
                type: update_bill_failure,
                payload: {error: error.message},
            });
        }
            
    };
        
}

// Delete Bill
export const delete_bill = (bill_id: string) => {
    
    return async(dispatch: any) => {
        try {
            dispatch({
                type: delete_bill_request,
            });

            const bill_res = await remove_bill(bill_id);
            // console.log({bill_res});
            if(bill_res?.status){
                dispatch({
                    type: delete_bill_success,
                    payload: {...bill_res?.data, message: bill_res?.message || "Bill deleted successfully"},
                });
            }else{
                throw new Error(bill_res?.message || "Something went wrong");
            }
            
        } catch (error: any) {
            dispatch({
                type: delete_bill_failure,
                payload: {error: error.message},
            });
        }
            
    };
        
}