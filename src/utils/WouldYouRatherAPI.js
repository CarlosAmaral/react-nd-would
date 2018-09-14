import * as server from './_DATA';


export const getQuestions = () => server._getQuestions().then(res => console.log(res));

export const getUsers = () => server._getUsers().then(res => console.log(res));

export const saveQuestions = (q) => server._saveQuestion(q).then(res => console.log(res));

export const saveQuestionAnswer = (obj) => server._saveQuestionAnswer(obj).then(res => console.log(res));

