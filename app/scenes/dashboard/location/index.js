import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Header, Left, Right, 
  Body
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { 
    Animated, Keyboard, AsyncStorage, TextInput, TouchableOpacity, ScrollView, Modal, Dimensions,
} from 'react-native';
import styles from './styles';
import { BallIndicator } from 'react-native-indicators'
import images from '../../../themes/images'
import MapView,  { Marker } from 'react-native-maps';
import RecommendModal from '../../../components/recommendModal'
import RecommendGroup from '../../../components/recommendGroup'
import Toast, {DURATION} from 'react-native-easy-toast'
const { width, height } = Dimensions.get('window');

class location extends Component<{}>{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            groupmodalVisible: false,
            searchWord: '',
            selected_marker: [],
            markers: [
                {
                    title: 'VR ARCADE1', 
                    category: 'Games',
                    description: 'Curabitur ullamcorper ultricies nisi. Nam eget dui. rhoncus. Maecenas tempus, tellus condimentum rhoncus, sem quam semper libero.',
                    latlng: {
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                },
                {
                    title: 'VR MUSIC', 
                    category: 'Video',
                    description: 'Curabitur ullamcorper ultricies nisi. Nam eget dui. rhoncus. Maecenas tempus, tellus condimentum rhoncus, sem quam semper libero.',
                    latlng: {
                        latitude: 37.78855,
                        longitude: -122.4454,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                },
                {
                    title: 'VR SPORT', 
                    category: 'Sport',
                    description: 'Curabitur ullamcorper ultricies nisi. Nam eget dui. rhoncus. Maecenas tempus, tellus condimentum rhoncus, sem quam semper libero.',
                    latlng: {
                        latitude: 37.77825,
                        longitude: -122.4224,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                },
            ]
        }
    }

    componentWillMount() {
        if(this.props.navigation.state.params.isModal){
            this.setState({
                modalVisible: true
            })  
        }
    }

    
    onClickMarker(marker){
        this.setState({
            modalVisible: true,
            selected_marker: marker
        })        
    }

    onClickedRecommend() {
        this.setState({
            groupmodalVisible: false
        })
        this.refs.toast.show('Recommendation Successful!', DURATION.LENGTH_LONG)
    }

    onClickedBack(){
        Keyboard.dismiss()
        var { dispatch } = this.props; 
        dispatch(NavigationActions.back())
    }

    render(){
        return(
            <View style ={styles.container}>
                <MapView
                    style={ styles.map }
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {this.state.markers.map((marker, index) => (
                        <Marker
                            key = {index}
                            onPress={() => this.onClickMarker(marker) }
                            coordinate={marker.latlng}
                            image={images.ic_location_pin}
                        />
                    ))}
                </MapView>
                <Header style = {styles.header}>
                    <Left>
                        <Button transparent onPress = {() => this.onClickedBack()}>
                            <Thumbnail square source = {images.ic_backBtn} style = {styles.menuImg}/>
                        </Button>
                    </Left>
                    <Body>
                        <Label style = {styles.screentitle}></Label>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Thumbnail square source = {null} style = {styles.avatarImg}/>
                        </Button>
                    </Right>
                </Header>
                
                <View style = {styles.searchView}>
                    <Thumbnail square source = {images.ic_searchbox_backgroundImage} style = {styles.searchBackgroundImg}/>
                    <Thumbnail square source = {images.ic_search} style = {styles.searchImg}/>
                    <TextInput
                        ref = 'searchWord'
                        style = {styles.inputTxt}
                        onChangeText = { text => this.setState({ searchWord: text })}
                        value = {this.state.searchWord}
                        placeholder = "Start typing"
                        placeholderTextColor = "#4a6187"
                        autoCapitalize = 'none'
                        autoCorrect = {false}
                    />
                </View>

                <Toast
                    ref = 'toast'
                    style = {{backgroundColor: '#35e49c'}}
                    position = 'top'
                    positionValue = {height/5}
                    fadeInDuration = {750}
                    fadeOutDuration = {1000}
                    opacity = {0.8}
                    textStyle = {{color: 'white'}}
                />

                <Modal
                    animationType = 'fade'
                    transparent = {false}
                    visible = {this.state.modalVisible}
                    transparent = {true}
                    onRequestClose = {() => {
                        alert('Modal has been closed')
                    }}>

                    <RecommendModal onClickedBack = {() => this.setState({ modalVisible: false })} onRecommend = {() => this.setState({ modalVisible: false, groupmodalVisible: true })}/>
                </Modal>

                <Modal
                    animationType = 'slide'
                    transparent = {false}
                    visible = {this.state.groupmodalVisible}
                    transparent = {true}
                    onRequestClose = {() => {
                        alert('Modal has been closed')
                    }}>

                    <RecommendGroup onClickedBack = {() => this.setState({ groupmodalVisible: false })} onClickedRecommend = {() => this.onClickedRecommend()}/>
                </Modal>
            </View>
        )
    }
}

export default connect()(location);