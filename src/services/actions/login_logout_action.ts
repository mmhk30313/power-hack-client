import { user_login, user_logout, user_sign_up } from '../service_function/signup_login_service';
import { 
    signed_up_request,
    signed_up_success,
    signed_up_failure,
    logged_in_request, 
    logged_in_failure, 
    logged_in_success,
    logged_out_request, 
    logged_out_failure, 
    logged_out_success, 
} from './../types';

// User registration
export const sign_up = (user_obj: any) => {
    return async (dispatch: any) => {
        dispatch({type: signed_up_request});
        try {
            const signUp_res = await user_sign_up(user_obj);
            console.log({signUp_res});
            
            if(signUp_res?.status) {
                const { accessToken, data, message} = signUp_res;
                console.log({accessToken});
                const {full_name, email, phone, } = data;
                await localStorage.setItem('accessToken', accessToken);
                await localStorage.setItem('full_name', full_name);
                await localStorage.setItem('email', email);
                dispatch({
                    type: signed_up_success,
                    payload: {...data, message: message},
                });
            }else {
                dispatch({
                    type: logged_in_failure,
                    payload: {error: signUp_res?.message || "Something went wrong"},
                });
            }
        }
        catch(error: any) {
            dispatch({
                type: signed_up_failure,
                payload: error.message
            });
        }
    }
}

// User Login
export const login_user = (user_obj: any) => {
    return async(dispatch: any) => {
        try {
            dispatch({
                type: logged_in_request,
            });
            
            const login_res = await user_login(user_obj);
            console.log({login_res});
            
            if(login_res?.status) {
                const { data, accessToken, message} = login_res;
                console.log({accessToken});
                const {full_name, email, phone} = data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('full_name', full_name);
                localStorage.setItem('email', email);
                dispatch({
                    type: logged_in_success,
                    payload: {...data, message: message},
                });
            }else {
                dispatch({
                    type: logged_in_failure,
                    payload: {error: login_res?.message || "Something went wrong"},
                });
            }
        } catch (error: any) {            
            dispatch({
                type: logged_in_failure,
                payload: {error: error?.message || "Something went wrong"},
            });
        }
    };
}

// User Logout
export const logged_out = () => {
    return async(dispatch: any) => {
        try {
            const logout_res = await user_logout();
            localStorage.removeItem('accessToken');
            localStorage.removeItem('full_name');
            localStorage.removeItem('email');

            if(logout_res?.status) {
                dispatch({
                    type: logged_out_success,
                    payload: {},
                });
            }else{
                dispatch({
                    type: logged_out_failure,
                    payload: {error: logout_res?.message || "Logout failed"},
                });
            }
        } catch (error: any) {
            dispatch({
                type: logged_out_failure,
                payload: {error: error?.message || "Logout failed"},
            });
        }
    };
};

export const set_login_data_for_reload = () => {
    return async(dispatch: any) => {
        const full_name = localStorage.getItem('full_name');
        const email = localStorage.getItem('email');
        dispatch({
            type: logged_in_success,
            payload: {full_name, email},
        });
    };
}
