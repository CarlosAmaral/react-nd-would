import {GET_USERS, LOGIN_USER, LOGOUT_USER} from '../actions/types';

const initialState = {
    items:[],
    item:{}
};


export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_USERS':
            console.log('getusers');
            return {
                ...state,
                items: action.payload
            };

        case 'LOGIN_USER':

            return {...state};

        case 'LOGOUT_USER':
            return {...state};
        default:
            return state;
    }
}