import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Header, Left, Right, 
  Body
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { 
    Animated, Keyboard, AsyncStorage, TextInput, TouchableOpacity, ScrollView, Modal
} from 'react-native';
import styles from './styles';
import images from '../../themes/images'
import RecommendLocation from '../recommendLocation'
import RecommendFeedback from '../recommendFeedback'

class recommendModal extends Component<{}>{
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            isLocation: true,
            isFeedback: false
        }
    }

    onLocation(){
        this.setState({
            isLocation: true,
            isFeedback: false
        })
    }

    onFeedback(){
        this.setState({
            isLocation: false,
            isFeedback: true
        })
    }

    render(){
        return(
            <View style = {styles.modalView}>
                <View style = {styles.modalMainView}>
                    {
                        this.state.isLocation? 
                        <RecommendLocation /> :
                        <RecommendFeedback />
                    }
                    <View style = {styles.tabView}>
                        
                            <TouchableOpacity onPress = {() => this.onLocation()}>
                                <View style = {styles.tabBtn}>
                                    <Thumbnail square source = {images.tab_location} style = {[styles.tabIcon, {tintColor: this.state.isLocation? '#33e098': null}]}/>
                                    <Thumbnail square source = {images.tab_backgroundImage} style = {this.state.isLocation? styles.tabBackgroundImg: styles.tabBackgroundImg1}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {() => this.onFeedback()}>
                                <View style = {styles.tabBtn}>
                                    <Thumbnail square source = {images.tab_feedback} style = {[styles.tabIcon, {tintColor: this.state.isFeedback? '#33e098': null}]}/>
                                    <Thumbnail square source = {images.tab_backgroundImage} style = {this.state.isFeedback? styles.tabBackgroundImg: styles.tabBackgroundImg1}/>
                                </View>
                            </TouchableOpacity>
                        

                    </View>
                </View>
            </View>
        )
    }
}

export default connect()(recommendModal);