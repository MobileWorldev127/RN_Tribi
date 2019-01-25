/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import AppWithNavigationState from './app/navigators/AppNavigator' ;
import AppReducer from './app/reducers/index';
import {middleware} from './app/utils/redux'


export default class App extends Component{
  store = createStore(AppReducer, applyMiddleware(middleware));
  
  render(){
      console.disableYellowBox = true;
      return (
          <Provider store = {this.store}>
                <AppWithNavigationState/>
          </Provider>
      );
  }
}
