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

class welcome extends Component<{}>{
    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false
        }
    }

    onNext() {
        alert('12')
    }
    
  
    render(){
        return (
            <Container style={styles.container}>
                <Thumbnail square source = {images.signUp_backgroundImage} style = {styles.signInBackgroundImg}/>
                <View style={styles.mainContainer}>
                    <View style = {styles.subView1}>
                        <Thumbnail square source = {images.ic_mapLocation} style = {styles.maplocationImg}/>
                    </View>
                    <View style = {styles.subView2}>
                        <Label style = {styles.label1}>FIND LOCAL ACTIVITIES{'\n'}TO TAKE PART IN</Label>
                        <Label style = {styles.label2}>Curabitur ullamcorper ultricies nisi. Nam eget{'\n'}dui. Etiam rhoncus. Maecenas tempus, tellus{'\n'}eget condimentum rhoncus</Label>
                        <Button transparent style = {{marginTop: 53}} onPress = {() => this.onNext()}>
                            <View style = {styles.nextView}>
                                <Label style = {styles.nextTxt}>NEXT</Label>
                            </View>
                        </Button>
                    </View>
                    
                    
                </View>
            </Container>
        );

    }
}

export default connect()(welcome);