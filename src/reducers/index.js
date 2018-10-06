import {combineReducers} from 'redux';
import userReducer from './usersReducer';
import questionsReducer from './questionsReducer';

export default combineReducers({
    users: userReducer,
    questions:questionsReducer
})
