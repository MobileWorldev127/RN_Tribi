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
import CommendFeedModal from '../../../components/commendFeedModal/index';
import VoteModal from '../../../components/voteModal/index';


var voteList = [
    {title: 'Wendy`s', date: '11/01/2018', time: '6:30 pm', like_count: 6, down_count: 9},
    {title: 'Beerpoint', date: '11/04/2018', time: '7:00 pm', like_count: 0, down_count: 8},
]



class voteGroup extends Component<{}>{
    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
        this.state = {
            isFeedModal: false,
            isVoteModeal: false
        }
    }
    
    componentWillMount() {
        
    }

    onMakeRecomendation(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'location'}));
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

    onFingerUp(item) {
        this.setState({ 
            isFeedModal: true,
            isVoteModeal: false
        })
    }
    
    onFingerDown(item){
        this.setState({ 
            isFeedModal: true,
            isVoteModeal: false
        })
    }

    onVote(item) {
        this.setState({ 
            isVoteModeal: true,
            isFeedModal: false,
        })
    }

    renderRow(item, index){
        return(
            <View style = {styles.rowView} key = {index}>
                <View>
                    <View style = {styles.detailView}>
                        <View style = {styles.rowtitleView}>
                            <Label style = {styles.rowtitletxt}>{item.title}</Label>
                            <Thumbnail square source = {images.tab_location} style = {styles.locationImg}/>
                        </View>
                        <Label style = {styles.rowdatetxt}>{item.date}  •  {item.time}</Label>
                    </View>
                    <View style = {styles.fingerView}>
                        <Thumbnail square source = {images.ic_avatar1} style = {styles.userImg}/>
                        <TouchableOpacity onPress = {() => this.onFingerUp(item)}>
                            <View style = {styles.fingerUpView}>
                                <Thumbnail square source = {images.ic_finger_up} style = {styles.fingerImg}/>
                                <Label style = {styles.likeTxt}>{item.like_count}</Label>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.onFingerDown(item)}>
                            <View style = {styles.fingerDownView}>
                                <Thumbnail square source = {images.ic_finger_down} style = {styles.fingerImg}/>
                                <Label style = {styles.likeTxt}>{item.down_count}</Label>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <TouchableOpacity onPress = {() => this.onVote(item)}>
                    <View style = {styles.voteView}>
                        <Label style = {styles.votetxt}>VOTE</Label>
                    </View>
                </TouchableOpacity>
                
            </View>
        )
    }

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
                    <Body>
                        <Label style = {styles.screentitle}>GROUP</Label>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Thumbnail square source = {images.ic_avatar} style = {styles.avatarImg}/>
                        </Button>
                    </Right>
                </Header>
                <View style = {styles.mainContainer}>
                    <View style = {styles.groupView}>
                        <Label style = {styles.groupTitle}>DESIGN COMMUNITY</Label>
                        <Label style = {styles.countmemberTxt}>12 members</Label>
                        <Thumbnail square source = {images.ic_groupimage} style = {styles.groupImg}/>
                    </View>
                    {
                        voteList.map((item, index) => {
                            return(this.renderRow(item, index))
                        })
                    }
                    
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

                <Modal
                    animationType = 'slide'
                    transparent = {false}
                    visible = {this.state.isFeedModal}
                    transparent = {true}
                    onRequestClose = {() => {
                        alert('Modal has been closed')
                    }}>
                        <CommendFeedModal onClickedBack = {() => this.setState({ isFeedModal: false, isVoteModeal: false })}/>
                </Modal>

                <Modal
                    animationType = 'slide'
                    transparent = {false}
                    visible = {this.state.isVoteModeal}
                    transparent = {true}
                    onRequestClose = {() => {
                        alert('Modal has been closed')
                    }}>
                        <VoteModal onClickedBack = {() => this.setState({ isFeedModal: false, isVoteModeal: false, })}/>
                </Modal>

            </View>
        );

    }
}

export default connect()(voteGroup);