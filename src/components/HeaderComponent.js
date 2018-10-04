import React, {Component} from 'react';
import {Menu} from "antd";
import {BrowserRouter, Link} from "react-router-dom";
import {logOutUser} from "../actions/usersActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";


class HeaderComponent extends Component {


    logOutUser = () => this.props.logOutUser();

    render() {

        const {loggedInUser} = this.props;

        const disabledMenuItem = _.isEmpty(loggedInUser);

        return (
            <div>
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{lineHeight: '64px'}}>


                    <Menu.Item key="1" disabled={disabledMenuItem}>
                        <Link to='/homepage'>Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2" disabled={disabledMenuItem}>
                        <Link to='/create-question'>New Question</Link>
                    </Menu.Item>
                    <Menu.Item key="3" disabled={disabledMenuItem}>
                        <Link to='/learder-board'>Leader Board</Link>
                    </Menu.Item>

                    {!_.isEmpty(loggedInUser) && <Menu.Item key="4">Hello, {loggedInUser.name}</Menu.Item>}

                    {!_.isEmpty(loggedInUser) && <Menu.Item key="5" onClick={this.logOutUser}>
                        Logout</Menu.Item>}
                </Menu>
            </div>
        );
    }
}


const mapDispatchToProps = {
    logOutUser
};

HeaderComponent.propTypes = {
    loggedInUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    loggedInUser: state.users.loggedInUser
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);