import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Card, Row, Avatar, Col, Divider } from 'antd';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { getUsersFromServer } from "../actions/usersActions"
import _ from 'lodash';

export class LeaderboardComponent extends Component {

  componentDidMount() {
    this.props.getUsersFromServer();
  }

  render() {

    const { users } = this.props;

    if (_.isEmpty(this.props.loggedInUser)) {
      return <Redirect to='/' />
    }

    return (
      <div>
        {users.map(u =>
          <div key={u.id} style={{ padding: '15px' }}>
            <Card title={u.name}
              bordered={false} style={{ width: 500, heigh: 400 }}>
              <Row>
                <Col span={8}>
                  <Avatar size="large" src={u.avatarURL} />
                </Col>
                <Col span={8}>
                  <span>Answered Questions: {Object.values(u.answers).length}</span>
                  <Divider style={{ margin: '5px 0' }} />
                  <span>Created Questions: {u.questions.length}</span>
                </Col>
                <Col span={8}>
                  Score: {_.sum([Object.values(u.answers).length, u.questions.length])}
                </Col>
              </Row>
            </Card>
          </div>
        )}
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  users: Object.values(state.users.items),
  loggedInUser: state.users.loggedInUser

});

const mapDispatchToProps = {
  getUsersFromServer
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeaderboardComponent));
