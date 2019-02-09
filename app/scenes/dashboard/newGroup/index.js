import { Body, Button, Header, Label, Left, Right, Thumbnail, View, Content } from "native-base";
import React, { Component } from "react";
import { Dimensions, TextInput, TouchableOpacity } from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import Switch from "react-native-switch-pro";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { createGroup, getGroups } from "../../../actions";
import images from "../../../themes/images";
import styles from "./styles";
const { width, height } = Dimensions.get("window");

class newGroup extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
      group_name: "",
      memberaddable: false
    };
  }

  componentWillMount() {}
  onChangeMember(value) {}
  onCreate() {
    let params = {
      group_name: this.state.group_name,
      memberaddable: this.state.memberaddable,
      creator_id: this.props.user._id,
      phone: this.props.user.phone
    };
    console.log(params);
    createGroup(params).then(res => {
      if (res.success == true) {
        var group_id = res.data.newgroup._id;
        getGroups(this.props.user.phone).then(data => {
          let groups = data.data.groups;
          var navigatetovote = false;
          for (let i = 0; i < groups.length; i++) {
            if (groups[i].group._id == group_id) {
              navigatetovote = true;
              var { dispatch } = this.props;
              dispatch({ type: "saveGroups", data: data.data.groups });
              dispatch(
                NavigationActions.navigate({
                  routeName: "voteGroup",
                  params: groups[i]
                })
              );
              break;
            }
          }
          if (!navigatevote) {
            dispatch(
              NavigationActions.navigate({
                routeName: "tabbarView",
                params: { index: 0 }
              })
            );
          }
        });
      } else {
        this.refs.errortoast.show(res.error.message, DURATION.LENGTH_LONG);
      }
    });
  }

  onHome() {
    var { dispatch } = this.props;
    dispatch(
      NavigationActions.navigate({
        routeName: "tabbarView",
        params: { index: 0 }
      })
    );
  }

  onFavorite() {
    var { dispatch } = this.props;
    dispatch(
      NavigationActions.navigate({
        routeName: "tabbarView",
        params: { index: 1 }
      })
    );
  }

  onAccount() {
    var { dispatch } = this.props;
    dispatch(
      NavigationActions.navigate({
        routeName: "tabbarView",
        params: { index: 2 }
      })
    );
  }

  onLocation() {
    var { dispatch } = this.props;
    dispatch(
      NavigationActions.navigate({
        routeName: "tabbarView",
        params: { index: 3 }
      })
    );
  }

  onClickedProfile() {
    // var { dispatch } = this.props;

    // dispatch(NavigationActions.navigate({routeName: 'userProfile', onNavigateBack: this.handleOnNavigateBack}));

    this.props.navigation.navigate("userProfile");
  }
  render() {
    return (
      <View style={styles.container}>
        <Thumbnail
          square
          source={images.ic_home_backgroundImage}
          style={styles.signInBackgroundImg}
        />
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Thumbnail
                square
                source={images.ic_backBtn}
                style={styles.menuImg}
              />
            </Button>
          </Left>
          <Body>
            <Label style={styles.screentitle}>NEW GROUP</Label>
          </Body>
          <Right>
            <Button transparent onPress={() => this.onClickedProfile()}>
              <Thumbnail
                square
                source={{ uri: this.props.user.photo }}
                style={styles.avatarImg}
              />
            </Button>
          </Right>
        </Header>
        <Content>
        <View style={styles.mainContainer} showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <View>
              <Label style={styles.generaltxt}>GENERAL</Label>
              <Label style={styles.nametxt}>NAME</Label>
              <TextInput
                style={styles.inputTxt}
                onChangeText={text => this.setState({ group_name: text })}
                value={this.state.group_name}
                placeholder="Group Name"
                placeholderTextColor="#4a6187"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid = "transparent"
              />
              <View style={styles.underline} />

            </View>

            <View>
              <Label style={styles.notificationtxt}>Setting</Label>
              <View style={styles.underline} />
              <View style={styles.emailsubView}>
                <Label style={styles.friendTxt}>
                  Allow group members to invite others
                </Label>
                <Switch
                  value={this.state.memberaddable}
                  onSyncPress={value => {
                    this.setState({ memberaddable: value });
                  }}
                />
              </View>
              <View style={styles.underline} />
            </View>
          </View>
          
          <Button
            transparent
            onPress={() => this.onCreate()}
            style={styles.createView}
          >
            <Label style={styles.createTxt}>CREATE</Label>
          </Button>

          <View style={styles.tabView}>
            <TouchableOpacity onPress={() => this.onHome()}>
              <View style={styles.tabBtn}>
                <Thumbnail
                  square
                  source={images.tab_home}
                  style={[
                    styles.tabIcon,
                    { tintColor: this.state.isHome ? "#33e098" : null }
                  ]}
                />
                <Thumbnail
                  square
                  source={images.tab_backgroundImage}
                  style={
                    this.state.isHome
                      ? styles.tabBackgroundImg
                      : styles.tabBackgroundImg1
                  }
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onFavorite()}>
              <View style={styles.tabBtn}>
                <Thumbnail
                  square
                  source={images.tab_favorite}
                  style={[
                    styles.tabIcon,
                    { tintColor: this.state.isFavorite ? "#33e098" : null }
                  ]}
                />
                <Thumbnail
                  square
                  source={images.tab_backgroundImage}
                  style={
                    this.state.isFavorite
                      ? styles.tabBackgroundImg
                      : styles.tabBackgroundImg1
                  }
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onAccount()}>
              <View style={styles.tabBtn}>
                <Thumbnail
                  square
                  source={images.tab_account}
                  style={[
                    styles.tabIcon,
                    { tintColor: this.state.isAccount ? "#33e098" : null }
                  ]}
                />
                <Thumbnail
                  square
                  source={images.tab_backgroundImage}
                  style={
                    this.state.isAccount
                      ? styles.tabBackgroundImg
                      : styles.tabBackgroundImg1
                  }
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onLocation()}>
              <View style={styles.tabBtn}>
                <Thumbnail
                  square
                  source={images.tab_location}
                  style={[
                    styles.tabIcon,
                    { tintColor: this.state.isLocation ? "#33e098" : null }
                  ]}
                />
                <Thumbnail
                  square
                  source={images.tab_backgroundImage}
                  style={
                    this.state.isLocation
                      ? styles.tabBackgroundImg
                      : styles.tabBackgroundImg1
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        </Content>
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
function mapStatusToProps(state) {
  return {
    user: state.user.userInfo
  };
}
export default connect(mapStatusToProps)(newGroup);
