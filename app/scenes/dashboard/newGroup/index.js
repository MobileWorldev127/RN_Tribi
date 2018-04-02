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
import Switch from 'react-native-switch-pro'

class newGroup extends Component<{}>{
    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
        this.state = {
            username: '',
            friends: '',
            emailValue: true,
            friendsValue: true
        }
    }
    
    componentWillMount() {
    }

    onCreate(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'showGroup'}));
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
                        <Label style = {styles.screentitle}>NEW GROUP</Label>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Thumbnail square source = {null} style = {styles.avatarImg}/>
                        </Button>
                    </Right>
                </Header>
                <View style = {styles.mainContainer} showsVerticalScrollIndicator={false}>
                    <View style = {{flex: 1}}>
                        <View>
                            <Label style = {styles.generaltxt}>GENERAL</Label>
                            <Label style = {styles.nametxt}>NAME</Label>
                            <TextInput
                                style = {styles.inputTxt}
                                onChangeText = { text => this.setState({ username: text })}
                                value = {this.state.username}
                                placeholder = "Group Name"
                                placeholderTextColor = "#4a6187"
                                autoCapitalize = 'none'
                                autoCorrect = {false}
                            />
                            <View style = {styles.underline}/>
                            
                            <View>
                                <Label style = {styles.friendtxt}>FRIENDS</Label>
                                <View style = {styles.friendsubView}>
                                    <Label style = {styles.friendTxt} >Den Potapov</Label>
                                    <TouchableOpacity>
                                        <Thumbnail source = {images.ic_friend_add} style = {styles.addfriendImg}/>
                                    </TouchableOpacity>
                                </View>
                                <View style = {styles.underline}/>
                            </View>
                        </View>
                        
                        <View>
                            <Label style = {styles.notificationtxt}>NOTIFICATIONS</Label>
                            <View style = {styles.emailsubView}>
                                <Label style = {styles.friendTxt}>Email Notifications</Label>
                                <Switch
                                    value={this.state.emailValue}
                                />
                            </View>
                            <View style = {styles.underline}/>
                            <View style = {styles.emailsubView}>
                                <Label style = {styles.friendTxt}>New Friends</Label>
                                <Switch
                                    value={this.state.friendsValue}
                                />
                            </View>
                            <View style = {styles.underline}/>
                            
                        </View>
                    </View>
                    
                    <Button transparent onPress = {() => this.onCreate()} style = {styles.createView}>
                        <Label style = {styles.createTxt}>CREATE</Label>
                    </Button>




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
            </View>
        );

    }
}

export default connect()(newGroup);