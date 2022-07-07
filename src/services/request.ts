import { baseUrl, liveUrl } from "./server";
const axios = require('axios');
export const request = (link: String, params: any) => {let headers: any = {
        // 'Content-type': 'application/json; charset=UTF-8',
        
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "Content-Type, Authorization",
        // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        // "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        // "Authorization": `Bearer ${getCookie('token', document?.cookie)}`,
    }
    params?.header && (headers["Content-type"] = params.header);
    let token: any = null;
    if (localStorage?.getItem("accessToken")) {
        token = localStorage.getItem("accessToken");
        // console.log("====token applied from client/browser local storage====", token);
    } 
    
    token && (headers = { ...headers, ...{ Authorization: `Bearer ${token}` } });
    const url = (liveUrl || baseUrl) + link;
    let fetchConfig: any = {
        method: (params && params?.method) || "get",
        url: url,
        // baseURL: server,
        params: (params && params?.params) || "",
        // body: (params && params.body) || "",
        headers: headers,
    };
    
    params?.body && (fetchConfig = {
        ...fetchConfig,
        data: params?.body,
    });
    // console.log({fetchConfig});
    // params?.method === 'post' && ( fetchConfig.headers);
    // console.log({fetchConfig});
    
    // console.log({url});
    
    return axios(fetchConfig)
    .then((response: { data: any; }) => {
        const { data } = response;
        // console.log({response});
        
        return data || {status: false, messages: "No data found"};
    }).catch(
        function (error: any) {
          console.log('Show error notification!')
          return Promise.reject(error?.response?.data);
        }
    );
        
    
}