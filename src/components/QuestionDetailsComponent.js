import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Radio, Card, Button, Divider, Row, Col, Form, message, Avatar } from 'antd';
import { saveQuestionAnswerToServer, getQuestionsFromServer } from "../actions/questionsActions";
import { withRouter, Redirect } from 'react-router-dom';
import _ from 'lodash';
import NotFoundComponent from '../components/NotFoundComponent';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

export class QuestionDetailsFormComponent extends Component {

    handleSubmit = (e) => {
        const { loggedInUser } = this.props;
        const { question } = this.props.match.params;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const valuesPayload = { ...values, qid: question, authedUser: loggedInUser.id };
                this.props.saveQuestionAnswerToServer(valuesPayload);
                this.props.history.push(`/results/${question}`);
            } else {
                message.info('Please complete the form');
            }
        });
    }

    render() {
        const { loggedInUser } = this.props;
        const { question } = this.props.match.params;

        if (loggedInUser == null) return <Redirect to='/' />

        const { getFieldDecorator } = this.props.form;
        const { selectedQuestion, questionAuthor, history } = this.props;

        if (_.isUndefined(questionAuthor) || _.isUndefined(selectedQuestion)) return <NotFoundComponent history={history} />
        
        return (
            <div>
                <Card title={`${questionAuthor.name} asks`}
                    bordered={false} style={{ width: 500 }}>

                    <Row>
                        <Col span={8}>
                            <Avatar src={questionAuthor.avatarURL} size={80} />
                        </Col>
                        <Col span={16}>
                            <h3>Would you Rather...</h3>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem>
                                    {getFieldDecorator('answer', {
                                        rules: [{
                                            required: true,
                                            message: 'Please select an answer',
                                        }],
                                    })(
                                        <RadioGroup>
                                            <Radio value="optionOne">
                                                {selectedQuestion.optionOne.text}
                                            </Radio>
                                            <Radio value="optionTwo">
                                                {selectedQuestion.optionTwo.text}
                                            </Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                                <Button htmlType="submit" className="text-uppercase">
                                    Submit
                                    </Button>
                            </Form>
                        </Col>
                    </Row>

                </Card>
            </div>
        )
    }
}

const QuestionDetailsComponent = Form.create()(QuestionDetailsFormComponent);

const mapStateToProps = (state, props) => ({
    loggedInUser: JSON.parse(localStorage.getItem("loggedInUser")),
    questionAuthor: Object.values(state.users.items).find(u => {
        if (state.questions.items[props.match.params.question] !== undefined) {
            return u.id === state.questions.items[props.match.params.question].author
        } else {
            return undefined;
        }
    }),
    selectedQuestion: state.questions.items[props.match.params.question] ? state.questions.items[props.match.params.question] : undefined
});

const mapDispatchToProps = {
    getQuestionsFromServer,
    saveQuestionAnswerToServer
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionDetailsComponent));
