import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Select, Form } from "antd";
import { getUsersFromServer, logInUser } from "../actions/usersActions";
import { connect } from "react-redux";

const Option = Select.Option;
const FormItem = Form.Item;

class LoginComponent extends Component {
    componentDidMount() {
        this.props.getUsersFromServer();
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.logInUser(values.chosenUser);
            }
        });
    }

    render() {
        const { users, defaultUser } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title="Sign In" bordered={false} style={{ width: 300 }}>

                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('chosenUser', {
                                rules: [{
                                    required: true,
                                    message: "Please choose a User"
                                }]
                            })(
                                <Select placeholder="Select User" style={{ width: 200 }} onChange={this.handleChange}>
                                    {users.map(user => <Option key={user.id} value={user.id}>{user.name}</Option>)}
                                </Select>
                            )}
                        </FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in</Button>
                    </Form>
                </Card>
            </div>
        );
    }
}

const LoginFormComponent = Form.create()(LoginComponent);

LoginComponent.propTypes = {
    getUsersFromServer: PropTypes.func.isRequired,
    logInUser: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};


const mapStateToProps = state => ({
    users: Object.values(state.users.items)
});

export default connect(mapStateToProps, { getUsersFromServer, logInUser })(LoginFormComponent);