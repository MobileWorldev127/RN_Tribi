const initialFeedState = {
    categories: [],
    nearvenues: [],
    venuesOfLocation: []
}

function AppData(state = initialFeedState, action){
    switch(action.type){
        case 'saveAllCategories':
            return {
                ...state,
                categories: action.data
            };
        case 'saveNearVenues':
            return {
                ...state,
                nearvenues: action.data
            };

        case 'changeVenuesOfLocation':
            return {
                ...state,
                venuesOfLocation: action.data
            };
        default:
            return state;
    }
}

export default AppData;