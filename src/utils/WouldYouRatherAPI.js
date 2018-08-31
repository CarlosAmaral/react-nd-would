import * as Backend from './_DATA';


export const getQuestions = () => Backend._getQuestions().then(res => console.log(res));

export const getUsers = () => Backend._getUsers().then(res => console.log(res));

export const saveQuestions = (q) => Backend._saveQuestion(q).then(res => console.log(res));

export const saveQuestionAnswer = (obj) => Backend._saveQuestionAnswer(obj).then(res => console.log(res));

