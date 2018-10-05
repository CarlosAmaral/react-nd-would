import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import LoginComponent from "./components/LoginComponent";
import { connect, Provider } from 'react-redux';
import HeaderComponent from "./components/HeaderComponent";
import HomepageComponent from "./components/HomepageComponent";
import CreateQuestionComponent from "./components/CreateQuestionComponent";
import LeaderboardComponent from "./components/LeaderboardComponent";
import NotFoundComponent from "./components/NotFoundComponent";
import AnswerQuestionComponent from "./components/AnswerQuestionComponent";
import { getUsersFromServer } from './actions/usersActions';
import { getQuestionsFromServer } from './actions/questionsActions';
import { Switch, Redirect, Route, BrowserRouter } from 'react-router-dom'

const { Header, Content, Footer } = Layout;

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

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Layout className="layout">

                        <Header>
                            <div>
                                <HeaderComponent menuItems={this.handleMenuItems} />
                            </div>
                        </Header>
                        <Content style={{ margin: 'auto' }}>
                            <Switch>
                                <Route exact path='/homepage' render={() => (
                                    <HomepageComponent />
                                )} />
                                <Route exact path='/' render={() => (
                                    <LoginComponent />
                                )} />
                                <Route exact path='/add' render={() => (
                                    <CreateQuestionComponent />
                                )} />
                                <Route exact path='/leaderboard' render={() => (
                                    <LeaderboardComponent />
                                )} />
                                <Route exact path='/questions/:question' render={() => (
                                    <AnswerQuestionComponent />
                                )} />
                                <Route path='*' render={() => (
                                    <NotFoundComponent />
                                )} />
                            </Switch>
                        </Content>

                        <Footer style={{ textAlign: 'center' }}>
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
    users: PropTypes.array.isRequired,
    loggedInUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    loggedInUser: state.users.loggedInUser,
    users: Object.values(state.users.items)
});


const mapDispatchToProps = {
    getUsersFromServer,
    getQuestionsFromServer
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
