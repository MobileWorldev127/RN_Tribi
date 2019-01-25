import { combineReducers } from 'redux';
import { AppNavigator } from '../navigators/AppNavigator';

import nav from './nav'
import user from './user'
import appdata from './appdata'
const AppReducer  = combineReducers({
    nav,
    user,
    appdata
});

export default AppReducer;
