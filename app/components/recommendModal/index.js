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

import { setFavoriteVenue, unsetFavoriteVenue } from '../../actions'
const { width, height } = Dimensions.get('window');


class recommendModal extends Component{
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
        let favorite_venues = this.props.userInfo.favorite_venues
        let venue_id = this.props.venue.id
        let exist_in_favorite = favorite_venues.filter(function(item){return item == venue_id})

        this.setState({
            isfavorite: exist_in_favorite.length>0
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
        let user_id = this.props.userInfo._id
		let venue_id = this.props.venue.id
		var { dispatch } = this.props;
        if(this.state.isfavorite){
            unsetFavoriteVenue(user_id, venue_id).then(data => {
                this.setState({ isfavorite: false })
				if (data.success) {
                    dispatch ({ type: 'saveUserInfo', data: data.data.user });
                    this.refs.toast.show('Removed from Favourites', DURATION.LENGTH_LONG)
				}else{
					this.refs.toast.show('Removed from Favourites', DURATION.LENGTH_LONG)
				}
			})
        }
        else {
			setFavoriteVenue(user_id, venue_id).then(data => {
                this.setState({ isfavorite: true })
				if (data.success) {
                    dispatch ({ type: 'saveUserInfo', data: data.data.user });
                    this.refs.toast.show('Added to Favourites', DURATION.LENGTH_LONG)
				}else{
					this.refs.toast.show('Added to Favourites', DURATION.LENGTH_LONG)
				}
			})
        }
    }

    render(){
        return(
            <View style = {styles.modalView}>
                <TouchableOpacity style = {styles.blankView} onPress = { this.props.onClickedBack}>
                </TouchableOpacity>
                
                <View style = {styles.modalMainView}>
                    <ScrollView horizontal = {false} showsHorizontalScrollIndicator = {false} >
                    {
                        this.state.isLocation? <RecommendLocation venue={this.props.venue}/> : <RecommendFeedback venue={this.props.venue}/>
                    }      
                    </ScrollView>
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
function mapStateToProps(state) {
    return { userInfo: state.user.userInfo }
}
export default connect(mapStateToProps,null)(recommendModal);