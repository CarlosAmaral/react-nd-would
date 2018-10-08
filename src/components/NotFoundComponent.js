import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';

export class NotFoundComponent extends Component {

  render() {
    const { history } = this.props;

    return (
      <div>
        <h1 className="primary-color">
          404 Page Not Found
        </h1>
        <Button htmlType="button" className="text-uppercase"
          onClick={() => history.push('/')}>
          Take me back
            </Button>
      </div>
    )
  }
}

NotFoundComponent.PropTypes = {
  history: PropTypes.func
}

export default withRouter(NotFoundComponent);
