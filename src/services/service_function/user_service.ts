import { request } from "../request"

export const get_users = (url: string, params: any) => {
    return request(url, params);
}

export const get_user_details = (url: string) => {
    return request(url, null);
}

export const get_user_posts = (url: string) => {
    return request(url, null);
}