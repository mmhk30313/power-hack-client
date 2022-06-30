import { request } from "../request"

export const get_users_details = () => {
    console.log("get_users_details");
    
    return request("/api/user/all", null);
}

export const get_bills_details = (page: number, limit: number) => {
    return request("/api/billing-list", {page, limit, method: "POST"});
}


