import {GET_USERS, LOGIN_USER, LOGOUT_USER} from '../actions/types';

const initialState = {
    items:[],
    item:{},
    loggedInUser: {}
};


export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                items: action.payload
            };

        case 'LOGIN_USER':
            return {
                ...state,
                loggedInUser: action.payload
            };
        case 'LOGOUT_USER':
            return {
                ...state,
                loggedInUser: {}
            };
        default:
            return state;
    }
}