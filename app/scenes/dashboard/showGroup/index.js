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

class newGroup extends Component<{}>{
    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
        this.state = {

        }
    }
    
    componentWillMount() {
        
    }

    onMakeRecomendation(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'location'}));
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
                        <Label style = {styles.screentitle}>GROUP</Label>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Thumbnail square source = {null} style = {styles.avatarImg}/>
                        </Button>
                    </Right>
                </Header>
                <View style = {styles.mainContainer}>
                    <View style = {styles.rowView}>
                        <Label style = {styles.groupTitle}>DESIGN COMMUNITY</Label>
                        <Label style = {styles.countmemberTxt}>12 members</Label>
                        <Thumbnail square source = {images.ic_groupimage} style = {styles.groupImg}/>
                    </View>
                    <Button transparent onPress = {() => this.onMakeRecomendation()}>
                        <View style = {styles.makeView}>
                            <Label style = {styles.makeTxt}>MAKE RECOMENDATION</Label>
                        </View>
                    </Button>
                </View>
            </View>
        );

    }
}

export default connect()(newGroup);