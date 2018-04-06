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

class forgotpassword extends Component<{}>{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false,
        drawerLabel: () => null
    }

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoading: false
        }
    }
  
    onBack(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.back()) 
    } 

    render(){
        return (
            <Container style={styles.container}>
                <Thumbnail square source = {images.signUp_backgroundImage} style = {styles.signInBackgroundImg}/>
                 <Content>
                    <View style={styles.mainContainer}>
                        <Label style = {styles.label1}>FORGOT PASSWORD?</Label>
                        <Label style = {styles.label2}>Enter your email below to receive your{'\n'}password reset instructions</Label>
                        <View style = {styles.inputEmailView}>
                            <Thumbnail square source = {images.ic_email} style = {styles.userImg}/>
                            <View style = {{flex: 1,}}>
                                <TextInput
                                    ref = 'password'
                                    style = {styles.inputTxt}
                                    onChangeText = { text => this.setState({ email: text })}
                                    keyboardType = 'email-address'
                                    value = {this.state.email}
                                    placeholder = "E-mail"
                                    placeholderTextColor = "#4a6187"
                                    autoCapitalize = 'none'
                                    autoCorrect = {false}
                                />
                                <View style = {styles.line}/>
                            </View>
                        </View>
                        <Button transparent style = {{marginTop: 45}} >
                            <View style = {styles.resetView}>
                                <Label style = {styles.resetTxt}>RESET PASSWORD</Label>
                            </View>
                        </Button>
                        <Button transparent style = {styles.signUpView} onPress = {() => this.onBack()}>
                            <Thumbnail square source = {images.ic_backBtn} style = {styles.backImg}/>
                            <Label style = {styles.label3}>Get back to</Label>
                            <Label style = {styles.label4}>  Sign Up</Label>
                            
                        </Button>
                    </View>
                </Content>
            </Container>
        );

    }
}

export default connect()(forgotpassword);