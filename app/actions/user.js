import {API} from '../constants';
// var Promise = require("bluebird");


function userSignUp(email, password) {
    return new Promise((resolve, reject) => {
        fetch(API.REGISTER_URL, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + API.TOKEN,
                'App-Id': 2018598792
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "username": email,
                "opt_in": "Y"
            })
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get SignUp Success', data);
            resolve(data)
        })
        .catch(err => {
            console.log('Get SignUp Failed', err);
            reject(err)
        })
    }) 
}

function userLogIn(email, password) {
    return new Promise((resolve, reject) => {
        fetch(API.LOGIN_URL, {
            method: 'POST',
            headers:  {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + API.TOKEN,
                'App-Id': 2018598792
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get Login Success', data);
            resolve(data)
        })
        .catch(err => {
            console.log('Get Login Failed', err);
            reject(err)
        })
    })
}

module.exports = {
    userSignUp,
    userLogIn
}