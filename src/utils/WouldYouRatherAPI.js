import * as server from './_DATA';


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

export const saveQuestions = (q) => {
    return new Promise((f, r) => {
        server._saveQuestion(q).then(res => f(res)).catch(err => r(err));
    });
}

export const saveQuestionAnswer = (a) => {
    return new Promise ((f,r) => {
        server._saveQuestionAnswer(a).then(res => f(res)).catch(err => r(err));
    })

}

