import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Layout, Menu, Breadcrumb} from 'antd';
import PropTypes from 'prop-types';
import LoginComponent from "./components/LoginComponent";
import {connect, Provider} from 'react-redux';
import HeaderComponent from "./components/HeaderComponent";
import {getUsersFromServer} from './actions/usersActions';
import { BrowserRouter,Router,Route } from 'react-router-dom'
import {history} from './store';

const {Header, Content, Footer} = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItem: 0
        }
    }

    componentDidMount() {
        this.props.getUsersFromServer();
    }

    handleMenuItems = (item, key) => this.setState({menuItem: item.key});


    render() {
        const {menuItem} = this.state;

        return (
            <div className="App">
                <Layout className="layout">
                    <Header>
                        <HeaderComponent menuItems={this.handleMenuItems}/>
                    </Header>
                    <Content style={{margin: 'auto'}}>
                        <BrowserRouter>
                            <div>
                                <Route path='/login' component={LoginComponent} />
                                <Route path='/create-question' component={LoginComponent} />
                            </div>
                        </BrowserRouter>
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
    getUsersFromServer: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    users: Object.values(state.users.items)
});

function mapDispatchToProps(dispatch) {
    //return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, {getUsersFromServer})(App);
