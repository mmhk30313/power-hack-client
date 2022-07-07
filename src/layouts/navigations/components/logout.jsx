import React from 'react';
import { useHistory } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logged_out } from '../../../services/actions/login_logout_action';
import { notification } from 'antd';

const Logout = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logged_out());
        // history.push('/signup-login');
        setTimeout(() => {
            notification ['success'] ({
                message: 'Logout Successfully',
                description: 'You have been logged out successfully',
                placement: 'topRight',
                duration: 2
            });
        }, 1000);
    }
    return (
        <React.Fragment>
            <span onClick={() => handleLogout()}
                style={{cursor: 'pointer'}} 
                className="m-0 d-flex justify-content-around align-items-center"
            >
                <LogoutOutlined /> <span>Logout</span>
            </span>
        </React.Fragment>
    );
};

export default Logout;