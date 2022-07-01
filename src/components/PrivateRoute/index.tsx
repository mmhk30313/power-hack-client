import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { set_login_data_for_reload } from '../../services/actions/login_logout_action';
// import { logged_out } from '../../../services/types';

const PrivateRoute = ({children, ...rest}: any) => {
    const dispatch: any = useDispatch();
    const state = useSelector((state: any) => state.login_logout_reducer);
    const { is_logged_in } = state;
    // console.log("Private Route: login_state: ",{state});
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        if(accessToken) {
            dispatch(set_login_data_for_reload());
        }
    }, [dispatch, accessToken]);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                is_logged_in 
                ? ( children )  
                : (
                <Redirect
                    to={{
                        pathname: `/signup-login`,
                        state: { from: location }
                    }}
                />
                )
            }
        />
    );
};

export default PrivateRoute;