import {combineReducers} from 'redux';
import userReducer from './usersReducer';
import {routerReducer} from "react-router-redux";

export default combineReducers({
    users: userReducer
})
