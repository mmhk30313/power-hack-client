import { request } from "../request"

export const get_bills = (params: any = {}) => {
    return request("/api/billing-list", {body: params, method: "POST"});
}

export const add_new_bill = (bill_obj: any) => {    
    return request("/api/add-billing", {body: bill_obj, method: "POST"});
}

export const update_bill = (bill_obj: any) => {    
    return request("/api/update-billing/"+bill_obj?.bill_id, {body: bill_obj, method: "POST"});
}

export const remove_bill = (bill_id: any) => {    
    return request("/api/delete-billing/"+bill_id, {method: "DELETE"});
}