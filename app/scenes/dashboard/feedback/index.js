import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Header, Left, Right, Body
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { 
    Animated, Keyboard, AsyncStorage, TextInput, TouchableOpacity, ScrollView, Dimensions
} from 'react-native';
import styles from './styles';
import { BallIndicator } from 'react-native-indicators'
import images from '../../../themes/images'
import friendProfile from '../friendProfile/index';
import Toast, {DURATION} from 'react-native-easy-toast'
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

const { width, height } = Dimensions.get('window');
import { sendFeedback } from '../../../actions'
var searchList = [
    {name: 'Joshua Francis', city: 'Toronto', avatar: images.ic_avatar1},
    {name: 'Den Potapov', city: 'Kyiv', avatar: images.ic_avatar2},
    {name: 'Joshua Francis', city: 'Toronto', avatar: images.ic_avatar1},
    {name: 'Den Potapov', city: 'Kyiv', avatar: images.ic_avatar2},
    {name: 'Joshua Francis', city: 'Toronto', avatar: images.ic_avatar1},
]
var Contacts = require('react-native-contacts')

function debounce(a,b,c){var d,e;return function(){function h(){d=null,c||(e=a.apply(f,g))}var f=this,g=arguments;return clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e}}
class feedback extends Component{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props){
        super(props);
        this.state = {
            comment: ''
        }
        
    }
    
    componentWillMount() {
    }

    onClickedProfile(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'userProfile'}));
    }


    onClickedBack(){
        Keyboard.dismiss()
        var { dispatch } = this.props; 
        dispatch(NavigationActions.back())
    }
    onSubmit() {
        let params = {
            "comment": this.state.comment
        }
        sendFeedback(params).then((res) => {
            if (res.success) {
                this.refs.toast.show('Sent feedback Successfully!', DURATION.LENGTH_LONG)
            } else {
                this.refs.errortoast.show('Try again!', DURATION.LENGTH_LONG)
            }
        })
    }
    render(){
        return (
            <View style={styles.container}>
                <Thumbnail square source = {images.ic_home_backgroundImage} style = {styles.signInBackgroundImg}/>
                <Header style = {styles.header}>
                    <Left>
                        <Button transparent onPress = {() => this.onClickedBack()}>
                            <Thumbnail square source = {images.ic_backBtn} style = {styles.menuImg}/>
                        </Button>
                    </Left>
                    <Body>
                        <Label style = {styles.screentitle}>Feedback</Label>
                    </Body>
                    <Right>
                        <Button transparent onPress = {() => this.onClickedProfile()}>
                            <Thumbnail square source = {{uri: this.props.user.photo}} style = {styles.avatarImg}/>
                        </Button>
                    </Right>
                </Header>
                <View style = {styles.mainContainer}>
                    <AutoGrowingTextInput onChangeText={(text) => {
                                        this.setState({
                                            comment: text
                                        })
                                    }} style={styles.textInput} placeholder={'Type Comment'} />
                    <Button transparent style = {styles.button} onPress = {() => this.onSubmit()} >
                        <View style = {styles.signinView}>
                            <Label style = {styles.signinTxt}>Submit</Label>
                        </View>
                    </Button>
                </View>
                <Toast
                    ref = 'toast'
                    style = {{backgroundColor: '#35e49c'}}
                    position = 'top'
                    positionValue = {height/2}
                    fadeInDuration = {750}
                    fadeOutDuration = {1000}
                    opacity = {0.8}
                    textStyle = {{color: 'white'}}
                />
                <Toast
                    ref = 'errortoast'
                    style = {{backgroundColor: '#f98192'}}
                    position = 'top'
                    positionValue = {height/2}
                    fadeInDuration = {750}
                    fadeOutDuration = {1000}
                    opacity = {0.8}
                    textStyle = {{color: 'white'}}
                />
            </View>
        );

    }
}
function mapStateToProp(state) {
    return {
        user: state.user.userInfo
    }
}
export default connect(mapStateToProp)(feedback);