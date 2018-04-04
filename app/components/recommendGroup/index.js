import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Header, Left, Right, 
  Body
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { 
    Animated, Keyboard, AsyncStorage, TextInput, TouchableOpacity, ScrollView, Modal
} from 'react-native';
import styles from './styles';
import images from '../../themes/images'

var groupList = [
    {name: 'Design Community', members: 12},
    {name: 'Sport Community', members: 4},
    {name: 'Music Community', members: 7},
    {name: 'Travel Community', members: 10},
    {name: 'Design Community', members: 12},
]

class recommendGroup extends Component<{}>{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
    }   

    renderRow(item, index){
        return(
            <View style = {styles.rowView} key = {index}>
                <Thumbnail square source = {images.ic_small_group_icon} style = {styles.groupIcon}/>
                <View>
                    <Label style = {styles.groupName}>{item.name}</Label>
                    <Label style = {styles.groupMembers}>{item.members} members</Label>
                </View>
                <Thumbnail square source = {images.ic_uncheckImage} style = {styles.checkIcon}/>
            </View>
        )
    }

    render(){
        return(
            <View style = {styles.modalView}>
                <TouchableOpacity style = {styles.blankView}>
                </TouchableOpacity>
                    <View style = {styles.modalMainView}>     
                        {
                            groupList.map((item, index) => {
                                return( this.renderRow(item, index))
                            })
                        }
                    </View>

                    <Button style = {styles.recommendBtnView} onPress = {this.props.onClickedRecommend}>
                        <Label style = {styles.recommedTxt}>RECOMMEND</Label>
                    </Button>

            </View>
        )
    }
}

export default connect()(recommendGroup);