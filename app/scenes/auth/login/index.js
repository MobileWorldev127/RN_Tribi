import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { 
    Animated, Keyboard, AsyncStorage, TextInput, TouchableOpacity
} from 'react-native';
import styles from './styles';
import { BallIndicator } from 'react-native-indicators'

import images from '../../../themes/images'

class login extends Component<{}>{
    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoading: false
        }
    }
    
    componentWillMount() {
    }


    onBack(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.back()) 
    } 

    onForgotPassword(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'lostpassword'}))
    }

    onLogin(){
        Keyboard.dismiss();
        // if (!this.state.username.length) {
        //     alert('Please enter username address');
        //     return
        // }
        // if (!this.state.password.length) {
        //     alert('Please enter password');
        //     return;
        // }
        // this.setState({ isLoading: true })
        // userLogIn(this.state.username, this.state.password).then(data => {
        //     if(data.data.loggedin){
        //         AsyncStorage.setItem('auth_token', data.data.user.id)
        //         var { dispatch } = this.props;
        //         dispatch ({ type: 'userInfo', data: data.data.user })
        //         getFeedList().then(data => {
        //             var { dispatch } = this.props;
        //             arr = data.items
        //             var feedList = []
        //             for(var i=0; i<arr.length; i++){
        //                 var start = arr[i].title.indexOf('[');
        //                 var end = arr[i].title.indexOf(']')
        //                 var str = arr[i].title.substring(start+1, end)
        //                 if(str != 'COMMENT'){
        //                     if(str != 'N/A'){
        //                         feedList.push(arr[i])
        //                     }
        //                 }
        //             }
        //             dispatch ({ type: 'feed', data: feedList });
        //             AsyncStorage.getItem('@Welcome').then((value) =>{
        //                 if(value == 'PASSED'){
        //                     dispatch(NavigationActions.navigate({routeName: 'discover'}));
        //                 }
        //                 else{
        //                     dispatch(NavigationActions.navigate({routeName: 'welcome'}));
        //                 }
        //             }) 
        //         })
        //     }
        //     else {
        //         this.setState({ isLoading: false })
        //         alert('Please verify your confirm email addres ')
        //     }
            
        // })
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'tabbarView'}));
    }

    onSignup(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'signup'}));
    }

    onForgotPassword() {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'forgotpassword'}));
    }

    render(){
        return (
            <Container style={styles.container}>
                <Thumbnail square source = {images.backgroundImage} style = {styles.signInBackgroundImg}/>
                 <Content>
                    <View style={styles.mainContainer}>
                        <View style = {styles.inputUsernameView}>
                            <Thumbnail square source = {images.ic_user} style = {styles.userImg}/>
                            <View style = {{flex: 1,}}>
                                <TextInput
                                    ref = 'username'
                                    style = {styles.inputTxt}
                                    onChangeText = { text => this.setState({ username: text })}
                                    value = {this.state.username}
                                    placeholder = "Username"
                                    placeholderTextColor = "#4a6187"
                                    autoCapitalize = 'none'
                                    autoCorrect = {false}
                                />
                                <View style = {styles.line}/>
                            </View>
                        </View>    
                        <View style = {styles.inputPasswordView}>
                            <Thumbnail square source = {images.ic_password} style = {styles.userImg}/>
                            <View style = {{flex: 1,}}>
                                <TextInput
                                    ref = 'password'
                                    style = {styles.inputTxt}
                                    onChangeText = { text => this.setState({ password: text })}
                                    secureTextEntry
                                    value = {this.state.password}
                                    placeholder = "Password"
                                    placeholderTextColor = "#4a6187"
                                    autoCapitalize = 'none'
                                    autoCorrect = {false}
                                />
                                <View style = {styles.line}/>
                            </View>
                        </View>
                        <TouchableOpacity transparent style = {{marginTop: 30}} onPress = {() => this.onForgotPassword()}>
                            <Label style = {styles.forgotTxt} >Forgot password?</Label>
                        </TouchableOpacity>
                        <Button transparent style = {{marginTop: 25}} onPress = {() => this.onLogin()}>
                            <View style = {styles.signinView}>
                                <Label style = {styles.signinTxt}>SIGN IN</Label>
                            </View>
                        </Button>
                        <View style = {styles.signUpView}>
                            <Label style = {styles.label1}>Dont' have account?</Label>
                            <Button transparent onPress = {() => this.onSignup()}>
                                <Label style = {styles.label2}>  Sign Up</Label>
                            </Button>
                        </View>
                        <Button transparent style = {{marginTop: 55}}>
                            <View style = {styles.facebookView}>
                                <Label style = {styles.facebookTxt}>LOG IN WITH FACEBOOK</Label>
                            </View>
                        </Button>

                    </View>
                </Content>
            </Container>
        );

    }
}

export default connect()(login);