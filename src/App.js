import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect} from 'react-redux';
// Components
import LoginComponent from "./components/LoginComponent";
import HeaderComponent from "./components/HeaderComponent";
import HomepageComponent from "./components/HomepageComponent";
import CreateQuestionComponent from "./components/CreateQuestionComponent";
import LeaderboardComponent from "./components/LeaderboardComponent";
import NotFoundComponent from "./components/NotFoundComponent";
import QuestionDetailsComponent from "./components/QuestionDetailsComponent";
import QuestionResultsComponent from './components/QuestionResultsComponent';
// Actions
import { getUsersFromServer } from './actions/usersActions';
import { getQuestionsFromServer } from './actions/questionsActions';

// Router
import { Route, withRouter, Switch } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

class App extends Component {

    componentDidMount() {
        this.props.getUsersFromServer();
        this.props.getQuestionsFromServer();
    }

    render() {
        return (
            <div className="App">
                <Layout className="layout">
                    <Header>
                        <HeaderComponent />
                    </Header>
                    <Content className="yield-content" style={{ margin: 'auto', padding: '50px' }}>
                        <Switch>
                            <Route path='/' component={LoginComponent} exact={true} />

                            <Route exact path='/homepage' component={HomepageComponent} />

                            <Route exact path='/add' render={() => (
                                <CreateQuestionComponent />
                            )} />
                            <Route exact path='/leaderboard' render={() => (
                                <LeaderboardComponent />
                            )} />
                            <Route exact path='/questions/:question' render={() => (
                                <QuestionDetailsComponent />
                            )} />
                            <Route exact path='/results/:question' render={() => (
                                <QuestionResultsComponent />
                            )} />
                            <Route render={() => (
                                <NotFoundComponent />
                            )} />
                        </Switch>
                    </Content>

                    <Footer style={{ textAlign: 'center' }}>
                        What Would You Do @ 2018
                        </Footer>
                </Layout>
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
    users: Object.values(state.users.items),
    questions: Object.values(state.questions.items)
});


const mapDispatchToProps = {
    getUsersFromServer,
    getQuestionsFromServer
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
