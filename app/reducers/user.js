const initialFeedState = {
    userInfo: {},
    groups: []
}

function UserInfo(state = initialFeedState, action){
    switch(action.type){
        case 'userInfo':
            return {
                ...state,
                userInfo: action.data
            };
        case 'saveUserInfo':
            return {
                ...state,
                userInfo: action.data
            };
        case 'saveGroups':
            return {
                ...state,
                groups: action.data
            };
        default:
            return state;
    }
}

export default UserInfo;