import { Fragment, PureComponent } from "react";
import { Link } from 'react-router-dom';
import { Card, Layout, Menu, Tooltip } from 'antd';
import { 
    MenuUnfoldOutlined, MenuFoldOutlined, 
    UserOutlined, 
    // SelectOutlined, LogoutOutlined,
    DollarOutlined, BankOutlined,  
} from '@ant-design/icons';
import './navigations.scss';
import React from "react";
// import { useSelector } from "react-redux";
import Logout from "./components/logout";
// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

type MyProps = {
    user: any
};

type MyState = { collapsed: boolean, key: string, user: any };
export default class DashNavigation extends PureComponent<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            collapsed: false,
            key: window.location.pathname,
            user: props?.user,
        };
    }

    componentDidUpdate() {
        const pathname = window.location.pathname;
      //   console.log({pathname});
        
        this.setState({
          key: pathname,
        });
    }

    // shouldComponentUpdate() {
    //   const pathname = window.location.pathname;
    //   console.log("path: ", {pathname});
    //   const currentKey = this.state.key;
    //   console.log("key: ", {currentKey});
    //   if(pathname === currentKey) {
    //     return false;
    //   }
    //   return true;
    // }


    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    };

    
  
    render() {
        // console.log({key: this.state.key});
        const {children} = this.props;
        const {user} = this.state;
        console.log({user});
        const buildAcronym = (str = '') => {
            
            const strArr = str.split(' ');
            let res = '';
            strArr.forEach(el => {
               const [char]: any = el;
               if(char === char.toUpperCase() && char !== char.toLowerCase()){
                  res += char;
               };
            });
            return res;
        };
        
        return (
            <Fragment>
                <Layout className="bg-white">
                    <Sider
                        width={200}
                        trigger={null} 
                        collapsible
                        collapsed={this.state.collapsed}
                        className="site-layout-background"
                        breakpoint="lg"
                        collapsedWidth="50"
                        onBreakpoint={(broken) => {
                            // console.log({broken});
                            this.setState({collapsed: broken})
                        }}
                    >
                        <div className='logo'>
                            <div className="text-dark font-weight-bold border border-info bg-light px-2 rounded-circle mx-1">
                                <h5 style={{cursor: 'pointer'}} className="text-success text-center"><BankOutlined /></h5>
                                {/* <p className="awesome text-left">Power Hack</p> */}
                            </div>
                            {/* <img className="img-fluid rounded-circle" src={user?.avatar} alt="user" height={35} width={35} /> <span>{user?.name?.match(/\b([A-Z])/g).join('')}</span> */}
                            {/* <UserOutlined className="logo-img" /> <span>MMHK</span> */}
                        </div>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[this.state.key]}
                            style={{borderRight: 0 }}
                        >
                            <Menu.Item key="/" icon={<BankOutlined />}>
                                <Link to="/" className="link-item">Dashboard</Link>
                            </Menu.Item>
                            <Menu.Item key="/bill-list" icon={<DollarOutlined />}>
                                <Link to='/bill-list'>Bill Management</Link>    
                            </Menu.Item>
                            
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0' }}>
                        <Header className="d-flex justify-content-between align-items-center p-4" style={{ padding: 5, background: '#fff', borderBottom: '1px solid #ddd' }}>
                            {
                                React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: this.toggle,
                                })
                            }
                            <div className="mt-4">
                                <p className="awesome text-left">Power Hack</p>
                            </div>
                            <div>
                            <Tooltip overlayInnerStyle={{width: '140px'}} color={"white"} placement="bottomRight" 
                                title={
                                    <div className="px-1">
                                        <div className="text-dark font-weight-bold border-bottom w-100 px-3 pb-1">
                                            <Logout/>
                                        </div>
                                        <div className="text-dark font-weight-bold border-bottom w-100 px-3 pb-1">
                                            <span
                                                style={{cursor: 'pointer'}} 
                                                className="d-flex justify-content-around align-items-center"
                                            >
                                                <UserOutlined/> <span className="ml-2">Account</span>
                                            </span>
                                        </div>
                                    </div>
                                }
                            >
                                <small 
                                    style={{fontWeight: 500, cursor: 'pointer'}} 
                                    className="border border-info rounded-circle bg-light m-0 p-2 text-capitalize"
                                >
                                    {buildAcronym(user?.full_name || "Md. Mehedi Hasan Khan")}
                                </small>
                            </Tooltip>
                            </div>
                        </Header>
                        <Content className="content-layout-background">
                            {
                                children
                            }
                        </Content>
                    </Layout>
                    
                </Layout>
                
            </Fragment>
        );
    }
}