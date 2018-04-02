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


class recommendFeedback extends Component<{}>{
    static navigationOptions = {
        header: null
    }

    render(){
        return(
            <View style = {styles.container}>
                <Label style = {styles.modaltitle}>VR ARCADE</Label>
                <Label style = {styles.modalcategory}>Games</Label>
                <View style = {styles.eachFeedbackView}>
                    <Thumbnail square source = {images.ic_star4} style = {styles.starValueImg}/>
                    <Label style = {styles.modaldescription} >Curabitur ullamcorper ultricies nisi. Nam eget dui. rhoncus. Maecenas tempus, tellus condimentum rhoncus, sem quam semper libero.</Label>
                    <Label style = {styles.modaldeFeedbackDate}>Den Potapov • May 20, 2017</Label>
                </View>
                <View style = {styles.eachFeedbackView}>
                    <Thumbnail square source = {images.ic_star3} style = {styles.starValueImg}/>
                    <Label style = {styles.modaldescription}>Curabitur ullamcorper ultricies nisi. Nam eget dui.</Label>
                </View>
                
            </View>
        )
    }
}

export default connect()(recommendFeedback);