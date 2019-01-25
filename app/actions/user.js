import { API } from "../constants";
// var Promise = require("bluebird");

function userSignUp(params) {
  return new Promise((resolve, reject) => {
    fetch(API.BASE_URL + API.REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Authorization' : 'Bearer ' + API.TOKEN,
        // 'App-Id': 2018598792
      },
      body: JSON.stringify(params)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Get SignUp Success", data);
        resolve(data);
      })
      .catch(err => {
        console.log("Get SignUp Failed", err);
        reject(err);
      });
  });
}

function userLogIn(email, password) {
  return new Promise((resolve, reject) => {
    fetch(API.BASE_URL + API.LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Get Login Success", data);
        resolve(data);
      })
      .catch(err => {
        console.log("Get Login Failed", err);
        reject(err);
      });
  });
}

function getGroups(phone) {
  return new Promise((resolve, reject) => {
    fetch(API.BASE_URL + API.GETGROUPS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        creator_phone: phone
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Get Groups Success", data);
        resolve(data);
      })
      .catch(err => {
        console.log("Get Groups Failed", err);
        reject(err);
      });
  });
}
function getFavorites(user_id) {
  return new Promise((resolve, reject) => {
    fetch(API.BASE_URL + API.GETFAVORITES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user_id
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Get Favorites Success", data);
        resolve(data);
      })
      .catch(err => {
        console.log("Get Favorites Failed", err);
        reject(err);
      });
  });
}
function updateProfile(params) {
  return new Promise((resolve, reject) => {
    fetch(API.BASE_URL + API.UPDATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Update Profile Success", data);
        resolve(data);
      })
      .catch(err => {
        console.log("Update Profile Failed", err);
        reject(err);
      });
  });
}
function uploadPhoto(params) {
  const data = new FormData();
  data.append("user_id", params.user_id); // you can append anyone.
  data.append("photo", {
    uri: params.photo.uri,
    type: params.photo.type, // or photo.type
    name: "testPhotoName"
  });
  return new Promise((resolve, reject) => {
    fetch(API.BASE_URL + API.UPLOAD_PHOTO, {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        console.log("Upload Photo Success", data);
        resolve(data);
      })
      .catch(err => {
        console.log("Upload Photo Failed", err);
        reject(err);
      });
  });
}

function resetPassword(email) {
  return new Promise((resolve, reject) => {
    fetch(API.BASE_URL + API.RESETPASSWORD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Reset Password Success", data);
        resolve(data);
      })
      .catch(err => {
        console.log("Reset Password Failed", err);
        reject(err);
      });
  });
}

function setpushnotification_token(params) {
  return new Promise((resolve, reject) => {
    fetch(API.BASE_URL + API.SETPUSHTOKEN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Push notification token registration Success", data);
        resolve(data);
      })
      .catch(err => {
        console.log("Push notification token registration Failed", err);
        reject(err);
      });
  });
}
function sendFeedback(params) {
  return new Promise((resolve, reject) => {
    fetch(API.BASE_URL + API.SENDFEEDBACK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Sending feedback Success", data);
        resolve(data);
      })
      .catch(err => {
        console.log("Sending feedback Failed", err);
        reject(err);
      });
  });
}

function sendTwoStepVCode(params) {
  return new Promise((resolve, reject) => {
    fetch(API.BASE_URL + API.SEND_TWOSTEPVCODE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Sending 2fa Success", data);
        resolve(data);
      })
      .catch(err => {
        console.log("Sending 2fa Failed", err);
        reject(err);
      });
  });
}
function verifyTwoStepVCode(params) {
  return new Promise((resolve, reject) => {
    fetch(API.BASE_URL + API.VERIFY_TWOSTEPVCODE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Confirm 2fa Success", data);
        resolve(data);
      })
      .catch(err => {
        console.log("Confirm 2fa Failed", err);
        reject(err);
      });
  });
}
function sendPhoneVerifyCode(params) {
  return new Promise((resolve, reject) => {
    fetch(API.BASE_URL + API.SEND_PHONEVERIFICAIONCODE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Sending phone verify Success", data);
        resolve(data);
      })
      .catch(err => {
        console.log("Sending phone verify Failed", err);
        reject(err);
      });
  });
}
function verifyPhoneVCode(params) {
  return new Promise((resolve, reject) => {
    fetch(API.BASE_URL + API.VERIFY_PHONEVCODE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Confirm 2fa Success", data);
        resolve(data);
      })
      .catch(err => {
        console.log("Confirm 2fa Failed", err);
        reject(err);
      });
  });
}
module.exports = {
  userSignUp,
  userLogIn,
  getGroups,
  getFavorites,
  updateProfile,
  uploadPhoto,
  resetPassword,
  setpushnotification_token,
  sendFeedback,
  sendTwoStepVCode,
  verifyTwoStepVCode,
  sendPhoneVerifyCode,
  verifyPhoneVCode
};
