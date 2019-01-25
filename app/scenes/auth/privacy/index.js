import {
  Button,
  Container,
  Content,
  Label,
  Text,
  Thumbnail,
  View
} from "native-base";
import React, { Component } from "react";
import { NativeEventEmitter, NativeModules, Dimensions } from "react-native";
import OpenFile from "react-native-doc-viewer";
import { BallIndicator } from "react-native-indicators";

import Toast, { DURATION } from "react-native-easy-toast";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");
import images from "../../../themes/images";
import {
  getAllCategories,
  getGroups,
  getNearVenues,
  userLogIn,
  sendTwoStepVCode
} from "../../../actions";
import styles from "./styles";

// var RNFS = require('react-native-fs');
// var SavePath = Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;
var privacy_doc =
  "https://s3.us-east-2.amazonaws.com/tribeupload/privacy_policy.doc";
var terms_doc = "https://s3.us-east-2.amazonaws.com/tribeupload/terms_use.doc";
class privacy extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      isLoading: false,
      animating: false,
      progress: "",
      donebuttonclicked: false,
      email: "",
      password: "",
      lastLat: 0,
      lastLong: 0
    };
    this.eventEmitter = new NativeEventEmitter(
      NativeModules.RNReactNativeDocViewer
    );
    this.eventEmitter.addListener("DoneButtonEvent", data => {
      /*
       *Done Button Clicked
       * return true
       */
      console.log(data.close);
      this.setState({ donebuttonclicked: data.close });
    });
  }
  componentDidMount() {
    let email = this.props.navigation.state.params.email;
    let password = this.props.navigation.state.params.password;
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          email: email,
          password: password,

          lastLat: position.coords.latitude,
          lastLong: position.coords.longitude
        });
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
  }
  componentWillMount() {
    // download progress
    this.eventEmitter.addListener("RNDownloaderProgress", Event => {
      console.log("Progress - Download " + Event.progress + " %");
      this.setState({ progress: Event.progress + " %" });
    });
  }
  componentWillUnmount() {
    this.eventEmitter.removeListener();
  }
  onAgree = () => {
    if (this.state.lastLat == 0) {
      this.refs.errortoast.show(
        `We can’t find you!

                In order to find venues and events near you, Tribi needs your location.
                
                Go to Settings > Privacy > Location Services and switch Tribi to ON`,
        DURATION.LENGTH_LONG
      );
    }
    var { dispatch } = this.props;
    userLogIn(this.state.email, this.state.password).then(data => {
      this.setState({ isLoading: false });
      if (data.success) {
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

          dispatch(
            NavigationActions.navigate({ routeName: "tutorial" })
          );
        });
      } else {
        this.refs.errortoast.show(
          "Invalid email or password",
          DURATION.LENGTH_LONG
        );
      }
    });
  };
  onPrivacy = () => {
    this.setState({
      isLoading: true
    });
    OpenFile.openDoc(
      [
        {
          url: privacy_doc,
          fileNameOptional: "Privacy Policy",

          fileType: "doc"
        }
      ],
      (error, url) => {
        this.setState({
          isLoading: false,
          animating: false
        });
      }
    );
  };
  onTermsOfService = () => {
    this.setState({
      isLoading: true
    });
    OpenFile.openDoc(
      [
        {
          url: terms_doc,
          fileNameOptional: "Terms of Use",
          fileType: "doc"
        }
      ],
      (error, url) => {
        this.setState({
          isLoading: false,
          animating: false
        });
      }
    );
  };
  render() {
    return (
      <Container style={styles.container}>
        <Thumbnail
          square
          source={images.privacybackgroundImage}
          style={styles.signInBackgroundImg}
        />
        <Content>
          <View style={styles.mainContainer}>
            <View>
              <Text style={styles.privacytextView}>
                To provide you with the best possible service, we kindly ask you
                to review and accept the Tribi Privacy Policy and Terms of
                Service.
              </Text>
            </View>
            {this.state.isLoading ? (
              <BallIndicator color={"#2B3643"} style={styles.loadingBar} />
            ) : null}
            <Button
              transparent
              style={{ marginTop: 20 }}
              onPress={() => this.onPrivacy()}
            >
              <View style={styles.privacyButtons}>
                <Label style={styles.privacyButtonTxt}>PRIVACY POLICY</Label>
              </View>
            </Button>

            <Button
              transparent
              style={{ marginTop: 20 }}
              onPress={() => this.onTermsOfService()}
            >
              <View style={styles.privacyButtons}>
                <Label style={styles.privacyButtonTxt}>TERMS OF SERVICE</Label>
              </View>
            </Button>
            <View style={{ marginTop: 25 }}>
              <Text style={styles.policytextView}>
                By tapping "I Agree" below, I am agreeing that I have read I
                agree to and accept the Tribi Privacy Policy and Terms of
                Service
              </Text>
            </View>
            <Button
              transparent
              style={{ marginTop: 20 }}
              onPress={() => this.onAgree()}
            >
              <View style={styles.signinView}>
                <Label style={styles.signinTxt}>I AGREE</Label>
              </View>
            </Button>
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
        </Content>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return { categories: state.categories };
}
export default connect()(privacy);
