import { POST_QUESTIONS, GET_QUESTIONS } from './types';
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