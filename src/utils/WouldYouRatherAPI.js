import * as server from './_DATA';


export const getQuestions = () => server._getQuestions().then(res => res.json());

export const getUsers = () => {
    return new Promise((f,r) => {
        server._getUsers().then(res => f(res)).catch(err => r(err));
    })
};

export const saveQuestions = (q) => server._saveQuestion(q).then(res => res.json());

export const saveQuestionAnswer = (obj) => server._saveQuestionAnswer(obj).then(res => res.json());

