import {GET_USERS, LOGIN_USER, LOGOUT_USER} from '../actions/types';

const initialState = {
    users:[],
    user:{}
}

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload
            };

        case 'LOGIN_USER':

            return {...state};

        case 'LOGOUT_USER':
            return {...state};
        default:
            return state;
    }
}