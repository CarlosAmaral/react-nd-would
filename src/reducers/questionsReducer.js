import {GET_QUESTIONS, POST_QUESTIONS} from '../actions/types';

const initialState = {
    items: [],
    item: {}
};


export default function questionsReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_QUESTIONS':
            return {
                ...state,
                items: action.payload
            };
        case 'POST_QUESTIONS':
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
}