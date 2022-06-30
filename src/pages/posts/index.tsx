import { Card, Col, Descriptions, Row, Select, Skeleton } from 'antd';
import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_all_posts, get_posts_desc_order } from '../../services/actions/post_action';
import { ascending_user_post_order, descending_user_post_order } from '../../services/actions/user_posts_actions';
import { get_all_users } from '../../services/actions/user_action';
import { get_user_details_posts } from '../../services/actions/user_posts_actions';
import './post.scss';
const {Option} = Select;
const Posts = () => {
    const [selectedUser, setSelectedUser]: any = useState(null);
    const [selectedOrder, setSelectedOrder]: any = useState("ascending");
    const {post_reducer, user_reducer, user_posts_reducer} = useSelector((state: any) => state);
    const {is_loading, post_list} = post_reducer;
    const {users: user_list} = user_reducer;
    const {user_posts, user_details} = user_posts_reducer;
    const dispatch: any = useDispatch();
    useEffect(() => {
        dispatch(get_all_posts());
        dispatch(get_all_users());
    }, []);
    // console.log({user_list});
    
    const setOrderPost = (order: string) => {
        setSelectedOrder(order);
        if(selectedUser) {
            order === 'ascending'
            ? dispatch(ascending_user_post_order())
            : dispatch(descending_user_post_order());
        }else{
            order === 'ascending'
            ? dispatch(get_all_posts())
            : dispatch(get_posts_desc_order());
        }
            
    }

    const searchPostsByUser = (user_id: number) => {
        dispatch(get_user_details_posts(user_id));
        setSelectedUser(user_id);
    }

    // console.log({user_details});
    
    return (
        <React.Fragment>
            <Card
                title={<h3>Posts</h3>}
                bordered={false}
                loading={is_loading && !post_list?.length}
            >
                <Row gutter={32}>
                    <Col span={8} xs={24} md={12} lg={12}>
                       <p>Search posts by Author</p>
                       <Select
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="Select an author"
                            optionFilterProp="children"
                            onChange={(value: number) => {
                                searchPostsByUser(value);
                                setSelectedOrder("ascending");
                            }}
                            filterOption={(input: any, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            allowClear
                        >
                            {user_list?.map((user: any) => (
                                <Option key={user?.id} value={user?.id}>
                                    {user.name}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={8} xs={24} md={12} lg={12}>
                            <p>Sort Action</p>
                            <Select
                                value={selectedOrder}
                                style={{ width: "100%" }}
                                onChange={(value: string) => {
                                    setOrderPost(value);
                                }}
                                className="mb-3"
                            >
                                <Option value="ascending">Ascending</Option>
                                <Option value="descending">Descending</Option>
                            </Select>
                        </Col>
                    {/* {
                        !selectedUser
                        ? <Col span={8} xs={24} md={12} lg={12}>
                            <p>Sort Action</p>
                            <Select
                                defaultValue="ascending"
                                style={{ width: "100%" }}
                                onChange={(value: string) => {
                                    setOrderPost(value);
                                }}
                                className="mb-3"
                            >
                                <Option value="ascending">Ascending</Option>
                                <Option value="descending">Descending</Option>
                            </Select>
                        </Col>
                        : null
                    } */}
                </Row>
                {
                    selectedUser ?
                    <Skeleton 
                        loading={!user_details?.id} 
                        className="mt-3"
                    >
                        <Descriptions style={{background: '#ddeabc'}}  title="Author Details" className='my-3 p-3'>
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
                    </Skeleton>
                    : null
                        
                }
                <br />
                <Row gutter={32}>
                    {
                        selectedUser && user_details?.id
                        ? user_posts?.map((post: any) => {
                            return (
                                <Col key={post?.id} span={8} xs={24} md={12} lg={8}>
                                    <Card
                                        title={post.title}
                                        extra={post?.id}
                                        loading={is_loading}
                                        className="my-2 rounded card-style"
                                    >
                                        <p>{post?.body?.substr(0, 160)}...</p>
                                    </Card>
                                </Col>
                            )
                        })
                        : post_list?.map((post: any) => {
                            return (
                                <Col key={post?.id} span={8} xs={24} md={12} lg={8}>
                                    <Card
                                        title={post.title}
                                        extra={post?.id}
                                        loading={is_loading}
                                        className="my-2 rounded card-style"
                                    >
                                        <p>{post?.body?.substr(0, 160)}...</p>
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

export default Posts;

