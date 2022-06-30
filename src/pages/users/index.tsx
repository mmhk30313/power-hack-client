import { Card, Table } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_all_users } from '../../services/actions/user_action';
import Details from './Components/Details';

const Users = () => {
    const [columns, setColumns]: any = useState([]);
    const [data, setData]: any = useState([]);
    const [dataId, setDataId]: any = useState(0);
    const [visibleModal, setVisibleModal]: any = useState(false);
    const {
        is_loading,
        users,
    } = useSelector((state: any) => state.user_reducer);
    const dispatch: any = useDispatch();

    const showDetails = (id: number) => {
        // console.log({id});
        setDataId(id);
        setVisibleModal(true);
    }

    useEffect(() => {
        dispatch(get_all_users());
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text: any) => <Fragment>{text}</Fragment>,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
                render: (text: any) => <Fragment>
                    <div>{text?.street}</div>
                    <div>{text?.suite}, {text?.city}</div>
                </Fragment>,
            },
            {
                title: "See more",
                dataIndex: 'id',
                key: 'id',
                render: (id: number) => (
                    // <span >See Details</span>
                    <EyeOutlined onClick={() => showDetails(id)} className='text-primary' style={{cursor: 'pointer'}} />
                ),
                align: 'center',
            }
        ];
        setData(users);
        setColumns(columns);
    }, [users?.length]);
    // console.log({users, columns});
    return (
        <React.Fragment>
           
            <Card
                title={<h3>Users</h3>}
                bordered={false}
                loading={is_loading}
            >
                
                <Table 
                    columns={columns} 
                    dataSource={data}
                    pagination={{
                        total: data?.length,
                        pageSize: 5,
                        showSizeChanger: true,
                    }}
                    style={{fontSize: 12}}
                    scroll={{ x: 768 }}
                    rowKey={(record: any) => record.id}
                />
                
            </Card> 
            {
                visibleModal
                ? <Details dataId={dataId} visibleModal={visibleModal} setVisibleModal={setVisibleModal} />
                : null
            }
            {/* <Details visibleModal={visibleModal} setVisibleModal={setVisibleModal} dataId={dataId} /> */}
        </React.Fragment>
    );
};

export default Users;