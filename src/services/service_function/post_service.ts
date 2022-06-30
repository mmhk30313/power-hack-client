import { request } from "../request"

export const get_posts = (url="https://jsonplaceholder.typicode.com/posts") => {
    return request(url, null);
}

export const get_posts_descending_order = async () => {
    const posts = await get_posts();
    return posts.sort((a: any, b: any) => b.id - a.id);
}
