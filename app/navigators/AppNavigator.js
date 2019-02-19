
import React from 'react';
import { connect } from 'react-redux';
import {
    StackNavigator,
    addNavigationHelpers,
    DrawerNavigator
} from 'react-navigation';
import { BackHandler } from 'react-native'
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'
import {addListener} from '../utils/redux'

import welcome from '../scenes/dashboard/welcome/index';
import tutorial from '../scenes/dashboard/tutorial/index';
import login from '../scenes/auth/login/index'
import signup from '../scenes/auth/signup/index';
import forgotpassword from '../scenes/auth/forgotpassword/index';
import tabbarView from '../scenes/dashboard/tabbarView/index';
import location from '../scenes/dashboard/location/index';
import newGroup from '../scenes/dashboard/newGroup/index';
import voteGroup from '../scenes/dashboard/voteGroup/index';
import userProfile from '../scenes/dashboard/userProfile/index';
import editProfile from '../scenes/dashboard/editProfile/index';
import feedback from '../scenes/dashboard/feedback/index';
import home from '../scenes/dashboard/home/index';
import Sidebar from '../components/sideBar/index';
import friendProfile from '../scenes/dashboard/friendProfile/index';
import category_list from '../scenes/dashboard/categoryList/index';
import privacy from '../scenes/auth/privacy/index';

const Drawer = DrawerNavigator(
    {
        tabbarView: { 
            screen: tabbarView, 
            navigationOptions: {
                drawerLabel: () => null
            }
        },
        
    },
    {
        initialRouteName: '',
        headerMode: 'none',
        drawerLabel: () => null,
        contentComponent: props => <Sidebar {...props}/>
    }
);

export const AppNavigator = StackNavigator({
        welcome: { screen: welcome },
        login: { screen: login },
        tutorial: { screen: tutorial },
        feedback: { screen: feedback },
        signup: { screen: signup },
        forgotpassword: { screen: forgotpassword },
        Drawer: { screen: Drawer },
        location: { screen: location },
        newGroup: { screen: newGroup },
        voteGroup: { screen: voteGroup},
        userProfile: { screen: userProfile },
        editProfile: { screen: editProfile },
        friendProfile: { screen: friendProfile },
        category_list: {screen: category_list},
        privacy: { screen: privacy }
    },{
        headerMode: 'none',
    }
);

class AppWithNavigationState extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', function() {
            const { dispatch, navigation, nav } = this.props;

            console.log(nav)
            if(nav.index == 2) {
                BackHandler.exitApp();
            }

            dispatch({ type: 'Navigation/BACK' });
            return true;
        }.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }

    render() {
        return <AppNavigator navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.nav, addListener })} />
    }
}
const mapStateToProps = (state) => {
    return {
        nav: state.nav
    }
};

const A = connect(mapStateToProps)(AppWithNavigationState);
export default A;