import React, { Component } from 'react';
import { Menu } from "antd";
import { BrowserRouter, Link } from "react-router-dom";
import { connect } from "react-redux";


class HeaderComponent extends Component {

    componentDidMount() {

    }

    static getDerivedStateFromProps(props, state) {
        console.log(props, "pROPS");
    }

    onChangeMenu = (item) => this.props.menuItems(item);

    logOutUser = () => this.props.logOutUser();

    render() {

        const { loggedInUser } = this.props;

        return (
            <div>
                <div className="logo" />
                <Menu
                    onSelect={this.onChangeMenu}
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: '64px' }}>
                    <Menu.Item key="1">
                        <Link to='/homepage'>Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to='/create-question'>New Question</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to='/learder-board'>Leader Board</Link>
                    </Menu.Item>
                    <Menu.Item key="4">Hello, {}</Menu.Item>
                    <Menu.Item key="5" onClick={this.logOutUser}>
                        Logout</Menu.Item>
                </Menu>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    loggedInUser: state.users.loggedInUser
});

export default connect(mapStateToProps)(HeaderComponent);