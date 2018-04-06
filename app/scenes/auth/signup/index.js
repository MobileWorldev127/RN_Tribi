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

class signup extends Component<{}>{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false,
        drawerLabel: () => null
    }

    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmpassword: '',
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

    render(){
        return (
            <Container style={styles.container}>
                <Thumbnail square source = {images.signUp_backgroundImage} style = {styles.signInBackgroundImg}/>
                 <Content>
                    <View style={styles.mainContainer}>
                        <Label style = {styles.signUptitle}>SIGN UP</Label>
                        <View style = {styles.inputUsernameView}>
                            <Thumbnail square source = {images.ic_user} style = {styles.userImg}/>
                            <View style = {{flex: 1}}>
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
                        <View style = {styles.inputPasswordView}>
                            <Thumbnail square source = {images.ic_password} style = {styles.userImg}/>
                            <View style = {{flex: 1,}}>
                                <TextInput
                                    ref = 'password'
                                    style = {styles.inputTxt}
                                    onChangeText = { text => this.setState({ confirmpassword: text })}
                                    secureTextEntry
                                    value = {this.state.confirmpassword}
                                    placeholder = "Password"
                                    placeholderTextColor = "#4a6187"
                                    autoCapitalize = 'none'
                                    autoCorrect = {false}
                                />
                                <View style = {styles.line}/>
                            </View>
                        </View>

                        <Button transparent style = {{marginTop: 45}}>
                            <View style = {styles.signinView}>
                                <Label style = {styles.signinTxt}>CREATE ACCOUNT</Label>
                            </View>
                        </Button>
                        <View style = {styles.signUpView}>
                            <Label style = {styles.label1}>Already have account?</Label>
                            <Button transparent onPress = {() => this.onBack()}>
                                <Label style = {styles.label2}>  Log in</Label>
                            </Button>
                        </View>
                        <Button transparent style = {styles.facebookView}>

                                <Label style = {styles.facebookTxt}>SIGN UP WITH FACEBOOK</Label>

                        </Button>

                    </View>
                </Content>
            </Container>
        );

    }
}

export default connect()(signup);