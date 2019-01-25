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

class privacypolicyModal extends Component{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false,
    }
    constructor(props){
        super(props);
        this.state = {
            content: ''
        }
    }
    
    componentWillMount() {
        // RNFS.readFile(this.props.path, 'utf8')
        // .then((contents) => {
        //   this.setState({
        //       content: contents
        //   })
        // })
    }
    render(){
        return(
            <View style = {styles.modalView}>
                <TouchableOpacity style = {styles.blankView} onPress = { this.props.onClickedBack}>
                </TouchableOpacity>
                <View style = {styles.modalMainView}>
                    <Label style = {styles.modaltitle}>{this.props.title}</Label>
                    <ScrollView vertical = {true} showsHorizontalScrollIndicator = {false} >
                    {
                        <Text style = {styles.modaldescription}>{this.props.content}</Text>
                    }
                    </ScrollView>
                </View>
                
            </View>
        )
    }
}

export default connect()(privacypolicyModal);