import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Radio, Card, Button, Divider, Form, message} from 'antd';
import {saveQuestionAnswerToServer} from "../actions/questionsActions";
import {withRouter, Redirect} from 'react-router-dom';
import _ from 'lodash';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

export class AnswerQuestionFormComponent extends Component {


    handleSubmit = (e) => {
        const {loggedInUser} = this.props;
        const {question} = this.props.match.params;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                const valuesPayload = {...values, qid:question, authedUser: loggedInUser.id};
                this.props.saveQuestionAnswerToServer(valuesPayload);
            } else {
                message.info('Please complete the form, Sir!');
            }
        });
    }

    render() {

        if (_.isEmpty(this.props.loggedInUser)) {
            return <Redirect to='/'/>
        }

        const {getFieldDecorator} = this.props.form;
        const {selectedQuestion} = this.props;

        return (
            <div>

                <Card title={`${selectedQuestion.author} asks`}
                    //extra={<Button size="small" className="text-uppercase"type="primary">View Poll</Button>}
                      bordered={false} style={{width: 500}}>
                    <h3>Would you Rather</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('answer', {
                                rules: [{
                                    required: true,
                                    message: 'Please select an answer',
                                }],
                            })(
                                <RadioGroup>
                                    <Radio
                                        value="optionOne">{selectedQuestion.optionOne.text}</Radio>
                                    <Radio
                                        value="optionTwo">{selectedQuestion.optionTwo.text}</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <Button htmlType="submit">Submit</Button>
                    </Form>
                </Card>
            </div>
        )
    }
}

const AnswerQuestionComponent = Form.create()(AnswerQuestionFormComponent);

const mapStateToProps = (state, props) => ({

    loggedInUser: state.users.loggedInUser,
    selectedQuestion: state.questions.items[props.match.params.question]
});

const mapDispatchToProps = {
    saveQuestionAnswerToServer
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnswerQuestionComponent));
