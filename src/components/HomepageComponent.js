import React, { Component } from 'react'
import { List, Avatar, Divider, Card, Button } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Tabs } from 'antd';
import _ from "lodash";
import { getAnsweredAndUnansweredQuestions } from "../actions/questionsActions";
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const TabPane = Tabs.TabPane;


class HomepageComponent extends Component {

    componentDidMount() {
        this.props.getAnsweredAndUnansweredQuestions(this.props.loggedInUser.id);
    }

    viewQuestion = (questionId) => {
        return this.props.history.push(`/questions/${questionId}`)
    }

    render() {

        if (_.isEmpty(this.props.loggedInUser)) {
            return <Redirect to='/' />
        }

        const { answered, unanswered } = this.props;
        return (
            <div>
                <Tabs tabPosition="left" defaultActiveKey="1">
                    <TabPane tab="Unanswered Questions" key="1">
                        {unanswered.map(u =>
                            <div key={u.id} style={{ background: '#ECECEC', padding: '15px' }}>
                                <Card title={`${u.author}, asks:`}
                                    extra={<Button size="small"
                                        className="text-uppercase"
                                        type="primary" onClick={() => this.viewQuestion(u.id)}>
                                        View Poll</Button>}
                                    bordered={false} style={{ width: 500 }}>
                                    <h5>Would you Rather</h5>
                                    <p>...{u.optionOne.text}...</p>
                                </Card>
                            </div>
                        )}
                    </TabPane>
                    <TabPane tab="Answered Questions" key="2">
                        {answered.map(a =>
                            <div key={a.id} style={{ background: '#ECECEC', padding: '15px' }}>
                                <Card title={`${a.author}, asks:`}
                                    extra={<Button size="small"
                                        className="text-uppercase"
                                        type="primary">View Poll</Button>}
                                    bordered={false} style={{ width: 500 }}>
                                    <h5>Would you Rather</h5>
                                    <p>...{Object.values(a).find(k => k.selected === true).text}...</p>
                                </Card>
                            </div>
                        )}
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    answered: Object.values(state.questions.answered),
    unanswered: Object.values(state.questions.unanswered),
    loggedInUser: state.users.loggedInUser
});


const mapDispatchToProps = {
    getAnsweredAndUnansweredQuestions
};

HomepageComponent.propTypes = {
    answered: PropTypes.array.isRequired,
    unanswered: PropTypes.array.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomepageComponent))
