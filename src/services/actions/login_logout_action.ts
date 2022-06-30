import { logged_in, logged_out } from '../types';

export const set_logged_user = (payload: any) => {
    return {
        type: logged_in,
        payload,
    };
};

export const set_logged_out = () => {
    return {
        type: logged_out,
    };
};
