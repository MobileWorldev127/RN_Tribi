import { API } from '../constants'
function getAllMembers() {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.GETALLMEMBERS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get All Users Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get All Users Failed', err);
            reject(err);
        })
    })
}
function getAllCategories(lat, lng){
    let latlng = lat+","+lng
    console.log(latlng)
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.CATEGORIES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "latlong": latlng,
            })
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get All Categories Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get All Categories Failed', err);
            reject(err);
        })
    })
}

function getNearVenues(lat, lng){
    let latlng = lat+","+lng
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.NEARVENUES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "latlong": latlng,
            })
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get NearVenues Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get All Categories Failed', err);
            reject(err);
        })
    })
}

function getVenueDetails(venue_id){
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.VENUEDETAIL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "venue_id": venue_id,
            })
        })
        .then((res) => res.json())
        .then(data => {
            console.log('Get VENUE Detail Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('Get VENUE Detail Failed', err);
            reject(err);
        })
    })
}
function setFavoriteVenue(user_id, venue_id) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.SETFVORITEVENUE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "venue_id": venue_id,
				"user_id": user_id
            })
        })
        .then((res) => res.json())
        .then(data => {
            console.log('set Favorite Venue Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('set Favorite Venue Failed', err);
            reject(err);
        })
    })
}
function unsetFavoriteVenue(user_id, venue_id) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.UNSETFVORITEVENUE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "venue_id": venue_id,
				"user_id": user_id
            })
        })
        .then((res) => res.json())
        .then(data => {
            console.log('unset Favorite Venue Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('set Favorite Venue Failed', err);
            reject(err);
        })
    })
}
function createGroup(params) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.CREATENEWGROUP, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(params)
        })
        .then((res) => res.json())
        .then(data => {
            console.log('create new Group Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('create new Group Failed', err);
            reject(err);
        })
    })
}

function recommendVenue(params) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.RECOMMENDVENUE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(params)
        })
        .then((res) => res.json())
        .then(data => {
            console.log('recommend Venue Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('recommend Venue Failed', err);
            reject(err);
        })
    })
}

function joinGroupRequest(params) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.JOINGROUPREQUEST, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify(params)
        })
        .then((res) => res.json())
        .then(data => {
            console.log('join group request Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('join group request Failed', err);
            reject(err);
        })
    })
}
function leaveGroup(params) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.LEAVEGROUP, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify(params)
        })
        .then((res) => res.json())
        .then(data => {
            console.log('leave group request Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('leave group request Failed', err);
            reject(err);
        })
    })
}
function commentCandidate(params) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.COMMENTCANDIDATE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify(params)
        })
        .then((res) => res.json())
        .then(data => {
            console.log('comment candidate Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('comment candidate Failed', err);
            reject(err);
        })
    })
}

function acceptGroupRequest(params) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.ACCEPTGROUPREQUEST, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify(params)
        })
        .then((res) => res.json())
        .then(data => {
            console.log('comment candidate Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('comment candidate Failed', err);
            reject(err);
        })
    })
}
function rejectGroupRequest(params) {
    return new Promise((resolve, reject) => {
        fetch(API.BASE_URL + API.REJECTGROUPREQUEST, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify(params)
        })
        .then((res) => res.json())
        .then(data => {
            console.log('comment candidate Success', data);
            resolve(data);
        })
        .catch(err => {
            console.log('comment candidate Failed', err);
            reject(err);
        })
    })
}
module.exports = {
    getAllCategories,
    getNearVenues,
    getVenueDetails,
    setFavoriteVenue,
    unsetFavoriteVenue,
    createGroup,
    recommendVenue,
    joinGroupRequest,
    leaveGroup,
    commentCandidate,
    acceptGroupRequest,
    rejectGroupRequest,
    getAllMembers
}
