import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Layout, Menu, Breadcrumb} from 'antd';
import PropTypes from 'prop-types';
import LoginComponent from "./components/LoginComponent";
import {connect, Provider} from 'react-redux';
import HeaderComponent from "./components/HeaderComponent";
import {getUsersFromServer} from './actions/usersActions';

const {Header, Content, Footer} = Layout;

class App extends Component {

    componentDidMount() {
        this.props.getUsersFromServer();
    }

    render() {
        return (
            <div className="App">
                <div><ul>
                    {this.props.users.map(m => <li>{m.name}</li>)}
                </ul></div>
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

App.propTypes = {
    getUsersFromServer: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    users: Object.values(state.users.items)
});

function mapDispatchToProps(dispatch) {
    //return bindActionCreators(actionCreators, dispatch);
}


//export default connect(mapDispatchToProps, mapStateToProps)(App);
export default connect(mapStateToProps, {getUsersFromServer})(App);
