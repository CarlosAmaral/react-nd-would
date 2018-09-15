import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Select} from "antd";
import {getUsersFromServer} from "../actions/usersActions";
import {connect} from "react-redux";

const Option = Select.Option;

class LoginComponent extends Component {
    componentDidMount() {
        this.props.getUsersFromServer();
    }


    handleChange = () => {

    }

    render() {
        const {users, defaultUser} = this.props;
        return (
            <div>
                <Card title="Sign In" bordered={false} style={{width: 300}}>
                    <Select placeholder="Select User" style={{width: 200}} onChange={this.handleChange}>
                        {users.map(user => <Option key={user.id} value={user.id}>{user.name}</Option>)}
                    </Select>
                    <div><Button type="primary">Sign In</Button></div>

                </Card>
            </div>
        );
    }
}

LoginComponent.propTypes = {
    getUsersFromServer: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    users: Object.values(state.users.items)
});

export default connect(mapStateToProps, {getUsersFromServer})(LoginComponent);