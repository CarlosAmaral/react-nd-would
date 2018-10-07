import React, { Component } from 'react'
import { Row, Col, Avatar, Skeleton, Card, Button } from 'antd';
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

    viewQuestion = (questionId) => this.props.history.push(`/questions/${questionId}`);

    render() {

        if (_.isEmpty(this.props.loggedInUser)) {
            return <Redirect to='/' />
        }

        const { answered, unanswered } = this.props;
        return (
            <div>
                <Tabs tabPosition="left" defaultActiveKey="1">
                    <TabPane tab="Unanswered Questions" key="1">
                        <Skeleton loading={unanswered.length === 0}>
                            {unanswered.map(u =>
                                <div key={u.id} style={{ padding: '15px' }}>
                                    <Card title={`${u.name}, asks:`}
                                        extra={<Button size="small"
                                            className="text-uppercase"
                                            type="primary" onClick={() => this.viewQuestion(u.id)}>
                                            View Poll</Button>}
                                        bordered={false} style={{ width: 500, heigh: 400 }}>
                                        <Row>
                                            <Col span={8}>
                                                <Avatar size="large" src={u.avatarURL} />
                                            </Col>
                                            <Col span={16}>
                                                <h3>Would you Rather</h3>
                                                <p>...{u.optionOne.text}...</p>
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                            )}
                        </Skeleton>
                    </TabPane>
                    <TabPane tab="Answered Questions" key="2">
                        {answered.map(a =>
                            <div key={a.id} style={{ padding: '15px' }}>
                                <Card title={`${a.name}, asks:`}
                                    extra={<Button size="small"
                                        className="text-uppercase"
                                        type="primary">View Poll</Button>}
                                    bordered={false} style={{ width: 500 }}>
                                    <Row>
                                        <Col span={8}>
                                            <Avatar size="large" src={a.avatarURL} />
                                        </Col>
                                        <Col span={16}>
                                            <h3>Would you Rather</h3>
                                            <p>...{Object.values(a).find(k => k.selected === true).text}...</p>
                                        </Col>
                                    </Row>
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
