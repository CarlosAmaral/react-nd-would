import { Button, Card, Divider, Form, Input, message } from "antd";
import _ from "lodash";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { postQuestionsToServer } from "../actions/questionsActions";
import { getUsersFromServer } from "../actions/usersActions";
import {Redirect} from 'react-router-dom'
import { withRouter } from 'react-router-dom'

const FormItem = Form.Item;

class CreateQuestionFormComponent extends Component {

    /**
     * Handle Submit
     * @param e
     */
    handleSubmit = (e) => {
        const {loggedInUser} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const valuesPayload = { ...values, author: loggedInUser.id};
                this.props.postQuestionsToServer(valuesPayload);
            } else {
                message.info('Please complete the form, Sir!');
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        //Replace if statement with global function or shared component
        if (_.isEmpty(this.props.loggedInUser)) {
            return <Redirect to='/' />
        }
        
        return (
            <div>
                <Card title="Create New Question" style={{ width: 500 }}>

                    <h5>Fill in the blank</h5>
                    <h3>Would you Rather</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('optionOneText', {
                                rules: [{
                                    required: true,
                                    message: 'Please Insert Option One',
                                }],
                            })(
                                <Input placeholder="Enter Option One" />
                            )}
                        </FormItem>

                        <Divider>Or</Divider>
                        <FormItem>
                            {getFieldDecorator('optionTwoText', {
                                rules: [{
                                    required: true,
                                    message: 'Please Insert Option TWo',
                                }],
                            })(
                                <Input placeholder="Enter Option Two" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button htmlType="submit" className="text-uppercase">
                                Submit
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }

}

const CreateQuestionComponent = Form.create()(CreateQuestionFormComponent);


const mapStateToProps = state => ({
    loggedInUser: state.users.loggedInUser,
});

CreateQuestionComponent.propTypes = {
    getUsersFromServer: PropTypes.func.isRequired,
    postQuestionsToServer: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired
};
const mapDispatchToProps = {
    getUsersFromServer, 
    postQuestionsToServer 
  }
  

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateQuestionComponent));