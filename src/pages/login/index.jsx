import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { login_user, sign_up} from '../../services/actions/login_logout_action';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Input, Select, Button, Alert, notification, Skeleton, Spin, Divider } from 'antd';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [form] = Form.useForm();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { login_logout_reducer } = useSelector(state => state);
    const { is_logged_in, full_name, email, message, error } = login_logout_reducer;
    
    useEffect(() => {
        const {from} = location.state || { from: { pathname: "/"}};
        if (is_logged_in) {
            history.replace(from);
            if(message){
                notification.success({
                    message: 'Success',
                    description: message,
                    placement: 'topRight',
                    duration: 1,
                });
            }
            // history.push('/');
        }
        if(!is_logged_in && error){
            setErrorMessage(message || error);
            notification.error({
                message: 'Error',
                description: error,
                placement: 'topRight',
                duration: 1,
            });
        }
    }, [is_logged_in, error, message]);
    

    const handleLoginSignUpState = (value) => {
        setSignUp(value);
        form.resetFields();
    }

    const handleSignUpLogin = (e) => {
        setLoading(true);
        // console.log({e});
        if(signUp){
            dispatch(sign_up(e));
        }else{
            const dataObj = {email: e.login_email, password: e.login_password};
            dispatch(login_user(dataObj));
        }
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }
    // console.log({signUp, is_logged_in, message, error});
    return (
        <React.Fragment>
            <div className='d-flex justify-content-center align-items-center login-form'>
                <div style={{width: "520px", overflow: 'hidden' }} className='rounded shadow bg-light p-4'>
                    <div className='d-flex justify-content-center align-items-center mt-1'>
                        <Spin spinning={loading} delay={500}>
                            <Form
                                form={form}
                                labelCol={{ span: 20 }}
                                wrapperCol={{ span: 32 }}
                                layout="vertical"
                                name={"login-sign-up-form"}
                                initialValues={{ remember: true }}
                                onFinish={handleSignUpLogin}
                                id={"login-sign-up-form"}
                                onBeforeInput={() => setErrorMessage('')}
                            >
                                <h4 className='text-center awesome'>Welcome To Power Hack World</h4>
                                <Divider>
                                    <h6 className='text-center text-primary'>
                                        {signUp ? "Sign up" : "Login"}
                                    </h6>
                                </Divider>
                                {
                                    signUp 
                                    ? <Row 
                                        gutter={32}
                                        // style={{marginBottom: '10px'}}
                                    >
                                        <Col span={12} 
                                            xs={{span: 24}}
                                            sm={{span: 24}}
                                            md={{span: 24}}
                                            lg={{span: 12}}
                                        >
                                            <Form.Item
                                                label="Full Name"
                                                name="full_name"
                                                rules={[{ 
                                                    required: true, 
                                                    message: 'Please input your full name!',
                                                    length: {
                                                        min: 3,
                                                        max: 20
                                                    },
                                                }]}
                                            >
                                                <Input type="text" className="form-input-field w-100 m-0" placeholder="Full Name" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} 
                                            xs={{span: 24}}
                                            sm={{span: 24}}
                                            md={{span: 24}}
                                            lg={{span: 12}}
                                        >
                                            <Form.Item
                                                label="Phone Number"
                                                name="phone"
                                                rules={[{ 
                                                    required: true, 
                                                    message: 'Please input your valid phone number [0-9 digit]!',
                                                    pattern: /^[0-9]{11}$/,
                                                    whitespace: false,
                                                    length: 11
                                                }]}
                                            >
                                                <Input type="text" className="form-input-field w-100 m-0" placeholder="Phone Number" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}
                                            xs={{span: 24}}
                                        >
                                            <Form.Item
                                                label="Email"
                                                name="email"
                                                rules={[{ 
                                                    required: true, 
                                                    message: 'Please input your email!',
                                                    type: 'email',
                                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                    length: {
                                                        min: 13,
                                                        max: 20
                                                    }
                                                }]}
                                            >
                                                <Input type="email" className="form-input-field w-100 m-0" placeholder="Email" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}
                                            xs={{span: 24}}
                                            sm={{span: 24}}
                                            md={{span: 24}}
                                            lg={{span: 12}}
                                        >
                                            <Form.Item
                                                label="Password"
                                                name="password"
                                                rules={[{
                                                    required: true, 
                                                    message: 'Please input your valid password length[5-15]!',
                                                    pattern: /^[a-zA-Z0-9 ]{5,15}$/,
                                                    length: {
                                                        min: 5,
                                                        max: 15
                                                    }
                                                }]}
                                            >
                                                <Input allowClear type="password" className="form-input-field w-100 m-0" placeholder="Password" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}
                                            xs={{span: 24}}
                                            sm={{span: 24}}
                                            md={{span: 24}}
                                            lg={{span: 12}}
                                        >
                                            <Form.Item
                                                label="Confirm Password"
                                                name="confirm_password"
                                                dependencies={['password']}
                                                hasFeedback
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please confirm your password!',
                                                        // pattern: /^[a-zA-Z0-9 ]{5,15}$/,
                                                    },
                                                    ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                            if (!value || getFieldValue('password') === value) {
                                                                return Promise.resolve();
                                                            }
                                                            return Promise.reject('The two passwords that you entered do not match!');
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input allowClear type="password" className="form-input-field w-100 m-0" placeholder="Confirm Password" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Address"
                                                name="address"
                                                rules={[{ required: false }]}
                                            >
                                                <Input.TextArea
                                                    allowClear
                                                    className="form-input-field w-100 m-0"
                                                    placeholder="address"
                                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                                />
                                            </Form.Item>
                                            <Form.Item className="mt-2">
                                                <Button type="primary" htmlType="submit" className="w-100">
                                                    Sign Up
                                                </Button>
                                            </Form.Item>
                                            <p className='text-primary text-center'>
                                                Already have an account? <span style={{cursor: 'pointer'}} className="text-danger text-decoration-underline" onClick={() => {
                                                    handleLoginSignUpState(false);
                                                }}>Login!</span>
                                            </p>
                                        </Col>
                                    </Row>
                                    : <Row 
                                        gutter={32}
                                    >
                                        <Col span={24}
                                            xs={{span: 24}}
                                        >
                                            <Form.Item
                                                label="Email"
                                                name="login_email"
                                                rules={[{ 
                                                    required: true, 
                                                    message: 'Please input your email!',
                                                    type: 'email',
                                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                    length: {
                                                        min: 13,
                                                        max: 20
                                                    }
                                                }]}
                                            >
                                                <Input type="email" className="form-input-field w-100 m-0" placeholder="Email" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}
                                            xs={{span: 24}}
                                        >
                                            <Form.Item
                                                label="Password"
                                                name="login_password"
                                                rules={[{
                                                    required: true, 
                                                    message: 'Please input your valid password length[1-15]!',
                                                    pattern: /^[a-zA-Z0-9 ]{1,15}$/,
                                                    length: {
                                                        min: 1,
                                                        max: 15
                                                    }
                                                }]}
                                            >
                                                <Input allowClear type="password" className="form-input-field w-100 m-0" placeholder="Password" />
                                            </Form.Item>
                                            <Form.Item className="mt-3">
                                                <Button type="primary" htmlType="submit" className="w-100">
                                                    Login
                                                </Button>
                                            </Form.Item>
                                            <p className='text-primary text-center'>
                                                Are you a new user? <span style={{cursor: 'pointer'}} className='text-danger text-decoration-underline' onClick={() => {
                                                    handleLoginSignUpState(true);
                                                }}>Sign up!</span>
                                            </p>
                                        </Col>
                                    </Row>
                                }
                                {
                                    errorMessage
                                    ? <Alert message={errorMessage} onClick={() => setErrorMessage('')} type="error" showIcon closeText="Close" />
                                    : null
                                }
                            </Form>
                        </Spin>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Login;