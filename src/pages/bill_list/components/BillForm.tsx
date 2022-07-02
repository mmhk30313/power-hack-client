import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AntModal from '../../../components/AntModal';
import { add_bill, edit_bill } from '../../../services/actions/billing_action';

const BillForm = (props: any = {}) => {
    const dispatch: any = useDispatch();
    const { 
        editableData, setEditableData,
        handleCancel,
        visibleModal, setVisibleModal, 
        modal_title
    } = props;
    const [form] = Form.useForm();
    const handleSubmit = (values: any) => {
        // console.log(values);
        if(editableData?.bill_id) {
            dispatch(edit_bill({...values, bill_id: editableData?.bill_id}));
        }else{
            dispatch(add_bill(values));
        }
        form.resetFields();
        handleReject();
    }

    const handleReject = (cancel_flag: boolean = false) => {
        setVisibleModal(false);
        setEditableData(null);
        handleCancel(cancel_flag);
        form.resetFields();
    }
    return (
        <React.Fragment>
            <AntModal 
                handleCancel={handleReject} 
                visibleModal={visibleModal} 
                setVisibleModal={setVisibleModal} 
                modal_title={modal_title}
            >
                <Form
                    form={form}
                    labelCol={{ span: 20 }}
                    wrapperCol={{ span: 32 }}
                    layout="vertical"
                    name={"bill-form"}
                    // initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                    id={"bill-form"}
                    initialValues={editableData}
                >
                    <Row gutter={32}> 
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
                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    whitespace: false,
                                }]}
                            >
                                <Input type="email" className="form-input-field w-100 m-0" placeholder="Email" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Paid Amount"
                                name="paid_amount"
                                rules={[{ required: true, message: 'Please input your paid amount!' }]}
                            >
                                <Input
                                    allowClear
                                    className="form-input-field w-100 m-0"
                                    placeholder="Paid Amount"
                                />
                            </Form.Item>
                            <Form.Item className="mt-2">
                                <Button type="primary" htmlType="submit" className="w-100">
                                    {editableData ? "Update" : "Submit"}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    {/* {
                        errorMessage
                        ? <Alert message={errorMessage} onClick={() => setErrorMessage('')} type="error" showIcon closeText="Close" />
                        : null
                    } */}
                </Form> 
            </AntModal>
        </React.Fragment>
    );
};

export default BillForm;