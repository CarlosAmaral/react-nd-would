import {
    POST_QUESTIONS,
    GET_QUESTIONS,
    GET_ANSWERED_AND_UNANSWERED_QUESTIONS,
    GET_SELECTED_QUESTION,
    SAVE_ANSWER
} from './types';
import * as API from '../utils/WouldYouRatherAPI';

export const postQuestionsToServer = (questionPayload) => async dispatch => {

    const saveQuestionRes = await API.saveQuestions(questionPayload);

    if (saveQuestionRes) {
        API.getQuestions()
            .then(q => dispatch(
                {
                    type: GET_QUESTIONS,
                    payload: q
                }
            ))
    } else {
        return;
    }

}

export const getQuestionsFromServer = () => dispatch => {

    API.getQuestions()
        .then(q => dispatch(
            {
                type: GET_QUESTIONS,
                payload: q
            }
        ))

};

export const saveQuestionAnswerToServer = (answerPayload) => dispatch => API.saveQuestionAnswer(answerPayload);


export const getAnsweredAndUnansweredQuestions = (author) => dispatch => {

    let promises = [
        API.getQuestions(),
        API.getUsers()
    ];

    Promise.all(promises).then(q => dispatch({
        type: GET_ANSWERED_AND_UNANSWERED_QUESTIONS,
        payload: q,
        param: author
    }));
};


export const getSelectedQuestion = (q, id) => dispatch => dispatch({
    type: GET_SELECTED_QUESTION,
    payload: q,
    id: id
})

