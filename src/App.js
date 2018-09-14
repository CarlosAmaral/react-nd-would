import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Layout, Menu, Breadcrumb} from 'antd';
import 'antd/dist/antd.css'
import LoginComponent from "./components/LoginComponent";
import * as WYRAPI from './utils/WouldYouRatherAPI';
import {connect, Provider} from 'react-redux';
import HeaderComponent from "./components/HeaderComponent";

const {Header, Content, Footer} = Layout;

class App extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className="App">
                <Layout className="layout">
                    <Header>
                        <HeaderComponent/>
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


function mapStateToProps(state) {
    //return {...state}
}

function mapDispatchToProps(dispatch) {
    //return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapDispatchToProps, mapStateToProps)(App);
