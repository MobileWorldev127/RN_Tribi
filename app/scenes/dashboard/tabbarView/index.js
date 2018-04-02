//import liraries
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'
import {
    Container, Content, Body, Text, Thumbnail, Button, Footer, View, Label, Item, Input,  Header, Left, Right
} from 'native-base'
import {
    Keyboard, AsyncStorage, Image, TouchableOpacity, Dimensions, Platform, StatusBar
} from 'react-native'
import styles from './styles'
import images from '../../../themes/images'
import { NavigationActions } from 'react-navigation'

import Home from '../home/index';
import Accounts from '../accounts/index';
import Favorite from '../favorite/index';
import NewGroup from '../newGroup/index';
import showGroup from '../showGroup/index';
import voteGroup from '../voteGroup/index';


const HomeNavigator = StackNavigator({
        Home: { screen: Home},
        NewGroup: { screen: NewGroup },
        showGroup: { screen: showGroup },
        voteGroup: { screen: voteGroup },
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
    }
)

const FavoriteNavigator = StackNavigator({
        Favorite: { screen: Favorite},
    },
    {
        initialRouteName: 'Favorite',
        headerMode: 'none',
    }
)

const AccountNavigator = StackNavigator({
        Accounts: { screen: Accounts},
    },
    {
        initialRouteName: 'Accounts',
        headerMode: 'none',
    }
)

// create a component
class tabbarView extends Component<{}>{
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            isHome: true,
            isFavorite: false,
            isAccount: false,
            isLocation: false,
        }
    }

    componentWillMount() {
        if(this.props.navigation.state.params.index == 0){
            this.onHome();
        }
        else if(this.props.navigation.state.params.index == 1){
            this.onFavorite();
        }
        else if(this.props.navigation.state.params.index == 2){
            this.onAccount();
        }
        else {
            this.onLocation()
        }
    }

    onHome() {
        this.setState({
            isHome: true,
            isFavorite: false,
            isAccount: false,
            isLocation: false,
        })
    }

    onFavorite() {
        this.setState({
            isHome: false,
            isFavorite: true,
            isAccount: false,
            isLocation: false,
        })
    }

    onAccount() {
        this.setState({
            isHome: false,
            isFavorite: false,
            isAccount: true,
            isLocation: false,
        })
    }

    onLocation(){
        this.setState({
            isHome: false,
            isFavorite: false,
            isAccount: false,
            isLocation: true,
        })
    }

    onCreateGroup(){
        this.setState({
            isHome: false,
            isFavorite: false,
            isAccount: false,
            isLocation: false,
        })
    }
    

    showMainView(){
        if(this.state.isHome == true){
            return(
                <View style = {styles.mainView}>
                    <Home />
                </View>
            )
        }
        else if(this.state.isFavorite){
            return(
                <View style = {styles.mainView}>
                    <Favorite />
                </View>
            )
        }
        else if(this.state.isAccount){
            return(
                <View style = {styles.mainView}>
                    <Accounts />
                </View>
            )
        }
        else if(this.state.isLocation){
            return(
                <View style = {styles.mainView}>
                    <Home/>
                </View>
            )
        }
    }

    showTitle(){
        if(this.state.isHome == true){
            return(
                <Label></Label>
            )
        }
        else if(this.state.isFavorite){
            return(
                <Label style = {styles.screentitle}>FAVOURITES</Label>
            )
        }
        else if(this.state.isAccount){
            return(
                <Label style = {styles.screentitle}>SEARCH</Label>
            )
        }
    }

    render() {
        return (
            <Container style = {styles.container}>
                {/*<StatusBar
                    backgroundColor="black"
                    barStyle="light-content"
                />*/}
                <Thumbnail square source = {images.ic_home_backgroundImage} style = {styles.signInBackgroundImg}/>
                { this.showMainView() }
                
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
                
            </Container>
        );
    }
}

//make this component available to the app
export default connect()(tabbarView);
