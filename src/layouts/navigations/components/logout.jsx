import React from 'react';
import { useHistory } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';

const Logout = () => {
    const history = useHistory();
    return (
        <React.Fragment>
            <span>
                <span style={{cursor: 'pointer'}} onClick={() => history.push('/signup-login')} className="m-0"><LogoutOutlined /> Logout</span>
            </span>
        </React.Fragment>
    );
};

export default Logout;