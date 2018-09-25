import React, {Component} from 'react';
import {Menu} from "antd";
import {BrowserRouter, Link} from "react-router-dom";


class HeaderComponent extends Component {


    onChangeMenu = (item) => this.props.menuItems(item);

    render() {
        return (
            <div>
                <div className="logo"/>
                <Menu
                    onSelect={this.onChangeMenu}
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{lineHeight: '64px'}}>
                    <Menu.Item key="1">Home</Menu.Item>
                    <Menu.Item key="2">
                        <BrowserRouter>
                            <Link to='/create-question'>New Question</Link>
                        </BrowserRouter>

                    </Menu.Item>
                    <Menu.Item key="3">Leader Board</Menu.Item>
                    <Menu.Item key="4">Hello, {}</Menu.Item>
                    <Menu.Item key="5">Logout</Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default HeaderComponent;