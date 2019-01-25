import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Header, Left, Right, 
  Body
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { 
    Animated, Keyboard, AsyncStorage, TextInput, TouchableOpacity, ScrollView, Image, FlatList
} from 'react-native';
import styles from './styles';
import { BallIndicator } from 'react-native-indicators'
import images from '../../../themes/images'
import Switch from 'react-native-switch-pro'
import {createGroup, getGroups} from '../../../actions'
var categories = [
    {name: 'Sport', icon: images.ic_sport, id: 69},
    {name: 'Travel', icon: images.ic_travel, id: 17},
    {name: 'Music', icon: images.ic_music, id: 20},
    {name: 'Sport', icon: images.ic_sport, id: 69},
]
class categoryList extends Component{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props){
        super(props);
        this.state = {
            group_name: '',
            memberaddable: false,
            banner_img: null,
            venues: null
        }
    }
    
    componentWillMount() {
        let venes = this.props.navigation.state.params.venues
        let sorted_venues = venes.sort(function(a, b){
            return a.name > b.name
        }) 
        this.setState({
            venues: this.props.navigation.state.params.venues,
            banner_img: this.props.navigation.state.params.banner_img,
        })
    }
    onChangeMember(value){
    }

    onHome() {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'tabbarView', params: {index: 0}}));
    }

    onFavorite() {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'tabbarView', params: {index: 1}}));
    }

    onAccount() {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'tabbarView', params: {index: 2}}));
    }

    onLocation() {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'tabbarView', params: {index: 3}}));
    }
    onClickedProfile(){
        // var { dispatch } = this.props;

        // dispatch(NavigationActions.navigate({routeName: 'userProfile', onNavigateBack: this.handleOnNavigateBack}));

        this.props.navigation.navigate('userProfile')
    }
    _keyExtractor = (item, index) => item.id;

    _onPressItem = (item) => {
        
        var { dispatch } = this.props;
        dispatch({type:'changeVenuesOfLocation', data: [item]})
        dispatch(NavigationActions.navigate({routeName: 'location', params: {isModal: true}}));
    };

    _renderItem = ({item}) => (
        <TouchableOpacity onPress={() => {
            this._onPressItem(item)}
            }>
            <View style = {styles.listItem}>
                <Text style = {styles.listItemText} >
                   {item.name}
                </Text>
                <Thumbnail square source = {images.ic_left} style = {styles.ic_left}/>
            </View>
        </TouchableOpacity>
        
    );
    _renderSeparator = (highlighted) => (

        <View style={[styles.separator, highlighted && {marginLeft: 0}]} />
       )
        
        
    render(){
        return (
            <View style={styles.container}>
                <Thumbnail square source = {images.ic_home_backgroundImage} style = {styles.signInBackgroundImg}/>
                <Header style = {styles.header}>
                    <Left>
                        <Button transparent onPress = {() => this.props.navigation.goBack()}>
                            <Thumbnail square source = {images.ic_backBtn} style = {styles.menuImg}/>
                        </Button>
                    </Left>
                    <Right>
                        <Button transparent onPress = {() => this.onClickedProfile()}>
                            <Thumbnail square source = {{uri: this.props.user.photo}} style = {styles.avatarImg}/>
                        </Button>
                    </Right>
                </Header>
                <View style = {styles.mainContainer} showsVerticalScrollIndicator={false}>
                    <Image
                        style={styles.bannerImg}
                        source={this.state.banner_img}
                        />
                    <FlatList
                        style={styles.flatList}
                        data={this.state.venues}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        ItemSeparatorComponent={this._renderSeparator}
                        ListFooterComponent={<View style={{ height: 0, marginBottom: 20 }}></View>}
                    />
                </View>

                <View style = {styles.tabView}>
                    <TouchableOpacity  onPress = {() => this.onHome()}>
                        <View style = {styles.tabBtn}>
                            <Thumbnail square source = {images.tab_home} style = {[styles.tabIcon, {tintColor: this.state.isHome? '#33e098': null}]}/>
                            <Thumbnail square source = {images.tab_backgroundImage} style = {this.state.isHome? styles.tabBackgroundImg: styles.tabBackgroundImg1}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.onFavorite()}>
                        <View style = {styles.tabBtn}>
                            <Thumbnail square source = {images.tab_favorite} style = {[styles.tabIcon, {tintColor: this.state.isFavorite? '#33e098': null}]}/>
                            <Thumbnail square source = {images.tab_backgroundImage} style = {this.state.isFavorite? styles.tabBackgroundImg: styles.tabBackgroundImg1}/>
                        </View>
                        
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.onAccount()}>
                        <View style = {styles.tabBtn}>
                            <Thumbnail square source = {images.tab_account} style = {[styles.tabIcon, {tintColor: this.state.isAccount? '#33e098': null}]}/>
                            <Thumbnail square source = {images.tab_backgroundImage} style = {this.state.isAccount? styles.tabBackgroundImg: styles.tabBackgroundImg1}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.onLocation()}>
                        <View style = {styles.tabBtn}>
                            <Thumbnail square source = {images.tab_location} style = {[styles.tabIcon, {tintColor: this.state.isLocation? '#33e098': null}]}/>
                            <Thumbnail square source = {images.tab_backgroundImage} style = {this.state.isLocation? styles.tabBackgroundImg: styles.tabBackgroundImg1}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }
}
function mapStatusToProps(state) {
    return {
        user: state.user.userInfo
    }
}
export default connect(mapStatusToProps)(categoryList);