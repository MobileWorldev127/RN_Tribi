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


class recommendFeedback extends Component{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }
    starImgFromRating(tip) {
        let agree = tip.agreeCount;
        let disagree = tip.disagreeCount;
        if (agree == 0) {
            return images.ic_star0
        }
        let rate = Math.ceil(agree * 5 / (agree + disagree))
        let rateimgarr = [images.ic_star0, images.ic_star1, images.ic_star2, images.ic_star3, images.ic_star4, images.ic_star5]
        
        return rateimgarr[rate]
    }
    render(){
        return(
            <View style = {styles.container}>
                <Label style = {styles.modaltitle}>{this.props.venue.name}</Label>
                <Label style = {styles.modalcategory}>{this.props.venue.category}</Label>
                <ScrollView vertical = {true} showsHorizontalScrollIndicator = {false} >
                {
                    this.props.venue.tips.map((item, index) => {
                        return (<View style = {styles.eachFeedbackView} key={index}>
                                    <Thumbnail square source = {this.starImgFromRating(item)} style = {styles.starValueImg}/>
                                    <Label style = {styles.modaldescription} >{item.text}</Label>
                                    <Label style = {styles.modaldeFeedbackDate}>{item.user}</Label>
                                </View>)
                    })
                }
                </ScrollView>
                
            </View>
        )
    }
}

export default connect()(recommendFeedback);