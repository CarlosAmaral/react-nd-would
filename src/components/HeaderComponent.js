import React, {Component} from 'react';
import {Menu} from "antd";


class HeaderComponent extends Component {

    render() {
        return (
            <div>
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{lineHeight: '64px'}}>
                    <Menu.Item key="1">Home</Menu.Item>
                    <Menu.Item key="2">New Question</Menu.Item>
                    <Menu.Item key="3">Leader Board</Menu.Item>
                    <Menu.Item key="4">Hello, {}</Menu.Item>
                    <Menu.Item key="5">Logout</Menu.Item>
                </Menu>
            </div>
        );
    }
}
export default HeaderComponent;