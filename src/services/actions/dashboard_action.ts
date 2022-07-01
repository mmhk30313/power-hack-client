import { get_users_details, get_bills_details } from "../service_function/deshboard_service";
import { 
    user_bills_request,
    user_bills_success,
    user_bills_failure,
} from "../types";

// All users and bills for summerizing in dashboard
export const get_users_bills_details = () => {
    // console.log("get_users_bills_details");
    return async(dispatch: any) => {
        try {
            dispatch({
                type: user_bills_request,
            });

            const user_res = await get_users_details();
            // console.log({user_res});
            const bill_res = await get_bills_details(1, 10);
            // console.log({bill_res});
            
            dispatch({
                type: user_bills_success,
                payload: [
                    {title: "Users", length: user_res?.data?.length,},
                    {title: "Bills", length: bill_res?.data?.billing_data_length,}, 
                ],
            });
                
            
        } catch (error: any) {
            dispatch({
                type: user_bills_failure,
                payload: error.message,
            });
        }
            
    };
        
}

