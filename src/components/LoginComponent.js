import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Select} from "antd";
const Option = Select.Option;

export default class LoginComponent extends Component {


    handleChange = () =>{

    }

    render() {
        return (
            <div>
                <Card title="Sign In" bordered={false} style={{ width: 300 }}>
                    <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                    <Button type="primary">Sign In</Button>
                </Card>
            </div>
        );
    }
}