import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, AsyncStorage, Platform, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input
} from 'native-base';
import images from '../../../themes/images'
import styles from './styles';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

class welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showStart: false,
            showView: false,
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

    onLogin() {
        AsyncStorage.setItem('step', "viewed");
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({ routeName: 'login' }));
    }
    
    getIndex(index) {
        this.setState({ current_step: index })
    }
    render() {
        return (
            <Container style={styles.container}>
                <Thumbnail
                    square
                    source={images.welcome_backgroundImg}
                    style={styles.backgroundImg}
                />
                
                <Swiper
                    showsButtons={false}
                    loop = {false}
                    activeDot = { <View style={styles.activeDot} /> }
                    dot = { <View style={styles.dot} /> }
                    paginationStyle = {{marginBottom: 0}}
                    onIndexChanged = {(index) => this.getIndex(index)}
                >
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
                    
                </Swiper>
                
                <TouchableOpacity style = {styles.skipBtn} onPress={() => this.onLogin()}>
                    <Text style = {[styles.skipTxt, {opacity: this.state.current_step == 3? 0: 100}]}>SKIP</Text>
                </TouchableOpacity>
                {
                    this.state.current_step == 3?(
                        <Button transparent style = {styles.startBtn} onPress = {() => this.onLogin()}>
                            <Text style = {styles.startTxt}> START </Text>
                        </Button>
                    ) : null
                }
            </Container>
        );
    }
}
function mapStateToProps(state) {
    return { categories: state.categories }
}
export default connect(mapStateToProps, null)(welcome);