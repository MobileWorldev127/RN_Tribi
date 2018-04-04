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
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        this.state = {
            isLocation: true,
            isFeedback: false,

            groupmodalVisible: false,
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
                <TouchableOpacity style = {styles.blankView} onPress = { this.props.onClickedBack}>
                </TouchableOpacity>
                <View style = {styles.modalMainView}>
                    <Thumbnail square source = {images.ic_heart} style = {styles.heartImg}/>
                    {
                        this.state.isLocation? <RecommendLocation /> : <RecommendFeedback />
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

                <Button style = {styles.recommendBtnView} onPress = { this.props.onClickedBack}>
                    <Label style = {styles.recommedTxt}>RECOMMEND</Label>
                </Button>
                
            </View>
        )
    }
}

export default connect()(recommendModal);