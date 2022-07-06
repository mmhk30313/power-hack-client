import { Button, Card, Col, Divider, Input, notification, Popconfirm, Row, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AntModal from '../../components/AntModal';
// import { connect } from 'react-redux';
import { delete_bill, filter_bills } from '../../services/actions/billing_action';
import BillForm from './components/BillForm';

export default function BillList (props: any) {
    const {billing_reducer} = useSelector((state: any) => state);
    const { is_loading, billing_list, billing_data_length, total_paid_amount, message, error} = billing_reducer;
    // console.log({billing_list});
    const dispatch: any = useDispatch();
    const [isAddBill, setIsAddState] = React.useState(false);
    // const [isEditBill, setIsEditBill] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [columns, setColumns]:any = React.useState([]);
    const [bill_id, setBillId] = React.useState(null);
    const [searchType, setSearchType] = React.useState('');
    const [searchValue, setSearchValue] = React.useState('');
    const [pageObj, setPageObj] = React.useState({page: 1, limit: 10});
    const [modalVisible, setModalVisible] = React.useState(false);
    const [editableData, setEditableData] = React.useState(null);

    useEffect(() => {
        // setLoading(true);
        dispatch(filter_bills(pageObj));
        const columns = [
            {
                title: 'Bill ID',
                dataIndex: 'bill_id',
                key: 'bill_id',
            },
            {
                title: 'Name',
                dataIndex: 'full_name',
                key: 'full_name',
                render: (text: any) => <a>{text}</a>,
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
                title: 'Paid Amount (BDT)',
                dataIndex: 'paid_amount',
                key: 'paid_amount',
                align: 'center',
                render: (text: any) => <span>{text}</span>,
            },
            {
                title: "Action",
                key: 'action',
                render: (text: any, record: any) => (
                    <span>
                        <a className='text-primary'
                            onClick={() => {
                                setEditableData(record);
                                handleAddEditBill({flag: "edit", bill_id: record.bill_id});
                            }}
                        >Edit</a>
                        <Divider className='border border-dark' type="vertical"/>
                        <Popconfirm
                            title="Are you sure to delete this bill?"
                            onConfirm={() => handleDeleteBill(record?.bill_id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <span style={{color: "red", cursor: 'pointer'}}>Delete</span>
                        </Popconfirm>
                    </span>
                ),
                align: 'center',
            },
        ];
        setColumns(columns);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [""]);
    

    const handleAddEditBill = (value: any) => {
        if (value?.flag === 'add') {
            // ({isAddBill: true});
            setBillId(null);
            setIsAddState(true);
        } else {
            // this.setState({isEditBill: true});
            setIsAddState(false);
            setBillId(value?.bill_id);
        }
        setModalVisible(true);
    }
    
    const handleCancel = (cancel_flag: boolean = false) => {
        if(!cancel_flag){
            if(bill_id){
                notification.success({
                    message: 'Success',
                    description: 'Bill has been updated successfully',
                    duration: 2,
                });
            }else{
                notification.success({
                    message: 'Success',
                    description: 'Bill has been added successfully',
                    duration: 2,
                });
            }
            setLoading(true);
            dispatch(filter_bills(pageObj));
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
        setBillId(null);
        setModalVisible(false);
        setIsAddState(false);
        setEditableData(null);
    }

    const handleDeleteBill = (bill_id: string) => {
        // console.log(bill_id);
        dispatch(delete_bill(bill_id));
        handleCancel();
    }

    const handleSearch = (value: any) => {
        dispatch(filter_bills({...pageObj, [`${searchType}`]: value}));
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    const TableSearchCard = <Card className='p-0 bg-light'>
                        <Row gutter={32}>
                            <Col span={21} lg={21} md={24} xs={24}>
                                <Row gutter={32}>
                                    <Col span={2} lg={2} md={3} xs={24}>
                                        <p className='pt-2'>Search</p>
                                    </Col>
                                    <Col span={6} lg={6} md={10} xs={24}>
                                        <Select 
                                            style={{cursor: 'pointer'}}
                                            placeholder="Select an option" 
                                            className='select-search' 
                                            allowClear showSearch 
                                            onChange={(value: string) => {
                                                setSearchType(value);
                                                setPageObj({page: 1, limit: 10});
                                                setSearchValue('');
                                                if(!value) {
                                                    dispatch(filter_bills({page: 1, limit: 10}));
                                                }
                                            }}
                                        >
                                            <Select.Option value="full_name">Full Name</Select.Option>
                                            <Select.Option value="email">Email</Select.Option>
                                            <Select.Option value="phone">Phone</Select.Option>
                                        </Select>
                                    </Col>
                                    <Col span={7} lg={7} md={8} xs={24} className='my-1'>
                                        {
                                            searchType 
                                            && <Input 
                                                // style={{width: "fit-content"}}
                                                placeholder={`Search by ${searchType}`}
                                                onChange={(e: any) => {
                                                    setLoading(true);
                                                    setPageObj({page: 1, limit: 10});
                                                    handleSearch(e.target.value);
                                                    setSearchValue(e.target.value);
                                                }}
                                            />
                                        }
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={3} lg={3} md={4} xs={24} className="my-1">
                                <Button type="primary" className=''
                                    onClick={() => handleAddEditBill({flag: "add"})}
                                >
                                    Add New Bill
                                </Button>
                            </Col>
                        </Row>
                    </Card>
    return (
        <React.Fragment>
            {
                modalVisible
                ? <BillForm 
                    visibleModal={modalVisible} 
                    setVisibleModal={setModalVisible}
                    handleCancel={handleCancel}
                    modal_title={isAddBill ? "Create A New Bill" : "Update A Bill"} 
                    editableData={editableData} setEditableData={setEditableData} 
                />
                : null
            }

            <div className='table-search-card-mobile'>
                {
                    TableSearchCard
                }
            </div>

            <Card
                title={<h6>Bill List</h6>}
                extra={<h6>Paid Total: {total_paid_amount} BDT</h6>}
                bordered={false}
            >
                <Table
                    title={() => <div className='table-search-card-not-mobile'>
                        {
                            TableSearchCard
                        }
                    </div>}
                    // style={{height: 350}}
                    columns={columns}
                    dataSource={billing_list}
                    loading={loading}
                    bordered
                    rowKey={(record: any) => record.bill_id}
                    pagination={{
                        total: billing_data_length,
                        // showSizeChanger: true,
                        showQuickJumper: true,
                        onChange: (page: number, pageSize: number) => {
                            // console.log(page, pageSize);
                            setLoading(true);
                            setPageObj({page, limit: pageSize});
                            let dataObj = {page, limit: pageSize};
                            searchType && (dataObj = {...dataObj, [`${searchType}`]: searchValue});
                            dispatch(filter_bills(dataObj));
                            setTimeout(() => {
                                setLoading(false);
                            }, 1000);
                        },
                        // onShowSizeChange: (current: number, size: number) => {
                        //     console.log(current, size);
                        // },
                        position: ['bottomCenter'],
                        showTotal: (total: any) => `Total ${total} Bills`,
                    }}
                    scroll={{ x: 550, y: 280 }}
                />
            </Card>
        </React.Fragment>
    )
    
}

// const mapStateToProps = (state: any) => {
//     // console.log("Own props: ", ownProps);
//     return {
//         state: {...state},
//     };
// };

// const mapDispatchToProps = (dispatch: any) => {
//     return {
//         get_bills: (filter_obj: any) => dispatch(filter_bills(filter_obj)),
//     };
// }

// export default connect(mapStateToProps, mapDispatchToProps) (BillList);

