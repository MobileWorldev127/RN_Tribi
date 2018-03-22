import { combineReducers } from 'redux';
import { AppNavigator } from '../navigators/AppNavigator';

import nav from './nav'
import user from './user'

const AppReducer  = combineReducers({
    nav,
    user,
});

export default AppReducer;
