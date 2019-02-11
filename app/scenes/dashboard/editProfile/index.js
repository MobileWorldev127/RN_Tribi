import { Body, Button, Header, Label, Left, Right, Thumbnail, View, Container, Content, Footer, FooterTab } from "native-base";
import React, { Component } from "react";
import { Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { updateProfile } from "../../../actions";
import images from "../../../themes/images";
import styles from "./styles";
const { width, height } = Dimensions.get("window");

class editProfile extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      location: "",
      description: "",
      password: "",
      passconfirm: ""
    };
  }

  componentWillMount() {
    this.setState({
      username: this.props.user.username,
      location: this.props.user.location,
      description: this.props.user.description
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

  onSaveChanges() {
    if (this.state.password != this.state.passconfirm) {
      this.refs.errortoast.show(
        "Password not match with confirmation!",
        DURATION.LENGTH_LONG
      );
      return;
    }
    if (this.state.password.length < 4) {
      this.refs.errortoast.show(
        "Password should be at least 4 letters",
        DURATION.LENGTH_LONG
      );
      return;
    }
    let { dispatch } = this.props;
    let params = {
      user_id: this.props.user._id,
      location: this.state.location,
      username: this.state.username,
      description: this.state.description,
      password: this.state.password
    };
    updateProfile(params).then(res => {
      if (res.success) {
        this.refs.toast.show("Successfully updated", DURATION.LENGTH_LONG);
        dispatch({ type: "saveUserInfo", data: res.data.user });
      } else {
        this.refs.errortoast.show(res.error.message, DURATION.LENGTH_LONG);
      }
    });
  }

  render() {
    return (
      <Container style={styles.container}>
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
            <Label style={styles.screentitle}>EDIT PROFILE</Label>
          </Body>
          <Right>
            <Button transparent>
              <Thumbnail
                square
                source={{ uri: this.props.user.photo }}
                style={styles.avatarImg}
              />
            </Button>
          </Right>
        </Header>

        <Content>
          <View style={styles.mainContainer}>
            <View>
              <Label style={styles.usernametxt}>NAME</Label>
              <TextInput
                style={styles.inputTxt}
                onChangeText={text => this.setState({ username: text })}
                value={this.state.username}
                placeholder="Name"
                placeholderTextColor="#4a6187"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid = "transparent"
              />
              <View style={styles.underline} />
            </View>
            <View style={{ marginTop: 25 }}>
              <Label style={styles.usernametxt}>LOCATION</Label>
              <TextInput
                style={styles.inputTxt}
                onChangeText={text => this.setState({ location: text })}
                value={this.state.location}
                placeholder="Location"
                placeholderTextColor="#4a6187"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid = "transparent"
              />
              <View style={styles.underline} />
            </View>
            <View style={{ marginTop: 25 }}>
              <Label style={styles.usernametxt}>BIO</Label>
              <TextInput
                style={styles.inputTxt}
                onChangeText={text => this.setState({ description: text })}
                value={this.state.description}
                placeholder="Description"
                placeholderTextColor="#4a6187"
                autoCapitalize="none"
                multiline={true}
                autoCorrect={false}
                underlineColorAndroid = "transparent"
              />
              <View style={styles.underline} />
            </View>
            <View style={{ marginTop: 25 }}>
              <Label style={styles.usernametxt}>Password</Label>
              <TextInput
                style={styles.inputTxt}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#4a6187"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid = "transparent"
              />
              <View style={styles.underline} />
            </View>
            <View style={{ marginTop: 25 }}>
              <Label style={styles.usernametxt}>Password Confirm</Label>
              <TextInput
                style={styles.inputTxt}
                onChangeText={text => this.setState({ passconfirm: text })}
                value={this.state.passconfirm}
                secureTextEntry
                placeholder="Confirm password"
                placeholderTextColor="#4a6187"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid = "transparent"
              />
              <View style={styles.underline} />
            </View>
            <Button
              transparent
              style={{ marginTop: 40 }}
              onPress={() => this.onSaveChanges()}
            >
              <View style={styles.saveView}>
                <Label style={styles.saveTxt}>SAVE CHANGES</Label>
              </View>
            </Button>
          </View>
          
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
          </Content>
        <Toast
          ref="toast"
          style={{ backgroundColor: "#35e49c" }}
          position="top"
          positionValue={height / 6}
          opacity={0.8}
          textStyle={{ color: "white" }}
        />
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
      </Container>
    );
  }
}
function mapStateToProp(state) {
  return {
    user: state.user.userInfo
  };
}
export default connect(mapStateToProp)(editProfile);
