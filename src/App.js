import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Layout, Menu, Breadcrumb} from 'antd';
import PropTypes from 'prop-types';
import LoginComponent from "./components/LoginComponent";
import {connect, Provider} from 'react-redux';
import HeaderComponent from "./components/HeaderComponent";
import HomepageComponent from "./components/HomepageComponent";
import CreateQuestionComponent from "./components/CreateQuestionComponent";
import {getUsersFromServer} from './actions/usersActions';
import {Switch, Route, BrowserRouter} from 'react-router-dom'

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
                <BrowserRouter>
                    <Layout className="layout">

                        <Header>
                            <div>
                                <HeaderComponent menuItems={this.handleMenuItems}/>
                            </div>
                        </Header>
                        <Content style={{margin: 'auto'}}>

                            <Route exact path='/homepage' render={() => (
                                <HomepageComponent/>
                            )}/>
                            <Route exact path='/' render={() => (
                                <LoginComponent/>
                            )}/>
                            <Route exact path='/create-question' render={() => (
                                <CreateQuestionComponent/>
                            )}/>

                        </Content>

                        <Footer style={{textAlign: 'center'}}>
                            What Would You Do @ 2018
                        </Footer>
                    </Layout>
                </BrowserRouter>
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


const mapDispatchToProps = {
    getUsersFromServer
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
