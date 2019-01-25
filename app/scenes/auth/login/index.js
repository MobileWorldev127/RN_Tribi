import {
  Button,
  Container,
  Content,
  Label,
  Thumbnail,
  View
} from "native-base";
import React, { Component } from "react";
import {
  AsyncStorage,
  Dimensions,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Modal
} from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import { BallIndicator } from "react-native-indicators";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import {
  getAllCategories,
  getGroups,
  getNearVenues,
  userLogIn,
  sendTwoStepVCode
} from "../../../actions";
import images from "../../../themes/images";
import TwostepVModal from "../../../components/twostepVModal";
import styles from "./styles";

const { width, height } = Dimensions.get("window");

class login extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
    drawerLabel: () => null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      lastLat: null,
      lastLong: null,
      isAsyncData: true,
      loggedIn: false,
      navigateTo: "",
      authyId: "",
      phone: ""
    };
  }

  async componentWillMount() {
    // var { dispatch } = this.props;
    // dispatch(NavigationActions.navigate({routeName: 'privacy'}))
    // return
    let tutorialViewed = await AsyncStorage.getItem("tutorial");
    AsyncStorage.getItem("user").then(res => {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            lastLat: position.coords.latitude,
            lastLong: position.coords.longitude
          });
          if (res) {
            let { email, password } = JSON.parse(res);
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            userLogIn(email, password).then(data => {
              this.setState({ isLoading: false });
              if (data.success) {
                var { dispatch } = this.props;
                if (tutorialViewed == "viewed") {
                  dispatch({ type: "saveUserInfo", data: data.data.user });

                  Promise.all([
                    getAllCategories(lat, lng),
                    getNearVenues(lat, lng)
                  ]).then(([categories, nearvenues]) => {
                    dispatch({
                      type: "saveAllCategories",
                      data: categories.data
                    });
                    dispatch({ type: "saveNearVenues", data: nearvenues.data });
                    dispatch(
                      NavigationActions.navigate({
                        routeName: "tabbarView",
                        params: { index: 0 }
                      })
                    );
                  });
                  getGroups(data.data.user.phone).then(data => {
                    console.log(data.data.groups);
                    dispatch({ type: "saveGroups", data: data.data.groups });
                  });
                } else {
                  dispatch(
                    NavigationActions.navigate({ routeName: "tutorial" })
                  );
                }
              } else {
                this.setState({
                  isAsyncData: false
                });
              }
            });
          } else {
            this.setState({
              isAsyncData: false
            });
          }
        },
        error => {
          console.log(error);
          this.refs.errortoast.show(
            `We can’t find you!

                    In order to find venues and events near you, Tribi needs your location.
                    
                    Go to Settings > Privacy > Location Services and switch Tribi to ON`,
            DURATION.LENGTH_LONG
          );
        }
      );
    });
  }

  onBack() {
    var { dispatch } = this.props;
    dispatch(NavigationActions.back());
  }

  onLogin() {
    Keyboard.dismiss();
    if (!this.state.email.length) {
      this.refs.errortoast.show("Please enter email", DURATION.LENGTH_LONG);

      return;
    }
    if (!this.state.password.length) {
      this.refs.errortoast.show("Please enter password", DURATION.LENGTH_LONG);

      return;
    }
    this.setState({ isLoading: true });
    userLogIn(this.state.email, this.state.password).then(data => {
      // userLogIn('receiver', '123123').then(data => {
      this.setState({ isLoading: false });
      if (data.success) {
        console.log(data.data.user);
        var { dispatch } = this.props;
        dispatch({ type: "saveUserInfo", data: data.data.user });
        let lat = this.state.lastLat;
        let lng = this.state.lastLong;
        Promise.all([
          getAllCategories(lat, lng),
          getNearVenues(lat, lng),
          getGroups(data.data.user.phone)
        ]).then(([categories, nearvenues, groupdata]) => {
          dispatch({ type: "saveAllCategories", data: categories.data });
          dispatch({ type: "saveNearVenues", data: nearvenues.data });
          dispatch({ type: "saveGroups", data: groupdata.data.groups });

          let navigateTo = "tabbarView";
          if (data.data.isrecovered) {
            navigateTo = "editProfile";
          }

          sendTwoStepVCode({ authyId: data.data.user.authyId }).then(
            data => {}
          );
          this.setState({
            loggedIn: true,
            phone: data.data.user.phone,
            authyId: data.data.user.authyId,
            navigateTo: navigateTo
          });
          // this.navigateTo(navigateTo); // temporaly
        });
      } else {
        this.refs.errortoast.show(
          "Invalid email or password",
          DURATION.LENGTH_LONG
        );
      }
    });

    this.setState({ isLoading: true });
  }
  navigateTo = (navigateTo) => {
    let userinfo = {
      email: this.state.email,
      password: this.state.password,
      lat: this.state.lastLat,
      lng: this.state.lastLong
    };
    AsyncStorage.setItem("user", JSON.stringify(userinfo));
    var { dispatch } = this.props;
    if (navigateTo == "editProfile") {
      dispatch(NavigationActions.navigate({ routeName: "editProfile" }));
    } else {
      dispatch(
        NavigationActions.navigate({
          routeName: "tabbarView",
          params: { index: 0 }
        })
      );
    }
  }
  twoStepVerified = () => {
    let userinfo = {
      email: this.state.email,
      password: this.state.password,
      lat: this.state.lastLat,
      lng: this.state.lastLong
    };
    AsyncStorage.setItem("user", JSON.stringify(userinfo));
    var { dispatch } = this.props;
    this.setState({
      loggedIn: false
    });
    if (this.state.navigateTo == "editProfile") {
      dispatch(NavigationActions.navigate({ routeName: "editProfile" }));
    } else {
      dispatch(
        NavigationActions.navigate({
          routeName: "tabbarView",
          params: { index: 0 }
        })
      );
    }
  };
  onSignup() {
    var { dispatch } = this.props;
    dispatch(NavigationActions.navigate({ routeName: "signup" }));
  }

  onForgotPassword() {
    var { dispatch } = this.props;
    dispatch(NavigationActions.navigate({ routeName: "forgotpassword" }));
  }

  render() {
    if (!this.state.isAsyncData) {
      return (
        <Container style={styles.container}>
          <Thumbnail
            square
            source={images.backgroundImage}
            style={styles.signInBackgroundImg}
          />
          <Content>
            <View style={styles.mainContainer}>
              <View style={styles.inputUsernameView}>
                <Thumbnail
                  square
                  source={images.ic_user}
                  style={styles.userImg}
                />
                <View style={{ flex: 1 }}>
                  <TextInput
                    ref="email"
                    style={styles.inputTxt}
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                    placeholder="Email"
                    placeholderTextColor="#4a6187"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <View style={styles.line} />
                </View>
              </View>
              <View style={styles.inputPasswordView}>
                <Thumbnail
                  square
                  source={images.ic_password}
                  style={styles.userImg}
                />
                <View style={{ flex: 1 }}>
                  <TextInput
                    ref="password"
                    style={styles.inputTxt}
                    onChangeText={text => this.setState({ password: text })}
                    secureTextEntry
                    value={this.state.password}
                    placeholder="Password"
                    placeholderTextColor="#4a6187"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <View style={styles.line} />
                </View>
              </View>
              <TouchableOpacity
                transparent
                style={{ marginTop: 30 }}
                onPress={() => this.onForgotPassword()}
              >
                <Label style={styles.forgotTxt}>Forgot password?</Label>
              </TouchableOpacity>
              <Button
                transparent
                style={{ marginTop: 25 }}
                onPress={() => this.onLogin()}
                disabled={this.state.isLoading ? true : false}
              >
                <View style={styles.signinView}>
                  <Label style={styles.signinTxt}>SIGN IN</Label>
                </View>
              </Button>
              <View style={styles.signUpView}>
                <Label style={styles.label1}>Don’t have an account?</Label>
                <Button transparent onPress={() => this.onSignup()}>
                  <Label style={styles.label2}> Sign Up</Label>
                </Button>
              </View>
              <View style={{ marginTop: 55 }} />
              {/* <Button transparent style = {{marginTop: 55}} disabled = {this.state.isLoading? true : false}>
                                <View style = {styles.facebookView}>
                                    <Label style = {styles.facebookTxt}>LOG IN WITH FACEBOOK</Label>
                                </View>
                            </Button> */}
            </View>
            {this.state.isLoading ? (
              <BallIndicator color={"#2B3643"} style={styles.loadingBar} />
            ) : null}
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.loggedIn}
              transparent={true}
              onRequestClose={() => {}}
            >
              <TwostepVModal
                twoStepVerified={this.twoStepVerified}
                authyId={this.state.authyId}
                phone={this.state.phone}
              />
            </Modal>
          </Content>{" "}
          <Toast
            ref="successtoast"
            style={{ backgroundColor: "#35e49c" }}
            position="top"
            positionValue={height / 2}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={1}
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
    } else {
      return (
        <Container style={styles.container}>
          <BallIndicator color={"#2B3643"} style={styles.loadingBar} />
        </Container>
      );
    }
  }
}
function mapStateToProps(state) {
  return { categories: state.categories };
}
export default connect(
  mapStateToProps,
  null
)(login);
