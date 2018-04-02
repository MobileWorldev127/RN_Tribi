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

var commendList = [
    {user: '1'},
    {user: '2'},
    {user: '3'},
]

class commendFeedModal extends Component<{}>{
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    showLikeCommend(){
        return(
            <Content>
                {   
                    commendList.map((item, index) => {
                        return(
                            <View style = {styles.rowView}  key = {index}>
                                <Thumbnail square source = {images.ic_avatar2} style = {styles.userImg}/>
                                <View style = {{flex: 1}}>
                                    <Label style = {styles.label1}>Amanda</Label>
                                    <Label style = {styles.label2}>Like this place, everything will be great. Let's do it.</Label>
                                </View>
                            </View>
                        )
                    })
                }
            
            </Content>
        )
    }

    showUnLikeCommend(){
        return(
            <Content>
                {   
                    commendList.map((item, index) => {
                        return(
                            <View style = {styles.rowView}  key = {index}>
                                <Thumbnail square source = {images.ic_avatar2} style = {styles.userImg}/>
                                <View style = {{flex: 1}}>
                                    <Label style = {styles.label1}>Amanda</Label>
                                    <Label style = {styles.label2}>Like this place, everything will be great. Let's do it.</Label>
                                </View>
                            </View>
                        )
                    })
                }
            
            </Content>
        )
    }

    render(){
        return(
            <View style = {styles.modalView}>
                <TouchableOpacity style = {styles.blankView} onPress = { this.props.onClickedBack}>
                </TouchableOpacity>
                <View style = {styles.modalMainView}>
                    <Tabs initialPage={0} tabBarUnderlineStyle = {{backgroundColor: '#33e098', height: 2}} locked = {true}>
                        <Tab heading= { <TabHeading><Thumbnail square source = {images.ic_finger_up} style = {styles.tabicon}/><Text style = {styles.tabtxt}>6</Text></TabHeading> } > 
                            {this.showLikeCommend()}
                        </Tab>
                        <Tab heading= { <TabHeading><Thumbnail square source = {images.ic_finger_down} style = {styles.tabicon}/><Text style = {styles.tabtxt}>9</Text></TabHeading> } > 
                            {this.showUnLikeCommend()}
                        </Tab>
                    </Tabs>
                </View>

                
                
            </View>
        )
    }
}

export default connect()(commendFeedModal);