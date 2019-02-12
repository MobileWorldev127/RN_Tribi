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
import MapView,  { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import RecommendModal from '../../../components/recommendModal'
import RecommendGroup from '../../../components/recommendGroup'
import Toast, {DURATION} from 'react-native-easy-toast'
const { width, height } = Dimensions.get('window');
function debounce(a,b,c){var d,e;return function(){function h(){d=null,c||(e=a.apply(f,g))}var f=this,g=arguments;return clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e}}

import { getVenueDetails,recommendVenue, getGroups } from '../../../actions'

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

class location extends Component{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props){
        super(props);
        this.state = {
            isMapReady: false,
            modalVisible: false,
            groupmodalVisible: false,
            searchWord: '',
            selected_venue: {},
            isLoading: false,
            originalMarkers: [],
            markers: []
        }
    }

    componentWillMount() {
        if(this.props.navigation.state.params.isModal){
            this.setState({ isLoading: true })
            getVenueDetails(this.props.venues[0].id).then((res)=>{
                if (res.success) {
                    this.setState({ isLoading: false })
                    this.setState({
                        modalVisible: true,
                        selected_venue : res.data
                    })   
                } else {
                    this.setState({ isLoading: false })
                    this.refs.errortoast.show(res.error.message, DURATION.LENGTH_LONG)
                }  
            }) 
        }

        var venesList = []
        this.props.venues.map((item) =>{
            let region = {
                latitude: item.latlng.latitude,
                longitude: item.latlng.longitude,
                latitudeDelta: LONGITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
            venesList.push({
                id: item.id,
                name: item.name,
                region: region})
        })

        this.setState({
            originalMarkers: venesList,
            markers: venesList
        })
    }
    componentDidMount() {
        // if (this.state.markers.length>0) {
        //     let zoomto = {
        //         latitude:this.state.markers[0].region.latitude,
        //         longitude: this.state.markers[0].region.longitude,
        //         latitudeDelta: LONGITUDE_DELTA,
        //         longitudeDelta: LONGITUDE_DELTA,
        //     }
        //     this._map.animateToRegion(zoomto, 100);
        // }
    }
    onSearch = debounce(searchTerm => {
        let originalMarkers = this.state.originalMarkers
        let filteredMarkers = originalMarkers.filter((marker) => {
            let name_str = marker.name
            return name_str.toLowerCase().indexOf(searchTerm.toLowerCase()) >=0 
        })
        this.setState({
            markers: filteredMarkers
        })
    }, 300)

    onClickMarker(id){
        getVenueDetails(id).then((res)=>{
            if (res.success) {
                this.setState({ isLoading: false })
                this.setState({
                    modalVisible: true,
                    selected_venue : res.data
                })
            } else {
                this.setState({ isLoading: false })
                this.refs.errortoast.show(res.error.message, DURATION.LENGTH_LONG)
            }     
        })   
    }

    onClickedRecommend(params) {
        let recommendParams = {
            venue_id: this.state.selected_venue.id,
            latlng: this.state.selected_venue.latlng,
            venue_name: this.state.selected_venue.name,
            attend_date: params.date,
            group_id: params.group.group._id,
            user_id: this.props.user._id,
            username: this.props.user.username,
            phone: this.props.user.phone
        }
        recommendVenue(recommendParams).then((res) => {
            if (res.success) {
                getGroups(this.props.user.phone).then((data) => {
                    let {dispatch} = this.props
                    dispatch ({ type: 'saveGroups', data: data.data.groups });
                    this.setState({
                        groupmodalVisible: false
                    })
                    this.refs.toast.show('Recommendation Successful!', DURATION.LENGTH_LONG)
                })
            } else {
                this.refs.errortoast.show(res.error.message, DURATION.LENGTH_LONG)
            }
        })
    }

    onClickedBack(){
        Keyboard.dismiss()
        var { dispatch } = this.props; 
        dispatch(NavigationActions.back())
    }

    onMapLayout = () => {
        this.setState({ isMapReady: true });
    }

    render(){
        return(
            <Container style ={styles.container}>
                <MapView
                    ref={component => {this._map = component;}}
                    style={ styles.map }
                    region={this.state.markers.length > 0 ? this.state.markers[0].region : null}
                    onLayout={this.onMapLayout}
                >
                    {this.state.isMapReady && this.state.markers.map((marker, index) => (
                        <Marker
                            key = {index}
                            onPress={() => this.onClickMarker(marker.id) }
                            coordinate={{latitude: marker.region.latitude, longitude: marker.region.longitude}}
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
                {
                    !this.props.navigation.state.params.isModal && false &&
                    <View style = {styles.searchView}>
                        <Thumbnail square source = {images.ic_searchbox_backgroundImage} style = {styles.searchBackgroundImg}/>
                        <Thumbnail square source = {images.ic_search} style = {styles.searchImg}/>
                        <TextInput
                            ref = 'searchWord'
                            style = {styles.inputTxt}
                            onChangeText = { text => this.onSearch(text)}
                            value = {this.state.searchWord}
                            placeholder = "Start typing"
                            placeholderTextColor = "#4a6187"
                            autoCapitalize = 'none'
                            autoCorrect = {false}
                            underlineColorAndroid = "transparent"
                        />
                    </View>
                }

                {
                    this.state.isLoading? <BallIndicator color = {'#2B3643'}  style = {styles.loadingBar}/> : null
                }
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
                <Toast
                    ref = 'errortoast'
                    style = {{backgroundColor: '#f98192'}}
                    position = 'top'
                    positionValue = {height/2}
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
                        
                    }}>

                    <RecommendModal venue = {this.state.selected_venue} 
                        onClickedBack = {() => this.setState({ modalVisible: false })} 
                        onRecommend = {() => this.setState({ modalVisible: false, groupmodalVisible: true })}/>
                </Modal>

                <Modal
                    animationType = 'slide'
                    transparent = {false}
                    visible = {this.state.groupmodalVisible}
                    transparent = {true}
                    onRequestClose = {() => {
                        
                    }}>

                    <RecommendGroup onClickedBack = {() => this.setState({ groupmodalVisible: false })} 
                        onClickedRecommend = {(params) => this.onClickedRecommend(params)}/>
                </Modal>

            </Container>
        )
    }
}
function mapStateToProps(state) {
    return { venues: state.appdata.venuesOfLocation,
             user: state.user.userInfo }
}
export default connect(mapStateToProps)(location);