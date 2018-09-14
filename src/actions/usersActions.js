import {GET_USERS, LOGIN_USER, LOGOUT_USER} from './types';
import * as API from '../utils/WouldYouRatherAPI';

export const getUsersFromServer = () => dispatch => {
    API.getUsers()
        .then(users => dispatch({
            type: GET_USERS,
            payload: users
        }))
};