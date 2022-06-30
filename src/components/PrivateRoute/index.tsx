import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
// import { logged_out } from '../../../services/types';

const PrivateRoute = ({children, ...rest}: any) => {
    const state = useSelector((state: any) => state.login_logout_reducer);
    const { is_logged_in } = state;
    // console.log({is_logged_in});
    
    return (
        <Route
            {...rest}
            render={({ location }) =>
                !is_logged_in 
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