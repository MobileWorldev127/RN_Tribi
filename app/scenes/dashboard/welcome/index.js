import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, AsyncStorage, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input
} from 'native-base';
import images from '../../../themes/images'
import styles from './styles';
import SwiperFlatList from 'react-native-swiper-flatlist';
const { width, height } = Dimensions.get('window');
// import Pagination from './Pagination';

class welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showStart: false,
            showView: false,
            stepImagesForIphonX: [
                images.step1x,
                images.step2x,
                images.step3x,
                images.step4x,
            ],
            stepImagesForIphon6: [
                images.step1,
                images.step2,
                images.step3,
                images.step4,
            ],
            current_step: 0
        }
    }

    componentWillMount() {
        var { dispatch } = this.props;
        AsyncStorage.getItem('step').then((res)=>{
            this.setState({
                showView: true
            })
            if (res == "viewed") {
                var { dispatch } = this.props;
                dispatch(NavigationActions.navigate({routeName: 'login'}));
            }
        })
    }
    getImageForStep = (step) => {
        if (this.isIphoneX()) {
            return this.state.stepImagesForIphonX[step];
        } else {
            return this.state.stepImagesForIphon6[step];
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
        AsyncStorage.setItem('step', "viewed");
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({ routeName: 'login' }));
    }
    checkIfSkip(evt) {
        let x = evt.nativeEvent.locationX;
        let y = evt.nativeEvent.locationY;
        if (this.current_step==3) return
        if (this.isIphoneX()) {

            x = x * this.rateVSXW();
            y = y * this.rateVSXH();
            const inWidth = x>308 && x<354;
            const inHeight = y>50 && y<70;
            if (inWidth && inHeight) {
                this.onLogin();
            }
        } else {
            x = x * this.rateVS6W();
            y = y * this.rateVS6H();
            const inWidth = x>315 && x<360;
            const inHeight = y>30 && y<51;
            if (inWidth && inHeight) {
                this.onLogin();
            }
        }
    }
    checkIfGetStarted(evt) {
        let x = evt.nativeEvent.locationX;
        let y = evt.nativeEvent.locationY;
        if (this.current_step!=3) return

        if (this.isIphoneX()) {

            x = x * this.rateVSXW();
            y = y * this.rateVSXH();
            const inWidth = x>71 && x<305;
            const inHeight = y>683 && y<741;
            if (inWidth && inHeight) {
                this.onLogin();
            }
        } else {
            x = x * this.rateVS6W();
            y = y * this.rateVS6H();
            const inWidth = x>64 && x<310;
            const inHeight = y>578 && y<630;
            if (inWidth && inHeight) {
                this.onLogin();
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
        return width/width6;
    }
    rateVS6H() {
        const height6 = 667;
        return height/height6;
    }
    handlePress(evt) {
        let x = evt.nativeEvent.locationX;
        let y = evt.nativeEvent.locationY;
        console.log(x,y);
        this.checkIfGetStarted(evt);
        this.checkIfSkip(evt);
    }
    render() {
        return (
            <Container style={styles.container}>
                {/* <Content> */}
                <Thumbnail
                    square
                    source={images.signUp_backgroundImage}
                    style={styles.backgroundImg}
                />
                        <SwiperFlatList
                            onMomentumScrollEnd = {(evt)=>{this.current_step = evt.index}}
                            showPagination
                            // PaginationComponent={Pagination}
                            paginationDefaultColor = "#4a6187"
                            paginationActiveColor = "#33e098"
                            // paginationStyle = {{paddingBottom: 100, backgroundColor: 'yellow'}}
                        >

                            {/* <TouchableOpacity onPress={(evt) => this.handlePress(evt)} activeOpacity={1}>
                                <View style={[styles.child]}>
                                    <Image style={styles.tutorialImg} source={this.getImageForStep(0)} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={(evt) => this.handlePress(evt)} activeOpacity={1}>
                                <View style={[styles.child]}>
                                    <Image style={styles.tutorialImg} source={this.getImageForStep(1)} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={(evt) => this.handlePress(evt)} activeOpacity={1}>
                                <View style={[styles.child]}>
                                    <Image style={styles.tutorialImg} source={this.getImageForStep(2)} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={(evt) => this.handlePress(evt)} activeOpacity={1}>
                                <View style={[styles.child]}>
                                    <Image style={styles.tutorialImg} source={this.getImageForStep(3)} />
                                </View>
                            </TouchableOpacity> */}
                            <View style={styles.child}>
                                <Image style={styles.welcomeImg} source={images.welcomeStep1} />
                            </View>
                            <View style={styles.child}>
                                <Image style={styles.welcomeImg} source={images.welcomeStep2} />
                            </View>
                            <View style={styles.child}>
                                <Image style={styles.welcomeImg} source={images.welcomeStep3} />
                            </View>
                            <View style={styles.child}>
                                <Image style={styles.welcomeImg} source={images.welcomeStep4} />
                            </View>
                        </SwiperFlatList>
                {/* </Content> */}
            </Container>
        );
    }
}
function mapStateToProps(state) {
    return { categories: state.categories }
}
export default connect(mapStateToProps, null)(welcome);