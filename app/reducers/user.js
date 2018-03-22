const initialFeedState = {
    userInfo: []   
}

function UserInfo(state = initialFeedState, action){
    switch(action.type){
        case 'userInfo':
            return {
                ...state,
                userInfo: action.data
            };
        case 'userInfo_init':
            return {
                ...state,
                userInfo: []
            };
        default:
            return state;
    }
}

export default UserInfo;