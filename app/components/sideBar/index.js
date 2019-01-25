//import libraries
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, StatusBar, Image, TouchableOpacity,AsyncStorage } from 'react-native';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input
} from 'native-base';
import styles from './styles'
import images from '../../themes/images'
import { connect } from 'react-redux'

// create a component
class sidebar extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
		super(props);
		this.state = {
            
		};
	}
    logout() {
        AsyncStorage.setItem('user', '').then(()=>{
            let {dispatch} = this.props
            dispatch(NavigationActions.navigate({routeName: 'login', params: {index: 0}}));
        })
    }
    sendfeedback() {
        var {dispatch} = this.props
        dispatch(NavigationActions.navigate({routeName: 'feedback', params: {index: 0}}));
    }
    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.menuProfileView}>
                    <Thumbnail square source = {{uri: this.props.user.photo}} style = {styles.avatarImg}/>
                    <View style = {{ padding: 20}}>
                        <Label style = {styles.nameTxt}>{this.props.user.username}</Label>
                        <Label style = {styles.emailTxt}>{this.props.user.email}</Label>
                    </View>
                    
                </View>

                <View style = {styles.menuView}>
                    <TouchableOpacity onPress={()=>this.sendfeedback()}>
                        <Label style = {styles.logTxt}>LEAVE FEEDBACK</Label>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.logout()}>
                        <Label style = {styles.logTxt}>LOG OUT</Label>
                    </TouchableOpacity>
                </View>                
            </View>
        );
    }
}
function mapStateToProp(state) {
    return {
        user: state.user.userInfo
    }
}
//make this component available to the app
export default connect(mapStateToProp)(sidebar);
