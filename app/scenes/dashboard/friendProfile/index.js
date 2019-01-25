import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Header, Left, Right, 
  Body
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { 
    Animated, Keyboard, AsyncStorage, TextInput, TouchableOpacity, ScrollView
} from 'react-native';
import styles from './styles';
import { BallIndicator } from 'react-native-indicators'
import images from '../../../themes/images'

class friendProfile extends Component{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props){
        super(props);
        this.state = {
			name: '',
			city: '',
			hasthumbnail: '',
			thumbnail: '',
			jobtitle: ''
        }
    }
    
    componentWillMount() {
        let profile_info = this.props.navigation.state.params.item
		let name_str = profile_info.givenName + ' ' + profile_info.familyName
		let city_str = 'Unknown'
		if (profile_info.postalAddresses.length > 0) {
			city_str =  profile_info.postalAddresses[0].city
		}
		let image_str = images.ic_photo_default
		if (profile_info.hasThumbnail) {
			image_str = profile_info.thumbnailPath
		}
		let jobtitle = profile_info.jobTitle
		this.setState({
			name: name_str,
			city: city_str,
			hasthumbnail: profile_info.hasThumbnail,
			thumbnail: image_str,
			jobtitle: jobtitle
		})
    }


    onHome() {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'tabbarView', params: {index: 0}}));
    }

    onFavorite() {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'tabbarView', params: {index: 1}}));
    }

    onAccount() {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'tabbarView', params: {index: 2}}));
    }

    onLocation() {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'tabbarView', params: {index: 3}}));
    }

    render(){
        return (
            <View style={styles.container}>
                <Thumbnail square source = {images.ic_home_backgroundImage} style = {styles.signInBackgroundImg}/>
                <Header style = {styles.header}>
                    <Left>
                        <Button transparent onPress = {() => this.props.navigation.goBack()}>
                            <Thumbnail square source = {images.ic_backBtn} style = {styles.menuImg}/>
                        </Button>
                    </Left>
                    <Body>
                        <Label style = {styles.screentitle}>PROFILE</Label>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Thumbnail square source = {null} style = {styles.avatarImg}/>
                        </Button>
                    </Right>
                </Header>
                <View style = {styles.mainContainer}>
                    <View style = {styles.aboutView}>
			{this.state.hasthumbnail?<Thumbnail square source = {{uri:this.state.thumbnail}} style = {styles.userImg}/>:<Thumbnail square source = {this.state.thumbnail} style = {styles.userImg}/>}
                        <Label style = {styles.userName}>{this.state.name}</Label>
                        <Label style = {styles.userCity}>{this.state.city}</Label>
                        <Label style = {styles.userAbout}>{this.state.jobtitle}</Label>
                    </View>
                
                </View>

                

                <View style = {styles.tabView}>
                    <TouchableOpacity  onPress = {() => this.onHome()}>
                        <View style = {styles.tabBtn}>
                            <Thumbnail square source = {images.tab_home} style = {[styles.tabIcon, {tintColor: this.state.isHome? '#33e098': null}]}/>
                            <Thumbnail square source = {images.tab_backgroundImage} style = {this.state.isHome? styles.tabBackgroundImg: styles.tabBackgroundImg1}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.onFavorite()}>
                        <View style = {styles.tabBtn}>
                            <Thumbnail square source = {images.tab_favorite} style = {[styles.tabIcon, {tintColor: this.state.isFavorite? '#33e098': null}]}/>
                            <Thumbnail square source = {images.tab_backgroundImage} style = {this.state.isFavorite? styles.tabBackgroundImg: styles.tabBackgroundImg1}/>
                        </View>
                        
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.onAccount()}>
                        <View style = {styles.tabBtn}>
                            <Thumbnail square source = {images.tab_account} style = {[styles.tabIcon, {tintColor: this.state.isAccount? '#33e098': null}]}/>
                            <Thumbnail square source = {images.tab_backgroundImage} style = {this.state.isAccount? styles.tabBackgroundImg: styles.tabBackgroundImg1}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.onLocation()}>
                        <View style = {styles.tabBtn}>
                            <Thumbnail square source = {images.tab_location} style = {[styles.tabIcon, {tintColor: this.state.isLocation? '#33e098': null}]}/>
                            <Thumbnail square source = {images.tab_backgroundImage} style = {this.state.isLocation? styles.tabBackgroundImg: styles.tabBackgroundImg1}/>
                        </View>
                    </TouchableOpacity>
                </View>

                

            </View>
        );

    }
}

export default connect()(friendProfile);