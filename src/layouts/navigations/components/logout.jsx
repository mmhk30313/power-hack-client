import React from 'react';
import { useHistory } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logged_out } from '../../../services/actions/login_logout_action';

const Logout = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logged_out());
        // history.push('/signup-login');
    }
    return (
        <React.Fragment>
            <span>
                <span style={{cursor: 'pointer'}} onClick={() => handleLogout()} className="m-0"><LogoutOutlined /> Logout</span>
            </span>
        </React.Fragment>
    );
};

export default Logout;