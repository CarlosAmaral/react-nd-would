import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Avatar, Divider, Card, Col, Row } from 'antd';
import { getQuestionsFromServer } from '../actions/questionsActions';
import { withRouter, Redirect } from 'react-router-dom';
import NotFoundComponent from '../components/NotFoundComponent'
import _ from 'lodash';
import { Progress } from 'reactstrap';

class QuestionResultsComponent extends Component {

    componentDidMount() {
        this.props.getQuestionsFromServer();
    }

    render() {

        const { selectedQuestion, questionAuthor, loggedInUser, history } = this.props;

        if (loggedInUser == null) return <Redirect to='/' />;

        if (_.isUndefined(questionAuthor) || _.isUndefined(selectedQuestion)) return <NotFoundComponent history={history} />;

        return (
            <div>
                <Card title={`Asked by ${questionAuthor.name}`}
                    bordered={false} style={{ width: 500 }}>

                    <Row>
                        <Col span={6}>
                            <Avatar src={questionAuthor.avatarURL} size={80} />
                        </Col>
                        <Col span={1}><Divider type="vertical" style={{ height: '150px' }} /></Col>
                        <Col span={17}>
                            <h2><strong>Results:</strong></h2>
                            <h3>Would you rather {selectedQuestion.optionOne.text}</h3>
                            <Progress value={selectedQuestion.optionOne.votes.length} max="3" />
                            {selectedQuestion.optionOne.votes.length} out of 3
                            <Divider style={{ margin: '5px auto' }} />
                            <h3>Would you rather {selectedQuestion.optionTwo.text}</h3>
                            <Progress value={selectedQuestion.optionTwo.votes.length} max="3" />
                            {selectedQuestion.optionTwo.votes.length} out of 3
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    questionAuthor: Object.values(state.users.items).find(u => {
        if (state.questions.items[props.match.params.question] !== undefined) {
            return u.id === state.questions.items[props.match.params.question].author
        } else {
            return undefined;
        }
    }),
    selectedQuestion: state.questions.items[props.match.params.question] ? state.questions.items[props.match.params.question] : undefined,
    loggedInUser: JSON.parse(localStorage.getItem("loggedInUser"))
})

const mapDispatchToProps = {
    getQuestionsFromServer
}

QuestionResultsComponent.propTypes = {
    questionAuthor: PropTypes.any,
    selectedQuestion: PropTypes.any,
    loggedInUser: PropTypes.any
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionResultsComponent));
