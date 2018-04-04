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

class editProfile extends Component<{}>{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props){
        super(props);
        this.state = {
            username: 'Den Potapov',
            city: 'Toronto'
        }
    }
    
    componentWillMount() {
        
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

    onSaveChanges(){
        this.props.navigation.goBack()
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
                        <Label style = {styles.screentitle}>EDIT PROFILE</Label>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Thumbnail square source = {images.ic_avatar} style = {styles.avatarImg}/>
                        </Button>
                    </Right>
                </Header>
                <View style = {styles.mainContainer}>
                    <View>
                        <Label style = {styles.usernametxt}>USERNAME</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ username: text })}
                            value = {this.state.username}
                            placeholder = "Username"
                            placeholderTextColor = "#4a6187"
                            autoCapitalize = 'none'
                            autoCorrect = {false}
                        />
                        <View style = {styles.underline}/>
                    </View>
                    <View style = {{marginTop: 30}}>
                        <Label style = {styles.usernametxt}>LOCATION</Label>
                        <TextInput
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ city: text })}
                            value = {this.state.city}
                            placeholder = "Username"
                            placeholderTextColor = "#4a6187"
                            autoCapitalize = 'none'
                            autoCorrect = {false}
                        />
                        <View style = {styles.underline}/>
                    </View>
                    <View style = {{marginTop: 30}}>
                        <Label style = {styles.usernametxt}>DESCRIPTION</Label>
                        <Label style = {styles.descriptiontxt}>Curabitur ullamcorper ultricies nisi. Nam eget dui. rhoncus</Label>
                        <View style = {styles.underline}/>
                    </View>
                    <Button transparent style = {{marginTop: 60}} onPress = {() => this.onSaveChanges()}>
                        <View style = {styles.saveView}>
                            <Label style = {styles.saveTxt}>SAVE CHANGES</Label>
                        </View>
                    </Button>
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

export default connect()(editProfile);