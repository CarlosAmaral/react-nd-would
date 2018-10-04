import {POST_QUESTIONS, GET_QUESTIONS, GET_ANSWERED_AND_UNANSWERED_QUESTIONS} from './types';
import * as API from '../utils/WouldYouRatherAPI';

export const postQuestionsToServer = (questionPayload) => dispatch => {

    API.saveQuestions(questionPayload)
        .then(questions => dispatch(
            {
                type: POST_QUESTIONS,
                payload: questions
            }
        ))

};

export const getQuestionsFromServer = () => dispatch => {

    API.getQuestions()
        .then(questions => dispatch(
            {
                type: GET_QUESTIONS,
                payload: questions
            }
        ))

};


export const getAnsweredAndUnansweredQuestions = (author) => dispatch => {

    let promises = [
        API.getQuestions(),
        API.getUsers()
    ];

    Promise.all(promises).then(answered => dispatch({
        type: GET_ANSWERED_AND_UNANSWERED_QUESTIONS,
        payload: answered,
        param: author
    }));
};