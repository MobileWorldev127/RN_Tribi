import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Header, Left, Right, Body
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { 
    Animated, Keyboard, AsyncStorage, TextInput, TouchableOpacity, StatusBar, PermissionsAndroid, Platform
} from 'react-native';
import styles from './styles';
import { BallIndicator } from 'react-native-indicators'
import images from '../../../themes/images'
import friendProfile from '../friendProfile/index';


// var Contacts = require('react-native-contacts')
import Contacts from 'react-native-contacts';

function debounce(a,b,c){var d,e;return function(){function h(){d=null,c||(e=a.apply(f,g))}var f=this,g=arguments;return clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e}}
class accounts extends Component{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props){
        super(props);
        this.state = {
            searchWord: '',
            originalContact: [],
            isLoading: false,
			contacts: []
        }
    }
    
    componentWillMount() {
        Platform.OS == 'ios' ? this.getiOSContacts() : this.getAndroidContacts()
    }

    getiOSContacts() {
        Contacts.getAll((err, contacts) => {
            if (err) {
                throw err;
            }
            contacts.sort(function(a, b) { 
                let aname = a.givenName + ' ' + a.familyName
                let bname = b.givenName + ' ' + b.familyName
                if (aname < bname) {
                    return -1;
                }
                if (aname > bname) {
                    return 1;
                }
                return 0;
                })
            console.log(contacts)
            this.setState({
                originalContact: contacts,
                contacts: contacts
            })
        })
    }

    getAndroidContacts(){
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                'title': 'Contacts',
                'message': 'This app would like to view your contacts.'
            }
            ).then(() => {
                Contacts.getAll((err, contacts) => {
                if (err) {
                    throw err;
                }
                contacts.sort(function(a, b) { 
                let aname = a.givenName + ' ' + a.familyName
                let bname = b.givenName + ' ' + b.familyName
                if (aname < bname) {
                    return -1;
                    }
                    if (aname > bname) {
                    return 1;
                    }
                    return 0;
                })
                console.log(contacts)
                this.setState({
                    originalContact: contacts,
                    contacts: contacts
                })
            })
        })
    }

    onClickedFriendProfile(item){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'friendProfile', params: {item}}));
    }

    renderRow(item, index){
		let name_str = item.givenName + ' ' + item.familyName
		let city_str = 'Unknown'
		if (item.postalAddresses.length > 0) {
			city_str =  item.postalAddresses[0].city
		}
		let image_str = images.ic_photo_default
		if (item.hasThumbnail) {
			image_str = item.thumbnailPath
		}
        return(
            <TouchableOpacity onPress = {() => this.onClickedFriendProfile(item)} key = {index}>
                <View style = {styles.rowView} >
			        {item.hasThumbnail?
                        <Thumbnail square source = {{uri:image_str}} style = {styles.userImg}/>:
                        <Thumbnail square source = {image_str} style = {styles.userImg}/>}
                    <View>
                        <Label style = {styles.nametxt}>{name_str}</Label>
                        <Label style = {styles.citytxt}>{city_str}</Label>
                    </View>
                    <View style = {styles.underLine}/>
                </View>
            </TouchableOpacity>
        )
    }

    onClickedProfile(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'userProfile'}));
    }
    onSearch = debounce(searchTerm => {
        let originalContacts = this.state.originalContact
        let filteredContacts = originalContacts.filter((contact) => {
            let name_str = contact.givenName + ' ' + contact.familyName
            return name_str.toLowerCase().indexOf(searchTerm.toLowerCase()) >=0 
        })
        this.setState({
            contacts: filteredContacts
        })
    }, 300)

    render(){
        return (
            <View style={styles.container}>
                 <StatusBar barStyle="light-content" />
                <Thumbnail square source = {images.ic_home_backgroundImage} style = {styles.signInBackgroundImg}/>
                <Header style = {styles.header}>
                    <Left>
                        <Button transparent onPress={ () => { this.props.navigation.navigate('DrawerOpen') }}>
                            <Thumbnail square source = {images.ic_men} style = {styles.menuImg}/>
                        </Button>
                    </Left>
                    <Body>
                        <Label style = {styles.screentitle}>SEARCH</Label>
                    </Body>
                    <Right>
                        <Button transparent onPress = {() => this.onClickedProfile()}>
                            <Thumbnail square source = {{uri: this.props.user.photo}} style = {styles.avatarImg}/>
                        </Button>
                    </Right>
                </Header>
                <Content style = {styles.mainContainer} showsVerticalScrollIndicator = {false}>
                    <View style = {styles.searchView}>
                        <Thumbnail square source = {images.ic_searchbox_backgroundImage} style = {styles.searchBackgroundImg}/>
                        <Thumbnail square source = {images.ic_search} style = {styles.searchImg}/>
                        <TextInput
                            ref = 'username'
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
                    <View style = {styles.listView}>
                        {
                            this.state.contacts.map((item, index) => {
                                return(this.renderRow(item, index))
                            })
                        }
                    </View>
                </Content>
            </View>
        );
    }
}

function mapStateToProp(state) {
    return {
        user: state.user.userInfo
    }
}
export default connect(mapStateToProp)(accounts);