import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, AsyncStorage, Platform, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input
} from 'native-base';
import images from '../../../themes/images'
import styles from './styles';
const { width, height } = Dimensions.get('window');

class tutorial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_step: 0,
            stepImagesForIphonX: [
                images.tutorial1x,
                images.tutorial2x,
                images.tutorial3x,
                images.tutorial4x,
                images.tutorial5x,
                images.tutorial6x,
            ],
            stepImagesForIphon6: [
                images.tutorial1,
                images.tutorial2,
                images.tutorial3,
                images.tutorial4,
                images.tutorial5,
                images.tutorial6,
            ],
        }
    }

    getImageForStep = () => {
        if (this.isIphoneX()) {
            return this.state.stepImagesForIphonX[this.state.current_step];
        } else {
            return this.state.stepImagesForIphon6[this.state.current_step];
        }
    }
    isIphoneX = () => {
        let d = Dimensions.get('window');
        const { height, width } = d;

        return (
            // This has to be iOS duh
            Platform.OS === 'ios' &&

            // Accounting for the height in either orientation
            (height === 812 || width === 812)
        );
    }
    onLogin() {
        AsyncStorage.setItem('tutorial', "viewed");
        var { dispatch } = this.props;
        // dispatch(NavigationActions.navigate({ routeName: 'login' }));
        dispatch(
            NavigationActions.navigate({
                routeName: "tabbarView",
                params: { index: 0 }
            })
        )
    }
    checkIfSkip(evt) {
        let x = evt.nativeEvent.locationX;
        let y = evt.nativeEvent.locationY;
        if (this.isIphoneX()) {

            x = x * this.rateVSXW();
            y = y * this.rateVSXH();
            const inWidth = x > 156 && x < 216;
            const inHeight = y > 740 && y < 781;
            if (inWidth && inHeight) {
                this.onLogin();
            }
        } else {
            x = x * this.rateVS6W();
            y = y * this.rateVS6H();
            const inWidth = x > 172 && x < 205;
            const inHeight = y > 632 && y < 648;
            if (inWidth && inHeight) {
                this.onLogin();
            }
        }
    }
    nextStep() {
        if (this.state.current_step==5) {
            this.onLogin();
        }
        this.setState({
            current_step: this.state.current_step+1
        })
    }
    checkIfGetStarted(evt) {
        let x = evt.nativeEvent.locationX;
        let y = evt.nativeEvent.locationY;
        let inWidth, inHeight = false;
        if (this.isIphoneX()) {
            x = x * this.rateVSXW();
            y = y * this.rateVSXH();
            switch (this.state.current_step) {
                case 0:
                    inWidth = x > 92 && x < 148;
                    inHeight = y > 75 && y < 111;
                    if (inWidth && inHeight) {
                        this.nextStep();
                    }
                    break;
                case 1:
                    inWidth = x > 224 && x < 281;
                    inHeight = y > 75 && y < 113;
                    if (inWidth && inHeight) {
                        this.nextStep();
                    }
                    break;
                case 2:
                    inWidth = x > 17 && x < 76;
                    inHeight = y > 312 && y < 353;
                    if (inWidth && inHeight) {
                        this.nextStep();
                    }
                    break;
                case 3:
                    inWidth = x > 21 && x < 75;
                    inHeight = y > 524 && y < 558;
                    if (inWidth && inHeight) {
                        this.nextStep();
                    }
                    break;
                case 4:
                    inWidth = x > 149 && x < 205;
                    inHeight = y > 655 && y < 691;
                    if (inWidth && inHeight) {
                        this.nextStep();
                    }
                    break;
                case 5:
                    inWidth = x > 305 && x < 359;
                    inHeight = y > 633 && y < 670;
                    if (inWidth && inHeight) {
                        this.nextStep();
                    }
                    break;
            }

        } else {
            x = x * this.rateVS6W();
            y = y * this.rateVS6H();
            switch (this.state.current_step) {
                case 0:
                    inWidth = x > (Platform.OS == 'ios'? 76: 0) && x < (Platform.OS == 'ios'? 125:width);   
                    inHeight = y > (Platform.OS == 'ios'? 62:0) && y < (Platform.OS == 'ios'? 89:height);
                    if (inWidth && inHeight) {
                        this.nextStep();
                    }
                    break;
                case 1:
                    inWidth = x > (Platform.OS == 'ios'? 246:0) && x < (Platform.OS == 'ios'? 295:width);
                    inHeight = y > (Platform.OS == 'ios'? 64:0) && y < (Platform.OS == 'ios'? 89:height);
                    if (inWidth && inHeight) {
                        this.nextStep();
                    }
                    break;
                case 2:
                    inWidth = x > (Platform.OS == 'ios'? 25:0) && x < (Platform.OS == 'ios'? 86:width);
                    inHeight = y > (Platform.OS == 'ios'? 271:0) && y < (Platform.OS == 'ios'? 299:height);
                    if (inWidth && inHeight) {
                        this.nextStep();
                    }
                    break;
                case 3:
                    inWidth = x > (Platform.OS == 'ios'? 25:0) && x < (Platform.OS == 'ios'? 86:width);
                    inHeight = y > (Platform.OS == 'ios'? 451:0) && y < (Platform.OS == 'ios'? 478:height);
                    if (inWidth && inHeight) {
                        this.nextStep();
                    }
                    break;
                case 4:
                    inWidth = x > (Platform.OS == 'ios'? 148:0) && x < (Platform.OS == 'ios'? 201:width);
                    inHeight = y > (Platform.OS == 'ios'? 548:0) && y < (Platform.OS == 'ios'? 576:height);
                    if (inWidth && inHeight) {
                        this.nextStep();
                    }
                    break;
                case 5:
                    inWidth = x > (Platform.OS == 'ios'? 303:0) && x < (Platform.OS == 'ios'? 352:width);
                    inHeight = y > (Platform.OS == 'ios'? 530:0) && y < (Platform.OS == 'ios'? 555:height);
                    if (inWidth && inHeight) {
                        this.nextStep();
                    }
                    break;
            }
        }
    }
    rateVSXW() {
        const widthX = 375;
        return width / widthX;
    }
    rateVSXH() {
        const heightX = 812;
        return height / heightX;
    }
    rateVS6W() {
        const width6 = 375;
        return width / width6;
    }
    rateVS6H() {
        const height6 = 667;
        return height / height6;
    }
    handlePress(evt) {
        let x = evt.nativeEvent.locationX;
        let y = evt.nativeEvent.locationY;
        console.log(x, y);
        this.checkIfSkip(evt);
        this.checkIfGetStarted(evt);
    }
    render() {
        return (
            <Container style={styles.container}>
                <TouchableOpacity onPress={(evt) => this.handlePress(evt)} activeOpacity={1}>
                    <View style={[styles.child]}>
                        <Image style={styles.tutorialImg} source={this.getImageForStep()} />
                    </View>
                </TouchableOpacity>
            </Container>
        );
    }
}
function mapStateToProps(state) {
    return { categories: state.categories }
}
export default connect(mapStateToProps, null)(tutorial);