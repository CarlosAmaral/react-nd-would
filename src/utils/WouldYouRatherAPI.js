import * as server from './_DATA';
import {message} from 'antd';


export const getQuestions = () => {
    return new Promise((f, r) => {
        server._getQuestions().then(res => f(res)).catch(err => r(err));
    })

};

export const getUsers = () => {
    return new Promise((f, r) => {
        server._getUsers().then(res => f(res)).catch(err => r(err));
    })
};

export const saveQuestions = (question) => {
    return new Promise((f, r) => {
        server._saveQuestion(question)
            .then(res => {
                f(res);
                message.success('Successfully submitted question, Sir!')

            })
            .catch(err => {
                r(err);
                message.error('Failed to submit your question, Sir!', err);
            });
    })
}

export const saveQuestionAnswer = (answer) => {
    return new Promise((f, r) => {
        server._saveQuestionAnswer(answer)
        .then(res => {
            f(res);
            message.success('Successfully submitted answer, Sir!')

        })
        .catch(err => {
            r(err);
            message.error('Failed to submit your answer, Sir!', err);
        });
    })

}

