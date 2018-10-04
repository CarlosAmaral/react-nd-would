import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Select, Form } from "antd";
import { getUsersFromServer, logInUser } from "../actions/usersActions";
import { connect } from "react-redux";
import _ from "lodash";
import Redirect from 'react-router-dom/Redirect';

const Option = Select.Option;
const FormItem = Form.Item;

class LoginComponent extends Component {
    componentDidMount() {
        this.props.getUsersFromServer();
    }


    handleSubmit = (e) => {
        const { users, defaultUser } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const userObj = users.find(k => k.name === values.chosenUser);
                this.props.logInUser(userObj);
           
               
            }
        });
    }


    render() {
        const { users,loggedInUser } = this.props;
        const { getFieldDecorator } = this.props.form;

             
        if(!_.isEmpty(loggedInUser)){
            return <Redirect to='/homepage'/>
        }
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
                                    {users.map(user => <Option key={user.id} value={user.name}>{user.name}</Option>)}
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
    users: Object.values(state.users.items),
    loggedInUser: state.users.loggedInUser
});

export default connect(mapStateToProps, { getUsersFromServer, logInUser })(LoginFormComponent);