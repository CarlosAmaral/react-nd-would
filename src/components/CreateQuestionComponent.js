import React, {Component} from 'react';
import {Form, Input, Button, Checkbox, Card} from "antd";

const FormItem = Form.Item;

class CreateQuestionFormComponent extends Component {

    handleSubmit = (e) => {
        e.preventDefault();

    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Card title="Create New Question">

                    <h5>Complete the question</h5>
                    <h2>Would you Rather</h2>
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
                        <hr>OR</hr>
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

export default CreateQuestionComponent;