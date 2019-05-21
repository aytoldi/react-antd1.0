import React from 'react';
import {Link,NavLink} from 'react-router-dom'
import styles from "./navLeft.less";


import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import menuConfig from "../../../config/menuConfig";

console.log(menuConfig,'ss');
const {Sider} = Layout;
const SubMenu = Menu.SubMenu;

export default class NavLeft extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };


    componentWillMount() {
        let treeNode = this.renderMenu(menuConfig.requestRouter);//渲染菜单
        this.setState({
            treeNode
        })
    }

    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (<SubMenu key={item.key} title={item.title}>{this.renderMenu(item.children)}</SubMenu>)
            }
            return <Menu.Item key={item.key} title={item.title}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className={styles.navLeft}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <Menu  theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            {this.state.treeNode}

                        </Menu>
                    </Sider>
                </div>
            </React.Fragment>
        )
    }
}
