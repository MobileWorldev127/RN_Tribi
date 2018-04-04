//import libraries
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity,AsyncStorage } from 'react-native';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input
} from 'native-base';
import styles from './styles'
import images from '../../themes/images'
import { connect } from 'react-redux'

// create a component
class sidebar extends Component<{}>{
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
		super(props);
		this.state = {
            
		};
	}

    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.menuProfileView}>
                    <Thumbnail square source = {images.ic_avatar} style = {styles.avartarImg}/>
                    <View>
                        <Label style = {styles.nameTxt}>Den Potapov</Label>
                        <Label style = {styles.emailTxt}>test@test.com</Label>
                    </View>
                    
                </View>

                <View style = {styles.menuView}>
                    <TouchableOpacity>
                        <Label style = {styles.logTxt}>LOG OUT</Label>
                    </TouchableOpacity>
                </View>                
            </View>
        );
    }
}

//make this component available to the app
export default connect()(sidebar);
