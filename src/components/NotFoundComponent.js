import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd';

const NotFoundComponent = ({history}) => {
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

NotFoundComponent.propTypes = {
  history: PropTypes.object.isRequired
}
export default NotFoundComponent;