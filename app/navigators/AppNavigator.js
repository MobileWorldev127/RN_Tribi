
import React from 'react';
import { connect } from 'react-redux';
import {
    StackNavigator,
    addNavigationHelpers
} from 'react-navigation';

import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'
import {addListener} from '../utils/redux'

import login from '../scenes/auth/login/index'
import welcome from '../scenes/auth/welcome/index';
import signup from '../scenes/auth/signup/index';
import forgotpassword from '../scenes/auth/forgotpassword/index';
import tabbarView from '../scenes/dashboard/tabbarView/index';
import location from '../scenes/dashboard/location/index';


export const AppNavigator = StackNavigator({
    login: { screen: login },
    welcome: {screen: welcome },
    signup: { screen: signup },
    forgotpassword: { screen: forgotpassword },
    tabbarView: { screen: tabbarView },
    location: { screen: location },
});

const AppWithNavigationState = ({dispatch, nav}) => (
    <AppNavigator navigation={addNavigationHelpers({dispatch, state: nav, addListener})}/>
);

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);