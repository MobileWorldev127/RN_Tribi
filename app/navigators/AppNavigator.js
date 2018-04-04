
import React from 'react';
import { connect } from 'react-redux';
import {
    StackNavigator,
    addNavigationHelpers,
    DrawerNavigator
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
import newGroup from '../scenes/dashboard/newGroup/index';
import showGroup from '../scenes/dashboard/showGroup/index';
import voteGroup from '../scenes/dashboard/voteGroup/index';
import userProfile from '../scenes/dashboard/userProfile/index';
import editProfile from '../scenes/dashboard/editProfile/index';
import home from '../scenes/dashboard/home/index';
import Sidebar from '../components/sideBar/index';

const Drawer = DrawerNavigator(
    {
        login: { screen: login },
    },
    {
        initialRouteName: '',
        headerMode: 'screen',
        contentComponent: props => <Sidebar {...props}/>
    }
);

export const AppNavigator = StackNavigator({
    login: { screen: login },
    welcome: {screen: welcome },
    signup: { screen: signup },
    forgotpassword: { screen: forgotpassword },
    Drawer: { screen: Drawer },
    tabbarView: { screen: tabbarView },
    location: { screen: location },
    newGroup: { screen: newGroup },
    showGroup: { screen: showGroup },
    voteGroup: { screen: voteGroup},
    userProfile: { screen: userProfile },
    editProfile: { screen: editProfile },
});

const AppWithNavigationState = ({dispatch, nav}) => (
    <AppNavigator navigation={addNavigationHelpers({dispatch, state: nav, addListener})}/>
);

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);