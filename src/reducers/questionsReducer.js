import {GET_QUESTIONS, POST_QUESTIONS, GET_ANSWERED_AND_UNANSWERED_QUESTIONS} from '../actions/types';

const initialState = {
    items: [],
    answered: [],
    unanswered: [],
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
        case 'GET_ANSWERED_AND_UNANSWERED_QUESTIONS':
            const questions = Object.values(action.payload[0]);
            let users = Object.values(action.payload[1]);
            users = users.find(author => author.id === action.param);

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