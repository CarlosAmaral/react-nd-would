import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Radio, Card, Button, Divider, Row, Col, Form, message, Avatar } from 'antd';
import { saveQuestionAnswerToServer, getQuestionsFromServer } from "../actions/questionsActions";
import { withRouter, Redirect } from 'react-router-dom';
import _ from 'lodash';

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
        const {loggedInUser} = this.props;

        if (loggedInUser == null) {
            return <Redirect to='/' />
        }

        const { getFieldDecorator } = this.props.form;
        const { selectedQuestion, questionAuthor } = this.props;

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
    questionAuthor: Object.values(state.users.items).find(u => u.id === state.questions.items[props.match.params.question].author),
    selectedQuestion: state.questions.items[props.match.params.question]
});

const mapDispatchToProps = {
    getQuestionsFromServer,
    saveQuestionAnswerToServer
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionDetailsComponent));
