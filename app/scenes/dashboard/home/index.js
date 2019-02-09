import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Header, Left, Right, 
  Body
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { 
    Alert, StatusBar, Keyboard, AsyncStorage, TextInput, TouchableOpacity, ScrollView, AppState, Platform
} from 'react-native';
import styles from './styles';
import { BallIndicator } from 'react-native-indicators'
import images from '../../../themes/images'
import {acceptGroupRequest,getAllCategories,getNearVenues, rejectGroupRequest, getGroups} from '../../../actions'

import BackgroundGeolocation from "react-native-background-geolocation";

import PushController from '../../../components/pushnotification/PushController';
import PushNotification from 'react-native-push-notification';
var popularList = [
    {name: 'ALMONDO AIRES'},
    {name: 'WALK WEST'},
    {name: 'ALMONDO AIRES'},
    {name: 'WALK WEST'},
];

var categories = [
    {name: 'Sport', icon: images.ic_sport, value: 69},
    {name: 'Travel', icon: images.ic_travel, value: 17},
    {name: 'Music', icon: images.ic_music, value: 20},
    {name: 'Sport', icon: images.ic_sport, value: 69},
]

var groupList = [
    {name: 'My Familiy', value: 10},
    {name: 'Workers', value: 20},
]
let categories_titles = ['Arts and Entertainment','College & University','Events','Food','Nightlife','Outdoors & Recreation','Shopping','Travel & Transport']
let categories_icons = [images.ic_cat_art, images.ic_cat_college, images.ic_cat_event, images.ic_cat_food, images.ic_cat_nightlife, images.ic_cat_outdoor, images.ic_cat_shopping, images.ic_cat_travel]
let categories_banners = [images.banner_art, images.banner_college, images.banner_event, images.banner_food, images.banner_nightlife, images.banner_outdoor, images.banner_shopping, images.banner_travel]
class home extends Component{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoading: false,
            categories: [
                {name: 'Sport', icon: images.ic_sport, value: 0},
                {name: 'Travel', icon: images.ic_travel, value: 0},
                {name: 'Music', icon: images.ic_music, value: 0},
            ],
            nearvenues: [],
        }
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    handleAppStateChange(appState) {
        if (appState === 'background') {
            let date = new Date(Date.now() + (3 * 1000));

            if (Platform.OS === 'ios') {
                // date = date.toISOString();
            }

            console.log(date)
            // PushNotification.localNotificationSchedule({
            //     message: "My Notification Message",
            //     date,
            // });
        }
    }
    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
        ////
        // 1.  Wire up event-listeners
        //
        // This handler fires whenever bgGeo receives a location update.
        BackgroundGeolocation.on('location', this.onLocation, this.onError);
    
        // This handler fires when movement states changes (stationary->moving; moving->stationary)
        BackgroundGeolocation.on('motionchange', this.onMotionChange);
    
        // This event fires when a change in motion activity is detected
        BackgroundGeolocation.on('activitychange', this.onActivityChange);
    
        // This event fires when the user toggles location-services authorization
        BackgroundGeolocation.on('providerchange', this.onProviderChange);
    
        ////
        // 2.  Execute #ready method (required)
        //
        BackgroundGeolocation.ready({
            reset: true,  // <-- true to always apply the supplied config
            distanceFilter: 50
          }, (state) => {
            console.log('- BackgroundGeolocation is ready: ', state);
          });
        //   PushNotification.localNotificationSchedule({
        //     message: "My Notification Message", // (required)
        //     date: new Date(Date.now() + (2 * 1000)) // in 60 secs
        //   });
      }
      // You must remove listeners when your component unmounts
      componentWillUnmount() {  
        AppState.removeEventListener('change', this.handleAppStateChange);  
        BackgroundGeolocation.removeListeners();
      }
      onLocation = (location) => {
        let lat = location.coords.latitude
        let lng = location.coords.longitude
        let {dispatch} = this.props
        Promise.all([getAllCategories(lat, lng), getNearVenues(lat, lng),getGroups(this.props.user.phone)]).then(([categories, nearvenues, groupdata])=>{
    
            console.log(lat,lng)
            dispatch ({ type: 'saveAllCategories', data: categories.data });
            dispatch ({ type: 'saveNearVenues', data: nearvenues.data });
            dispatch ({ type: 'saveGroups', data: groupdata.data.groups });
            // dispatch(NavigationActions.navigate({routeName: 'tabbarView', params: {index: 0}}));
        })
      }
      onError(error) {
         console.warn('- [event] location error ', error);
      }
      onActivityChange(activity) {
         console.log('- [event] activitychange: ', activity);  // eg: 'on_foot', 'still', 'in_vehicle'
      }
      onProviderChange(provider) {
         console.log('- [event] providerchange: ', provider);    
      }
      onMotionChange(location) {
         console.log('- [event] motionchange: ', location.isMoving, location);
      }
    componentWillMount() {
        let nearvenues = this.props.nearvenues
        let categories = this.props.categories
        let newcat_counts = categories.map((el, index) => {
            let element = {
                name: categories_titles[index],
                icon: categories_icons[index],
                value: el.length
            }
            return element
        })
        
        this.setState({
            categoriess: newcat_counts,
            nearvenues: nearvenues
        })
    }

    onCreateGroup(){
        // this.props.navigation.navigate('NewGroup')
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'newGroup'}));
    }

    onClickedProfile(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'userProfile'}));
    }

    onClickedGroup(group) {
        this.gotoGroupDetail(group)
    }

    gotoGroupDetail(group) {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'voteGroup', params: group}));
    }
    onGoLocationNearBy (item) {
        var { dispatch } = this.props;
        dispatch({type:'changeVenuesOfLocation', data: [item]})
        dispatch(NavigationActions.navigate({routeName: 'location', params: {isModal: true}}));
    }
    onGoLocationCategory (index) {
        var { dispatch } = this.props;
        let categories = this.props.categories
        if (!categories) return
        dispatch({type:'changeVenuesOfLocation', data: categories[index]})
        dispatch(NavigationActions.navigate({routeName: 'category_list', params: {banner_img:categories_banners[index],venues: categories[index]}}));
    }
    render(){
        return (
            <View style={styles.container}>
                <PushController />
                <Thumbnail square source = {images.ic_home_backgroundImage} style = {styles.signInBackgroundImg}/>
                <Header style = {styles.header}>
                    <Left>
                        <Button transparent onPress={ () => { this.props.navigation.navigate('DrawerOpen') }}>
                            <Thumbnail square source = {images.ic_men} style = {styles.menuImg}/>
                        </Button>
                    </Left>
                    <Right>
                        <Button transparent onPress = {() => this.onClickedProfile()}>
                            <Thumbnail square source = {{uri: this.props.user.photo}} style = {styles.avatarImg}/>
                        </Button>
                    </Right>
                </Header>
                <View style = {styles.mainContainer}>
                    <Label style = {styles.popularTxt}>POPULAR NEAR ME</Label>
                    <View style = {styles.subScrollView}>
                        <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false} style = {{paddingLeft: 25}}>
                            {
                                this.props.nearvenues.map((item, index) => {
                                    return(
                                        <TouchableOpacity onPress = {() => this.onGoLocationNearBy(item)} key = {index}>
                                            <View style = {styles.popularView} key = {index} >
                                                <Label style = {styles.popularItemTxt}>{item.name}</Label>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            <View style = {styles.blankView}/>
                        </ScrollView>
                    </View>
                    
                    <Label style = {styles.categoryTxt}>CATEGORIES</Label>
                    
                    <View style = {styles.subScrollView}>
                        <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false} style = {{paddingLeft: 25}}>
                            {
                                this.state.categoriess.map((item, index) => {
                                    return(
                                        <TouchableOpacity onPress = {() => this.onGoLocationCategory(index)} key = {index}>
                                            <View style = {styles.categoryView} key = {index}>
                                                <Label style = {styles.categoryItemTxt}>{item.name}</Label>
                                                <View style = {styles.subCategoryView}>
                                                    <Thumbnail square source = {item.icon} style = {styles.categoryIcon}/>
                                                    <Label style = {styles.categoryItemValue}>{item.value}</Label>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            <View style = {styles.blankView}/>
                        </ScrollView>
                    </View>

                    <Label style = {styles.categoryTxt}>MY GROUPS</Label>

                    <View style = {{marginTop: 20, height: 145}}>
                        <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false}>

                            <Button transparent style = {styles.addView} onPress = {() => this.onCreateGroup()}>
                                <Thumbnail square source = {images.ic_addGroupBtn} style = {styles.addImg}/>
                            </Button>
                            {
                                this.props.groups.map((item, index) => {
                                    return(
                                        <TouchableOpacity onPress = {() => this.onClickedGroup(item)} key = {index}>
                                            <View style = {styles.groupView} >
                                                <Label style = {styles.groupItemName}>{item.group.group_name}</Label>
                                                <Label style = {styles.groupItemValue}>{item.group.members.length}</Label>
                                                <View style = {styles.barView}/>
                                            </View>
                                        </TouchableOpacity>
                                        
                                    )
                                })
                            }
                        </ScrollView>
                    </View>

                    

                </View>
            </View>
        );

    }
}
function mapStateToProps(state) {
    return { categories: state.appdata.categories,
             nearvenues: state.appdata.nearvenues,
             user: state.user.userInfo,
             groups: state.user.groups  }
}
export default connect(mapStateToProps, null)(home);