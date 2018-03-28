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
import MapView from 'react-native-maps';

class location extends Component<{}>{
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


    render(){
        const { region } = this.props;
        console.log(region);
        return(
            <View style ={styles.container}>
                <MapView
                    style={ styles.map }
                    initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                />
                <Header style = {styles.header}>
                    <Left>
                        <Button transparent>
                            <Thumbnail square source = {images.ic_backBtn} style = {styles.menuImg}/>
                        </Button>
                    </Left>
                    <Body>
                        <Label style = {styles.screentitle}></Label>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Thumbnail square source = {null} style = {styles.avatarImg}/>
                        </Button>
                    </Right>
                </Header>
                
                <View style = {styles.searchView}>
                    <Thumbnail square source = {images.ic_searchbox_backgroundImage} style = {styles.searchBackgroundImg}/>
                    <Thumbnail square source = {images.ic_search} style = {styles.searchImg}/>
                    <TextInput
                        ref = 'username'
                        style = {styles.inputTxt}
                        onChangeText = { text => this.setState({ searchWord: text })}
                        value = {this.state.searchWord}
                        placeholder = "Start typing"
                        placeholderTextColor = "#4a6187"
                        autoCapitalize = 'none'
                        autoCorrect = {false}
                    />
                </View>
            </View>
        )
    }
}

export default connect()(location);