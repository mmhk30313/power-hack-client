import { request } from '../request';

export const user_sign_up = async(user_obj: any) => {
    return await request("/api/registration", {body: user_obj, method: "POST"});
}

export const user_login = async(user_obj: any) => {
    return await request("/api/login", {body: user_obj, method: "POST"});
}

export const user_logout = async() => {
    return request("/api/logout", {method: "POST"});
}