import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Content, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Header, Left, Right, Body, Tabs, Tab, TabHeading
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { 
    Animated, Keyboard, AsyncStorage, TextInput, TouchableOpacity, ScrollView, Modal
} from 'react-native';
import styles from './styles';
import images from '../../themes/images'
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

class voteModal extends Component<{}>{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false,
        drawerLabel: () => null
    }

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    onClickLocation(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'location', params: {isModal: true}}));
    }

    render(){
        return(
            <View style = {styles.modalView}>
                <TouchableOpacity style = {styles.blankView} onPress = { this.props.onClickedBack}>
                </TouchableOpacity>
                <View style = {styles.modalMainView}>               
                    <Label style = {styles.modaltitle}>DESIGN COMMUNITY</Label>
                    <Label style = {styles.countmemberTxt}>12 members</Label>
                    <Thumbnail square source = {images.ic_groupimage} style = {styles.groupImg}/>

                    <View style = {styles.aboutView}>
                        <Thumbnail square source = {images.ic_avatar} style = {styles.avatarImg}/>
                        <Label style = {styles.label1}>Wendy's</Label>
                        <Label style = {styles.label1}>11/04/2018  •  6:30 pm</Label>
                    </View>

                    <TouchableOpacity onPress = {this.props.onClickVoteLocation}>  
                        <Thumbnail square source = {images.tab_location} style = {styles.locationImg}/>
                    </TouchableOpacity>

                    <View style = {styles.fingView}>
                        <TouchableOpacity>
                            <Thumbnail square source = {images.ic_finger_up} style = {styles.likeImg}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Thumbnail square source = {images.ic_finger_down} style = {[styles.likeImg, {marginLeft: 20}]}/>
                        </TouchableOpacity>
                    </View>

                    <View style = {styles.inputView}>
                        <AutoGrowingTextInput style={styles.textInput} placeholder={'Type Comment'} />
                    </View>
                </View>

                <Button style = {styles.voteBtnView} onPress = { this.props.onClickedBack}>
                    <Label style = {styles.voteTxt}>VOTE</Label>
                </Button>
                
            </View>
        )
    }
}

export default connect()(voteModal);