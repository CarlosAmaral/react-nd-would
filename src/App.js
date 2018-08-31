import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Layout, Menu, Breadcrumb} from 'antd';
import 'antd/dist/antd.css'
import LoginComponent from "./components/LoginComponent";
import * as WYRAPI from './utils/WouldYouRatherAPI';

const {Header, Content, Footer} = Layout;

class App extends Component {
    render() {
        return (
            <div className="App">
                <Layout className="layout">
                    <Header>
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
                    </Header>
                    <Content style={{margin: 'auto'}}>
                        <LoginComponent/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </div>
        );
    }
}

export default App;
