import React, { Component } from 'react'
import { Row, Col, Avatar, Spin, Skeleton, Card, Button } from 'antd';
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

    viewResults = (questionId) => this.props.history.push(`/results/${questionId}`);

    render() {

        const { answered, unanswered, loggedInUser } = this.props;

        if (loggedInUser == null) return <Redirect to='/' />;

        return (
            <div>
                {(unanswered.length === 0 || answered.length === 0) ? (
                    <Spin size="large" />
                ) : (
                        <Tabs tabPosition="left" defaultActiveKey="1">
                            <TabPane tab="Unanswered Questions" key="1">
                                {unanswered.map(u =>
                                    <div key={u.id} style={{ padding: '15px' }}>
                                        <Card title={`${u.name}, asks:`}
                                            extra={<Button size="small"
                                                className="text-uppercase"
                                                type="primary" onClick={() => this.viewQuestion(u.id)}>
                                                View Poll</Button>}
                                            bordered={false} style={{ width: 500, height: 200 }}>
                                            <Row>
                                                <Col span={8}>
                                                    <Avatar size={80} src={u.avatarURL} />
                                                </Col>
                                                <Col span={16}>
                                                    <h3>Would you Rather</h3>
                                                    <p>...{u.optionOne.text}...</p>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                )}

                            </TabPane>
                            <TabPane tab="Answered Questions" key="2">
                                {answered.map(a =>
                                    <div key={a.id} style={{ padding: '15px' }}>
                                        <Card title={`${a.name}, asks:`}
                                            extra={<Button size="small" onClick={() => this.viewResults(a.id)}
                                                className="text-uppercase"
                                                type="primary">View Poll</Button>}
                                            bordered={false} style={{ width: 500, height: 200 }}>
                                            <Row>
                                                <Col span={8}>
                                                    <Avatar size={80} src={a.avatarURL} />
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

                    )}

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    answered: Object.values(state.questions.answered).sort((a, b) => b.timestamp - a.timestamp),
    unanswered: Object.values(state.questions.unanswered).sort((a, b) => b.timestamp - a.timestamp),
    loggedInUser: JSON.parse(localStorage.getItem("loggedInUser"))
});


const mapDispatchToProps = {
    getAnsweredAndUnansweredQuestions
};

HomepageComponent.propTypes = {
    answered: PropTypes.array.isRequired,
    unanswered: PropTypes.array.isRequired,
    loggedInUser: PropTypes.any
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomepageComponent))
