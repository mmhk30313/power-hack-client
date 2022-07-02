import { Card, Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_users_bills_details } from '../../services/actions/dashboard_action';
import './dashboard.scss';
const Dashboard = () => {
    const {
        is_loading,
        dashboard_data,
        user_length,
        bill_length,
    } = useSelector((state: any) => state.dashboard_reducer);
    const dispatch: any = useDispatch();
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        console.log("Loading Dashboard");
        setLoading(true);
        dispatch(get_users_bills_details());
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [user_length, bill_length]);
    // console.log({user_length, bill_length, is_loading});
    
    return (
        <React.Fragment>
            <Card 
                title={<h6>Dashboard</h6>}
                loading={loading && !dashboard_data?.length}
                bordered={false}
            >
                <Row gutter={32}>
                    {
                        dashboard_data.map((data: any, index: number) => {
                            return (
                                <Col key={index} md={12} span={8} xs={24} lg={8}>
                                    <Card
                                        bordered={true}
                                        loading={loading}
                                        // loading={is_loading}
                                        className="bg-light p-2 my-3 card-style"
                                    >
                                        <h4 className='data-title'>{data?.title}</h4>
                                        <h5 className='data-length'>{data?.length}</h5>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Card>
        </React.Fragment>
    );
};

export default Dashboard;