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
import DatePicker from 'react-native-datepicker'
import styles from './styles';
import images from '../../themes/images'
function debounce(a,b,c){var d,e;return function(){function h(){d=null,c||(e=a.apply(f,g))}var f=this,g=arguments;return clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e}}

class showMemberModal extends Component{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            members: [],
            originalMember: []
        }
    }

    componentWillMount() {
        let members = this.props.members.sort(function(a, b){
            return a.username > b.username
        }) 
        this.setState({
            members: members,
            originalMember: members
        })
    }

    onClose = () => {
        this.props.onClickedBack()
    }
    renderRow(item, index){
        console.log(item)
        return(
                <View style = {styles.rowView} key = {index}>
                    <Thumbnail square source = {{uri:item.photo}} style = {styles.userImg}/>
                    <View>
                        <Label style = {styles.groupName}>{item.username}</Label>
                    </View>
                </View>
        )
    }
    onSearch = debounce(searchTerm => {
        let originalMembers = this.state.originalMember
        let filteredMembers = originalMembers.filter((contact) => {
            let name_str = contact.username
            return name_str.toLowerCase().indexOf(searchTerm.toLowerCase()) >=0 
        })
        this.setState({
            members: filteredMembers
        })
    }, 300)
    render(){
        return(
            <View style = {styles.modalView}>
                <TouchableOpacity style = {styles.blankView} onPress = { this.props.onClickedBack}>
                </TouchableOpacity>

                    <View style = {styles.modalMainView}>  
                        <ScrollView vertical = {true} showsHorizontalScrollIndicator = {false} >
                            {
                                this.state.members.map((item, index) => {
                                    return( this.renderRow(item, index))
                                })
                            }
                        </ScrollView>
                    </View>
                    <Button style = {styles.recommendBtnView} onPress = {this.onClose}>
                        <Label style = {styles.recommedTxt}>Close</Label>
                    </Button>

            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        
    }
}
export default connect(mapStateToProps)(showMemberModal);