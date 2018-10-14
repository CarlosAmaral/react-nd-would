import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Avatar, Divider, Card, Col, Row } from 'antd';
import { getQuestionsFromServer } from '../actions/questionsActions';
import { withRouter, Redirect } from 'react-router-dom';
import _ from 'lodash';


class QuestionResultsComponent extends Component {

    componentDidMount() {
        this.props.getQuestionsFromServer();
    }

    render() {

        const { selectedQuestion, questionAuthor, loggedInUser } = this.props;

        if (loggedInUser == null) {
            return <Redirect to='/' />
        }

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
                            {selectedQuestion.optionOne.votes.length} out of 3
                            <Divider style={{ margin: '5px auto' }} />
                            <h3>Would you rather {selectedQuestion.optionTwo.text}</h3>
                            {selectedQuestion.optionTwo.votes.length} out of 3
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    selectedQuestion: state.questions.items[props.match.params.question],
    questionAuthor: Object.values(state.users.items).find(u => u.id === state.questions.items[props.match.params.question].author),
    loggedInUser: JSON.parse(localStorage.getItem("loggedInUser"))
})

const mapDispatchToProps = {
    getQuestionsFromServer
}

QuestionResultsComponent.propTypes = {
    getQuestionsFromServer: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionResultsComponent));
