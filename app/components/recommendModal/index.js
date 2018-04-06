import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Header, Left, Right, 
  Body
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { 
    Animated, Keyboard, AsyncStorage, TextInput, TouchableOpacity, ScrollView, Modal, Dimensions
} from 'react-native';
import styles from './styles';
import images from '../../themes/images'
import RecommendLocation from '../recommendLocation'
import RecommendFeedback from '../recommendFeedback'
import Toast, {DURATION} from 'react-native-easy-toast'
const { width, height } = Dimensions.get('window');


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
            isfavorite: false,
        }
    }
    componentWillMount() {
        this.setState({
            isfavorite: false
        })
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

    onFavorite() {
        if(!this.state.isfavorite){
            this.refs.toast.show('Added to Favourites', DURATION.LENGTH_LONG)
        }else{
            this.refs.toast.show('Removed From Favourites', DURATION.LENGTH_LONG)
        }

        if(this.state.isfavorite){
            this.setState({ isfavorite: false })
        }
        else {
            this.setState({ isfavorite: true })
        }
    }

    render(){
        return(
            <View style = {styles.modalView}>
                <TouchableOpacity style = {styles.blankView} onPress = { this.props.onClickedBack}>
                </TouchableOpacity>
                
                <View style = {styles.modalMainView}>
                    {
                        this.state.isLocation? <RecommendLocation /> : <RecommendFeedback />
                    }      
                    <TouchableOpacity onPress = {() => this.onFavorite()}>
                        <Thumbnail square source = {this.state.isfavorite? images.ic_select_heart : images.ic_unselect_heart} style = {styles.heartImg}/>
                    </TouchableOpacity>              
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

                <Button style = {styles.recommendBtnView} onPress = { this.props.onRecommend}>
                    <Label style = {styles.recommedTxt}>RECOMMEND</Label>
                </Button>

                <Toast
                    ref = 'toast'
                    style = {{backgroundColor: '#35e49c'}}
                    position = 'top'
                    positionValue = {height/6}
                    
                    opacity = {0.8}
                    textStyle = {{color: 'white'}}
                />
                
            </View>
        )
    }
}

export default connect()(recommendModal);