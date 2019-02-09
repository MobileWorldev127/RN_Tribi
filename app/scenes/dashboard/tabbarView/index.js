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
import Location from '../location/index';

// create a component
class tabbarView extends Component{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false,
        drawerLabel: () => null
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
        var { dispatch } = this.props;
        dispatch({type:'changeVenuesOfLocation', data: this.props.nearvenues})
        dispatch(NavigationActions.navigate({routeName: 'location', params: {isModal: false}}));
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
                    <Home navigation = {this.props.navigation}/>
                </View>
            )
        }
        else if(this.state.isFavorite){
            return(
                <View style = {styles.mainView}>
                    <Favorite navigation = {this.props.navigation}/>
                </View>
            )
        }
        else if(this.state.isAccount){
            return(
                <View style = {styles.mainView}>
                    <Accounts navigation = {this.props.navigation}/>
                </View>
            )
        }
        
    }

    render() {
        return (
            <Container style = {styles.container}>
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
                            <Thumbnail square source = {images.tab_location} style = {styles.tabIcon}/>
                            <Thumbnail square source = {images.tab_backgroundImage} style = { styles.tabBackgroundImg1}/>
                        </View>
                    </TouchableOpacity>
                </View>
                
            </Container>
        );
    }
}
function mapStateToProps(state) {
    return { categories: state.appdata.categories,
             nearvenues: state.appdata.nearvenues,
             user: state.user.userInfo  }
}
//make this component available to the app
export default connect(mapStateToProps)(tabbarView);
