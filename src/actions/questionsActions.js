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
            .then(questions => dispatch(
                {
                    type: GET_QUESTIONS,
                    payload: questions
                }
            ))
    } else {
        return;
    }

}

export const getQuestionsFromServer = () => dispatch => {

    API.getQuestions()
        .then(questions => dispatch(
            {
                type: GET_QUESTIONS,
                payload: questions
            }
        ))

};

export const saveQuestionAnswerToServer = (answerPayload) => dispatch => API.saveQuestionAnswer(answerPayload);


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


export const getSelectedQuestion = (questions, id) => dispatch => dispatch({
    type: GET_SELECTED_QUESTION,
    payload: questions,
    id: id
})

