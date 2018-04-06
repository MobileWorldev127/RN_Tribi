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
    {name: 'Design Community', members: 12, isSelected: false },
    {name: 'Sport Community', members: 4, isSelected: false},
    {name: 'Music Community', members: 7, isSelected: false},
    {name: 'Travel Community', members: 10, isSelected: false},
    {name: 'Design Community', members: 12, isSelected: false},
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
            groupList: groupList
        }
    }

    componentWillMount() {
        var groupList = [
            {name: 'Design Community', members: 12, isSelected: false },
            {name: 'Sport Community', members: 4, isSelected: false},
            {name: 'Music Community', members: 7, isSelected: false},
            {name: 'Travel Community', members: 10, isSelected: false},
            {name: 'Design Community', members: 12, isSelected: false},
        ]
        this.setState({
            modalVisible: false,
            groupList: groupList
        })
    }

    onSelectGroup(item, index){
        if(item.isSelected){
            this.state.groupList[index]['isSelected'] = false
            this.setState({modalVisible: true})
        }else{
            this.state.groupList[index]['isSelected'] = true
            this.setState({modalVisible: true})
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
                <TouchableOpacity onPress = {() => this.onSelectGroup(item, index)}>
                    <Thumbnail square source = {item.isSelected? images.ic_checkImage : images.ic_uncheckImage} style = {styles.checkIcon}/>
                </TouchableOpacity>
                
            </View>
        )
    }

    render(){
        return(
            <View style = {styles.modalView}>
                <TouchableOpacity style = {styles.blankView} onPress = { this.props.onClickedBack}>
                </TouchableOpacity>
                    <View style = {styles.modalMainView}>     
                        {
                            this.state.groupList.map((item, index) => {
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