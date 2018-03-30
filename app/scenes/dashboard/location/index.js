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
import { BallIndicator } from 'react-native-indicators'
import images from '../../../themes/images'
import MapView,  { Marker } from 'react-native-maps';
import RecommendModal from '../../../components/recommendModal'

class location extends Component<{}>{
    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
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

    onClickMarker(marker){
        this.setState({
            modalVisible: true,
            selected_marker: marker
        })        
    }

    render(){
        const { region } = this.props;
        console.log(region);
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
                    {this.state.markers.map(marker => (
                        <Marker
                            onPress={() => this.onClickMarker(marker) }
                            coordinate={marker.latlng}
                            image={images.ic_location_pin}
                        />
                    ))}
                </MapView>
                <Header style = {styles.header}>
                    <Left>
                        <Button transparent onPress = {() => {var { dispatch } = this.props; dispatch(NavigationActions.back()) }}>
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

                <Modal
                    animationType = 'fade'
                    transparent = {false}
                    visible = {this.state.modalVisible}
                    transparent = {true}
                    onRequestClose = {() => {
                        alert('Modal has been closed')
                    }}>

                    <RecommendModal/>

                </Modal>
            </View>
        )
    }
}

export default connect()(location);