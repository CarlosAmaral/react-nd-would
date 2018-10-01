import {combineReducers} from 'redux';
import userReducer from './usersReducer';
import questionsReducer from './questionsReducer';
import {routerReducer} from "react-router-redux";

export default combineReducers({
    users: userReducer,
    questions:questionsReducer
})
