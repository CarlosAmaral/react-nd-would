import {
    GET_QUESTIONS,
    POST_QUESTIONS,
    GET_ANSWERED_AND_UNANSWERED_QUESTIONS,
    GET_SELECTED_QUESTION
} from '../actions/types';

const initialState = {
    items: [],
    answered: [],
    unanswered: [],
    item: {},
    selectedQuestion: {}
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
        case 'SAVE_ANSWER':
            return {
                ...state,
                items: action.payload
            };
        case 'GET_SELECTED_QUESTION':
            return {
                ...state,
                selectedQuestion: action.payload.find(k => k.id === action.id)
            };

        case 'GET_ANSWERED_AND_UNANSWERED_QUESTIONS':
            const questions = Object.values(action.payload[0]);
            const users = Object.values(action.payload[1]).find(author => author.id === action.param);

            const unansweredQuestions = questions.filter(q => Object.keys(users.answers).indexOf(q.id) === -1);
            const answeredQuestions = questions.filter(q => Object.keys(users.answers).indexOf(q.id) !== -1)
                .map(a => {
                    Object.keys(users.answers).find(l => l === a.id) === "optionOne" ? (a.optionOne.selected = true) : a.optionOne.selected = false;
                    a.optionTwo.selected = !a.optionOne.selected;
                    return a;
                });
            return {
                ...state,
                unanswered: unansweredQuestions,
                answered: answeredQuestions
            };
        default:
            return state;
    }
}