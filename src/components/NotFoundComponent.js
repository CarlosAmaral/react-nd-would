import React, { Component } from 'react'
import {Link} from "react-router-dom";
export default class NotFoundComponent extends Component {
  render() {
    return (
      <div>
        404 Not Found
        <div>
        <Link to='/'>Take me back</Link>
        </div>
       
      </div>
    )
  }
}
