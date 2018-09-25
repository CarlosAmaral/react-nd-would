import React, {Component} from 'react';
import {Form, Input, Button, Checkbox, Card, Divider} from "antd";
import connect from "react-redux";
import {getUsersFromServer} from "../actions/usersActions";
import PropTypes from 'prop-types';

const FormItem = Form.Item;

class CreateQuestionFormComponent extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Card title="Create New Question">

                    <h5>Complete the question</h5>
                    <h3>Would you Rather</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('optionOne', {
                                rules: [{
                                    required: true,
                                    message: 'Please Insert Option One',
                                }],
                            })(
                                <Input placeholder="Enter Option One"/>
                            )}
                        </FormItem>

                        <Divider>Or</Divider>
                       {/* <hr>OR</hr>*/}
                        <FormItem>
                            {getFieldDecorator('optionTwo', {
                                rules: [{
                                    required: true,
                                    message: 'Please Insert Option TWo',
                                }],
                            })(
                                <Input placeholder="Enter Option Two"/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">
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
    questions: Object.values(state.questions.items)
});

CreateQuestionComponent.propTypes = {
    getUsersFromServer: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired
};


export default connect(mapStateToProps, {getUsersFromServer})(CreateQuestionComponent);