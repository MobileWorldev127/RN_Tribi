import { Body, Button, Header, Label, Left, Right, Thumbnail, View } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import Toast from "react-native-easy-toast";
import ImagePicker from 'react-native-image-picker';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { getGroups, uploadPhoto } from '../../../actions';
import images from '../../../themes/images';
import styles from './styles';
const { width, height } = Dimensions.get("window");
var options = {
    title: 'Select Avatar',
    cameraType: 'front',
    mediaType: 'photo',
    maxWidth: '500',
    maxHeight: '500',
    customButtons: [
      
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
// import PhotoUpload from 'react-native-photo-upload'
class userProfile extends Component{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props){
        super(props);
        this.state = {
            avatarSource: null
        }
    }
    
    componentWillMount() {
        this.setState({
            avatarSource: { uri: this.props.user.photo }
        })
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

    onClickedProfileEdit(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'editProfile'}));
    }
    openImagePicker = () => {
        ImagePicker.showImagePicker(options, (response) => {
            
            if (response.didCancel) {
              
            }
            else if (response.error) {
              
            }
            else if (response.customButton) {
              
            }
            else {
              // let source = { uri: response.uri };
          
              // You can also display the image using data:
              let source = { uri: 'data:image/jpeg;base64,' + response.data };
              let params = {
                  user_id: this.props.user._id,
                  photo: source
              }
              uploadPhoto(params).then((res) => {
                  if (res.success) {
                    var { dispatch } = this.props;
                    dispatch ({ type: 'saveUserInfo', data: res.data.user });
                    this.setState({
                        avatarSource: source
                    });
                    getGroups(this.props.user.phone).then((data) => {
                        console.log(data)
                        dispatch ({ type: 'saveGroups', data: data.data.groups });
                    })
                  } else {
                      this.refs.errortoast.show(
                        res.error.message,
                        DURATION.LENGTH_LONG
                      );
                  }
              })
            }
          });
    }
    onBack = () => {
        if (this.props.navigation.state.params && typeof this.props.navigation.state.params.onNavigateBack !== "undefined") {
            this.props.navigation.state.params.onNavigateBack(); 
        }
        this.props.navigation.goBack()
    }
    render(){
        return (
            <View style={styles.container}>

                    <Thumbnail square source = {images.ic_home_backgroundImage} 
                        style = {styles.signInBackgroundImg}/>
                <Header style = {styles.header}>
                    <Left>
                        <Button transparent onPress = {() =>{this.onBack()}}>
                            <Thumbnail square source = {images.ic_backBtn} style = {styles.menuImg}/>
                        </Button>
                    </Left>
                    <Body>
                        <Label style = {styles.screentitle}>MY PROFILE</Label>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Thumbnail square source = {null} style = {styles.avatarImg}/>
                        </Button>
                    </Right>
                </Header>
                <View style = {styles.mainContainer}>
                    <View style = {styles.aboutView}>
                        <TouchableOpacity onPress={this.openImagePicker}>
                            <Thumbnail square source = {this.state.avatarSource} style = {styles.userImg} />  
                        </TouchableOpacity>
                        <Label style = {styles.userName}>{ this.props.user.username }</Label>
                        <Label style = {styles.userCity}>{ this.props.user.location?this.props.user.location:'Undefined' }</Label>
                        <Label style = {styles.userAbout}>{ this.props.user.description?this.props.user.description:'No description' }</Label>
                        
                    </View>
                    <TouchableOpacity onPress = {() => this.onClickedProfileEdit()}>
                        <Thumbnail square source = {images.ic_userprofile_edit} style = {styles.editImg}/>
                    </TouchableOpacity>
                    
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
            ref="errortoast"
            style={{ backgroundColor: "#f98192" }}
            position="top"
            positionValue={height / 2}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={1}
            textStyle={{ color: "white" }}
          />
            </View>
        );

    }
}
function mapStateToProp(state) {
    return {
        user: state.user.userInfo
    }
}
export default connect(mapStateToProp)(userProfile);