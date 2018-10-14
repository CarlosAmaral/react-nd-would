import { Button, Card, Divider, Form, Input, message } from "antd";
import _ from "lodash";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { postQuestionsToServer } from "../actions/questionsActions";
import { getUsersFromServer } from "../actions/usersActions";
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

const FormItem = Form.Item;

class CreateQuestionFormComponent extends Component {

    /**
     * Handle Submit
     * @param e
     */
    handleSubmit = (e) => {
        const { loggedInUser } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const valuesPayload = { ...values, author: loggedInUser.id };
                this.props.postQuestionsToServer(valuesPayload);
                this.props.history.push('/homepage')
            } else {
                message.info('Please complete the form, Sir!');
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loggedInUser } = this.props;

        if (loggedInUser == null) return <Redirect to='/' />;

        return (
            <div>
                <Card title="Create New Question" style={{ width: 500 }}>

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
                        <Button htmlType="submit" className="text-uppercase">
                            Submit
                            </Button>
                    </Form>
                </Card>
            </div>
        );
    }

}

const CreateQuestionComponent = Form.create()(CreateQuestionFormComponent);


const mapDispatchToProps = {
    postQuestionsToServer
};
const mapStateToProps = state => ({
    loggedInUser: JSON.parse(localStorage.getItem("loggedInUser")),
});

CreateQuestionComponent.propTypes = {
    loggedInUser: PropTypes.any
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateQuestionComponent));