import { Descriptions, Table } from 'antd';
import React, {Fragment, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AntModal from '../../../components/AntModal';
import { get_user_details_posts } from '../../../services/actions/user_posts_actions';
const Details = ({dataId, visibleModal, setVisibleModal}: any) => {
    const {user_details, user_posts} = useSelector((state: any) => state.user_posts_reducer);
    const dispatch: any = useDispatch();
    useEffect(() => {
        dispatch(get_user_details_posts(dataId));
    }, []);
    // console.log({user_details, user_posts});
    const removeModal = () => {
        // setModalVisible(false);
        setVisibleModal(false);
    }
    return (
        <React.Fragment>
            <AntModal
                visibleModal={visibleModal}
                setVisibleModal={removeModal}
                data_title='User Details'
                width={800}
            >
                <Descriptions title="Info">
                    <Descriptions.Item label="Name: ">{user_details?.name}</Descriptions.Item>
                    <Descriptions.Item label="Phone: ">{user_details?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Email: ">{user_details?.email}</Descriptions.Item>
                    <Descriptions.Item label="Company: ">
                        {
                            user_details?.company?.name
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="Address">
                        {
                            user_details?.address?.suite + ", " + user_details?.address?.street+ ", "+ user_details?.address?.city
                        }
                    </Descriptions.Item>
                </Descriptions>
                <Table
                    columns={[
                        {
                            title: 'No.',
                            dataIndex: 'id',
                            key: 'id',
                            width: '10%',
                        },
                        {
                            title: 'Title',
                            dataIndex: 'title',
                            key: 'title',
                            render: (text: any) => <Fragment>{text}</Fragment>,
                        },
                        {
                            title: 'Body',
                            dataIndex: 'body',
                            key: 'body',
                            render: (text: any) => <Fragment>{text}</Fragment>,
                        },
                    ]}
                    dataSource={user_posts}
                    pagination={{
                        pageSize: 5,
                        total: user_posts?.length,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total: number) => `Total ${total} items`,
                    }}
                    scroll={{
                        y: 300,
                    }}
                    rowKey={(record: any) => record.id}
                />
                            
            </AntModal>
        </React.Fragment>
    );
};

export default Details;