import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NavigationActions } from 'react-navigation';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Header, Left, Right, 
  Body
} from 'native-base';
import { 
    Animated, Keyboard, AsyncStorage, TextInput, TouchableOpacity, ScrollView, Modal, Dimensions, Alert,
} from 'react-native';
import styles from './styles';
import { BallIndicator } from 'react-native-indicators'
import images from '../../../themes/images'
import CommendFeedModal from '../../../components/commendFeedModal/index';
import AddFriendModal from '../../../components/addFriendModal';
import ShowMemberModal from '../../../components/showMemberModal';
import Toast, {DURATION} from 'react-native-easy-toast'
import VoteModal from '../../../components/voteModal/index';

const { width, height } = Dimensions.get('window');
import {joinGroupRequest, commentCandidate, getGroups, leaveGroup} from '../../../actions'

var voteList = [
    {title: 'Wendy`s', date: '11/01/2018', time: '6:30 pm', like_count: 6, down_count: 9},
    {title: 'Beerpoint', date: '11/04/2018', time: '7:00 pm', like_count: 0, down_count: 8},
]
var memberIcons = [images.ic_avatar,images.ic_avatar,images.ic_avatar,images.ic_avatar,images.ic_avatar,images.ic_avatar,images.ic_avatar,images.ic_avatar,images.ic_avatar];
class voteGroup extends Component{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props){
        super(props);
        this.state = {
            isFeedModal: false,
            isVoteModal: false,
            isAddMemberModal: false,
            isShowMemberModal: false,
            group: null,
            selectedVenue: null,
            group_request_id: null
        }
    }
    
    componentWillMount() {
        let group_request_id = this.props.navigation.state.params._id
        let current_group = this.props.groups.filter((el) =>{
           return el._id == group_request_id
        })
        this.setState({
            group: current_group[0],
            group_request_id: group_request_id
        })
    }

    onMakeRecomendation(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'location', params: {isModal: true}}));
    }

    onHome() {
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'tabbarView', params: {index: 0}}));
    }
    handleOnNavigateBack = () => {
        let current_group = this.props.groups.filter((el) =>{
            return el._id == this.state.group_request_id
         })
         this.setState({
            group: current_group[0]
         })
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
    onShowThumbModal(item) {
        this.setState({ 
            selectedVenue: item,
            isFeedModal: true,
            isAddMemberModal: false,
            isVoteModal: false
        })
    }

    onVote(item) {
        if (this.checkCommentable(item)) {
            this.setState({ 
                selectedVenue: item,
                isVoteModal: true,
                isAddMemberModal: false,
                isFeedModal: false,
                isShowMemberModal: false
            })
        } else {
            this.refs.errortoast.show('You already commented!', DURATION.LENGTH_LONG)
        }
    }

    onAddMemberModal(item) {
        this.setState({
            isVoteModal: false,
            isAddMemberModal: true,
            isFeedModal: false,
            isShowMemberModal: false
        })
    }

    onAddMembers(members) {
        let groupJoinParams = {
            username: this.props.user.username,
            group_id: this.state.group.group._id,
            phone_numbers: members,
            phone: this.props.user.phone
        }
        joinGroupRequest(groupJoinParams).then((res) => {
            if (res.success) {
                this.setState({ 
                    isVoteModal: false,
                    isAddMemberModal: false,
                    isFeedModal: false,
                    isShowMemberModal: false,
                })
                this.refs.successtoast.show('Invited successfully!', DURATION.LENGTH_LONG)
            } else {
                this.refs.errortoast.show(res.error.message, DURATION.LENGTH_LONG)
            }
        })
    }
    onClickedProfile(){
        // var { dispatch } = this.props;

        // dispatch(NavigationActions.navigate({routeName: 'userProfile', onNavigateBack: this.handleOnNavigateBack}));

        this.props.navigation.navigate('userProfile', {
            onNavigateBack: this.handleOnNavigateBack.bind(this)
        })
    }

    onClickLocation(item){
        this.setState({ 
            isFeedModal: false, 
            isVoteModal: false, 
            isAddMemberModal: false,
            isShowMemberModal: false
        })
        var { dispatch } = this.props;
        let markInfo = {
            latlng: item.latlng,
            id: item.venue_id,
            name: item.venue_name
        }
        dispatch({type:'changeVenuesOfLocation', data: [markInfo]})
        dispatch(NavigationActions.navigate({routeName: 'location', params: {isModal: true}}));
    }

    onVoteClick = (params) => {
        commentCandidate(params).then((res)=> {
            if (res.success) {
                getGroups(this.props.user.phone).then((data) => {
                    
                    this.refs.successtoast.show('Comment Successful!', DURATION.LENGTH_LONG)
                    let {dispatch} = this.props
                    dispatch ({ type: 'saveGroups', data: data.data.groups });
                    let newGroupData = data.data.groups.filter((group)=>{
                        return group._id == this.state.group._id
                    })
                    this.setState({ 
                        isFeedModal: false, 
                        isVoteModal: false, 
                        isAddMemberModal: false,
                        isShowMemberModal: false,
                        group: newGroupData[0]
                    })
                })
            } else {
                this.refs.errortoast.show(res.error.message, DURATION.LENGTH_LONG)
            }
        })
    }
    checkCommentable(item) {
        let user_id = this.props.user._id
        for (let i = 0; i < item.thumbup.length; i ++ ) {
            if (item.thumbup[i].user_id == user_id) {
                return false;
            }
        }
        for (let i = 0; i < item.thumbdown.length; i ++ ) {
            if (item.thumbdown[i].user_id == user_id) {
                return false;
            }
        }
        return true
    }
    recommenderPhoto(recommender) {
        if (recommender) {
            return recommender.photo
        } else {
            return ''
        }
    }
    renderRow(item, index){
        return(
            <View style = {styles.rowView} key = {index}>
                <View>
                    <View style = {styles.detailView}>
                        <View style = {styles.rowtitleView}>
                            <Label style = {styles.rowtitletxt}>{item.venue_name}</Label>
                            <TouchableOpacity onPress = {() => this.onClickLocation(item)} style = {styles.locationImgTouchable}>
                                <Thumbnail square source = {images.tab_location} style = {styles.locationImg}/>
                            </TouchableOpacity>
                        </View>
                        <Label style = {styles.rowdatetxt}>{item.date}</Label>
                    </View>
                    <View style = {styles.fingerView}>
                        <Thumbnail square source = {{uri:this.recommenderPhoto(item.recommender)}} style = {styles.userImg}/>
                        <TouchableOpacity style = {styles.thumbViews} onPress = {() => this.onShowThumbModal(item)}>
                            <View style = {styles.fingerUpView}>
                                <Thumbnail square source = {images.ic_finger_up} style = {styles.fingerImg}/>
                                <Label style = {styles.likeTxt}>{item.thumbup.length}</Label>
                            </View>
                            <View style = {styles.fingerDownView}>
                                <Thumbnail square source = {images.ic_finger_down} style = {styles.fingerImg}/>
                                <Label style = {styles.likeTxt}>{item.thumbdown.length}</Label>
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

    isMemberAddable() {
        return (this.state.group.group.memberaddable || this.state.group.user_role == 'creator')
    }
    leaveGroupTouch = () =>{
        Alert.alert(
            'Leave Group',
            'Are you sure?',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => {    
                let params = {
                    username: this.props.user.username,
                    user_id: this.props.user._id,
                    phone: this.props.user.phone,
                    group_id: this.state.group.group._id,
                }
                leaveGroup(params).then((res)=>{
                    if(res.success) {
                        this.refs.successtoast.show('Successfully removed!', DURATION.LENGTH_LONG)
                        getGroups(this.props.user.phone).then((data) => {
                            let {dispatch} = this.props
                            dispatch ({ type: 'saveGroups', data: data.data.groups });
                            this.props.navigation.goBack()
                        })
                    } else {
                        this.refs.errortoast.show('Server error! Try again later', DURATION.LENGTH_LONG)
                    }
                })
              }},
            ],
            { cancelable: true }
          )
    }
    showMembers = () => {
        this.setState({
            isShowMemberModal: true
        })
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
                        <Button transparent onPress = {() => this.onClickedProfile()}>
                            <Thumbnail square source = {{uri: this.props.user.photo}} style = {styles.avatarImg}/>
                        </Button>
                    </Right>
                </Header>
                <View style = {styles.mainContainer}>
                    <View style = {styles.groupView}>
                    {
                        <TouchableOpacity style = {styles.leaveGroupTouch} onPress = {() => {this.leaveGroupTouch()}}>
                            <Thumbnail source = {images.ic_remove} style = {styles.addfriendImg}/>
                        </TouchableOpacity>
                    }
                    {
                        this.isMemberAddable() && <TouchableOpacity style = {styles.addfriendTouch} onPress = {() => {this.onAddMemberModal()}}>
                            <Thumbnail source = {images.ic_friend_add} style = {styles.addfriendImg}/>
                        </TouchableOpacity>
                    }
                        
                        <Label style = {styles.groupTitle}>{this.state.group.group.group_name}</Label>
                        <Label style = {styles.countmemberTxt}>{this.state.group.group.members.length} members</Label>

                        <TouchableOpacity  onPress = {() => this.showMembers()}>
                            <View style = {styles.groupIcon}>
                                {
                                    this.state.group.group.members.map((elem, index)=>{
                                        if (index > 2) return
                                        return <Thumbnail square source = {{uri:elem.photo}} style = {styles.memberIcon} key = {index}/>
                                    })
                                }
                                {/* {
                                    memberIcons.map((elem, index)=>{
                                        if (index > 9) return
                                        return <Thumbnail square source = {elem} style = {styles.memberIcon}/>
                                    })
                                } */}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ScrollView vertical = {true} showsHorizontalScrollIndicator = {false} showsVerticalScrollIndicator = {false}>
                    {
                        this.state.group.group.venue_candidates.map((item, index) => {
                            return(this.renderRow(item, index))
                        })
                    }
                    </ScrollView>
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
                <Toast
                    ref = 'successtoast'
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
                    positionValue = {height/5}
                    fadeInDuration = {750}
                    fadeOutDuration = {1000}
                    opacity = {0.8}
                    textStyle = {{color: 'white'}}
                />
                <Modal
                    animationType = 'slide'
                    transparent = {false}
                    visible = {this.state.isFeedModal}
                    transparent = {true}
                    onRequestClose = {() => {
                        
                    }}>
                        <CommendFeedModal venue = {this.state.selectedVenue} onClickedBack = {() => this.setState({ isFeedModal: false, isVoteModal: false })}/>
                </Modal>

                <Modal
                    animationType = 'slide'
                    transparent = {false}
                    visible = {this.state.isVoteModal}
                    transparent = {true}
                    onRequestClose = {() => {
                        
                    }}>
                        <VoteModal venue = {this.state.selectedVenue} group={this.state.group} 
                            onClickedBack = {() =>  this.setState({isFeedModal: false, isVoteModal: false, }) } 
                            onClickVoteLocation = {() => this.onClickLocation(this.state.selectedVenue)}
                            onVoteClick = {(params) => this.onVoteClick(params)}/>
                </Modal>

                <Modal
                    animationType = 'slide'
                    transparent = {false}
                    visible = {this.state.isAddMemberModal}
                    transparent = {true}
                    onRequestClose = {() => {
                        
                    }}>
                        <AddFriendModal onAddMembers  = {(members)=> this.onAddMembers(members)} onClickedBack = {() => this.setState({ isAddMemberModal: false, isVoteModal: false })}/>
                </Modal>

                <Modal
                    animationType = 'slide'
                    transparent = {false}
                    visible = {this.state.isShowMemberModal}
                    transparent = {true}
                    onRequestClose = {() => {
                        
                    }}>
                        <ShowMemberModal members={this.state.group.group.members} onClickedBack = {() => this.setState({ isShowMemberModal: false })}/>
                </Modal>
            </View>
        );

    }
}
function mapStateToProps(state) {
    return {
        user: state.user.userInfo,
        groups: state.user.groups
    }
}
export default connect(mapStateToProps)(voteGroup);