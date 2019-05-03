import React from 'react';
import {Link} from 'react-router-dom'

import {
    Layout, Menu, Breadcrumb, Icon,
} from 'antd';

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;


import './index.less'

export default class Home extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    }

    render() {

        return (
            <React.Fragment>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className="logo"/>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <SubMenu
                                key="sub1"
                                title={<span><Icon type="team"/><span>用户中心</span></span>}
                            >
                                <Menu.Item key="1">
                                    <Link to="/home">基本信息</Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link to="/home/innerEdit">内部编辑</Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Link to="/home/rowEdit">各种编辑</Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Link to="/home/rowAdd">添加信息</Link>
                                </Menu.Item>
                                <Menu.Item key="5">
                                    <Link to="/home/rowLink">增删</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={<span><Icon type="team"/><span>购物车</span></span>}
                            >
                                <Menu.Item key="6">
                                    <Link to="/home/cart">购物车</Link>
                                </Menu.Item>
                                <Menu.Item key="8">
                                    <Link to="/home/todo">Todo</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub3"
                                title={<span><Icon type="team"/><span>可视化</span></span>}
                            >
                                <Menu.Item key="9">
                                    <Link to="/home/box">柱形</Link>
                                </Menu.Item>
                                <Menu.Item key="10">
                                    <Link to="/home/line">折线图</Link>
                                </Menu.Item>
                                <Menu.Item key="11">
                                    <Link to="/home/circle">饼图</Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}/>
                        <Content style={{margin: '0 16px'}}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                                {this.props.children}
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            Ant Design ©2018 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>
            </React.Fragment>
        )
    }
}