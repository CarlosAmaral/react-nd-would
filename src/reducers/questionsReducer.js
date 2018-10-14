import {
    GET_QUESTIONS,
    POST_QUESTIONS,
    GET_ANSWERED_AND_UNANSWERED_QUESTIONS,
    GET_SELECTED_QUESTION
} from '../actions/types';
import _ from 'lodash';

const initialState = {
    items: [],
    answered: [],
    unanswered: [],
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
        case 'GET_SELECTED_QUESTION':
            return {
                ...state,
                selectedQuestion: action.payload.find(k => k.id === action.id)
            };

        case 'GET_ANSWERED_AND_UNANSWERED_QUESTIONS':

            if (!_.isUndefined(action.param)) {
                const questions = Object.values(action.payload[0]);
                const users = Object.values(action.payload[1]);
                const loggedInUser = Object.values(action.payload[1]).find(author => author.id === action.param);

                const unansweredQuestions = questions.filter(q => Object.keys(loggedInUser.answers).indexOf(q.id) === -1).map(u => {
                    u.name = users.find(i => i.id === u.author).name;
                    u.avatarURL = users.find(i => i.id === u.author).avatarURL;
                    return u;
                });
                const answeredQuestions = questions.filter(q => Object.keys(loggedInUser.answers).indexOf(q.id) !== -1)
                    .map(a => {
                        Object.keys(loggedInUser.answers).find(l => l === a.id) === "optionOne" ? (a.optionOne.selected = true) : a.optionOne.selected = false;
                        a.name = users.find(i => i.id === a.author).name;
                        a.avatarURL = users.find(i => i.id === a.author).avatarURL;
                        a.optionTwo.selected = !a.optionOne.selected;
                        return a;
                    });
                return {
                    ...state,
                    unanswered: unansweredQuestions,
                    answered: answeredQuestions
                };
            }
        default:
            return state;
    }
}