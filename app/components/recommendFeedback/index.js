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
                    <Label style = {styles.modaldescription}>Curabitur ullamcorper ultricies nisi. Nam eget dui. rhoncus. Maecenas tempus, tellus condimentum rhoncus, sem quam semper libero.</Label>
                    
                </View>
        )
    }
}

export default connect()(recommendFeedback);