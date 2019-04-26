import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Text,
  Thumbnail,
  Button,
  View,
  Label,
  Input
} from "native-base";
import { NavigationActions } from "react-navigation";
import {
  Animated,
  Keyboard,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal
} from "react-native";
import styles from "./styles";
import { BallIndicator } from "react-native-indicators";
import ImagePicker from "react-native-image-picker";
import Toast, { DURATION } from "react-native-easy-toast";
import images from "../../../themes/images";
import PhoneInput from "react-native-phone-input";
import { uploadPhoto, userSignUp, sendPhoneVerifyCode } from "../../../actions";
import PhoneVerifyModal from "../../../components/phoneVerifyModal";

const { width, height } = Dimensions.get("window");
var options = {
  title: "Select Avatar",
  cameraType: "front",
  mediaType: "photo",
  maxWidth: "500",
  maxHeight: "500",
  customButtons: [],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};
class signup extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
    drawerLabel: () => null
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      isLoading: false,
      avatarSource: images.ic_photo_default,
      photo: "",
      phoneverified: false,
      showPhoneVerify: false,
      phone_number: "",
      country_code: "",
      authyId: ""
    };
  }

  componentWillMount() {}

  onBack() {
    var { dispatch } = this.props;
    dispatch(NavigationActions.back());
  }

  onForgotPassword() {
    var { dispatch } = this.props;
    dispatch(NavigationActions.navigate({ routeName: "lostpassword" }));
  }
  sendVerificationCode = () => {
    if (!this.state.email.length) {
      this.refs.errortoast.show("Please enter email", DURATION.LENGTH_LONG);
      return;
    }
    if (!this.phone.isValidNumber()) {
      this.refs.errortoast.show(
        "Tribi needs a valid phone number to verify your account",
        DURATION.LENGTH_LONG
      );
      return;
    } else {
      let country_code = this.phone.getCountryCode();
      let country_code_index = this.phone.getValue().indexOf(country_code);
      let phone_number = this.phone
        .getValue()
        .slice(country_code_index + country_code.length);

      sendPhoneVerifyCode({
        phone_number: phone_number,
        country_code: country_code
      }).then(data => {
        if (data.success) {
          let authyId = data.authyId;
          this.setState({
            phone_number: phone_number,
            country_code: country_code,
            showPhoneVerify: true,
            authyId: authyId
          });
        } else {
          this.refs.errortoast.show(
            "Failed, please try again 1 hour later",
            DURATION.LENGTH_LONG
          );
        }
      });
    }
  };
  testforsignupprogress = () => {
    let { dispatch } = this.props;
    dispatch(
      NavigationActions.navigate({
        routeName: "privacy",
        params: { email: this.state.email, password: this.state.password }
      })
    );
  }
  onSignup() {

    let { dispatch } = this.props;
    // this.testforsignupprogress(); return
    Keyboard.dismiss();
    if (!this.phone.isValidNumber()) {
      this.refs.errortoast.show(
        "Tribi needs a valid phone number to verify your account",
        DURATION.LENGTH_LONG
      );
      return;
    }
    if (!this.state.phoneverified) {
      this.refs.errortoast.show(
        "Please verify phone number",
        DURATION.LENGTH_LONG
      );
      return;
    }
    if (!this.state.username.length) {
      this.refs.errortoast.show("Please enter username", DURATION.LENGTH_LONG);
      return;
    }
    if (!this.state.email.length) {
      this.refs.errortoast.show("Please enter email", DURATION.LENGTH_LONG);
      return;
    }
    if (!this.state.password.length) {
      this.refs.errortoast.show("Please enter password", DURATION.LENGTH_LONG);
      return;
    }
    if (this.state.password != this.state.confirmpassword) {
      this.refs.errortoast.show(
        "Password confirmation mismatched",
        DURATION.LENGTH_LONG
      );
      return;
    }
    this.setState({ isLoading: true });

    let country_code = this.phone.getCountryCode();
    let country_code_index = this.phone.getValue().indexOf(country_code);
    let phone_number = this.phone
      .getValue()
      .slice(country_code_index + country_code.length);

    let params = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      phonenumber: phone_number,
      countrycode: country_code,
      photo: this.state.photo,
      authyId: this.state.authyId
    };
    userSignUp(params).then(data => {
      if (data.success) {
        dispatch(
          NavigationActions.navigate({
            routeName: "privacy",
            params: { email: this.state.email, password: this.state.password }
          })
        );
      } else {
        this.refs.errortoast.show(data.error.message, DURATION.LENGTH_LONG);
      }
      this.setState({ isLoading: false });
    });
  }
  openImagePicker = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        // let source = { uri: "data:image/jpeg;base64," + response.data };
        const source = { uri: response.uri };
        let params = {
          user_id: 0,
          photo: source
        };
        uploadPhoto(params).then(res => {
          if (res.success) {
            this.setState({
              avatarSource: source,
              photo: res.photo
            });
          } else {
            this.refs.errortoast.show(
              "Please enter email",
              DURATION.LENGTH_LONG
            );
          }
        });
      }
    });
  };
  twoStepVerified = authyId => {
    this.setState({
      authyId: authyId,
      phoneverified: true,
      showPhoneVerify: false
    });
  };
  render() {
    return (
      <Container style={styles.container}>
        <Thumbnail
          square
          source={images.signUp_backgroundImage}
          style={styles.signInBackgroundImg}
        />
        <Content>
          <View style={styles.mainContainer}>
            <TouchableOpacity onPress={this.openImagePicker}>
              <Thumbnail
                square
                source={this.state.avatarSource}
                style={styles.userPhoto}
              />
            </TouchableOpacity>
            <View style={styles.inputUsernameView}>
              <Thumbnail
                square
                source={images.ic_user}
                style={styles.userImg}
              />
              <View style={{ flex: 1 }}>
                <TextInput
                  ref="username"
                  style={styles.inputTxt}
                  onChangeText={text => this.setState({ username: text })}
                  value={this.state.username}
                  placeholder="Name"
                  placeholderTextColor="#4a6187"
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid = "transparent"
                />
                <View style={styles.line} />
              </View>
            </View>
            <View style={styles.inputPasswordView}>
              <Thumbnail
                square
                source={images.ic_email}
                style={styles.userImg}
              />
              <View style={{ flex: 1 }}>
                <TextInput
                  ref="password"
                  style={styles.inputTxt}
                  onChangeText={text => this.setState({ email: text })}
                  keyboardType="email-address"
                  value={this.state.email}
                  placeholder="E-mail"
                  placeholderTextColor="#4a6187"
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid = "transparent"
                />
                <View style={styles.line} />
              </View>
            </View>
            <View style={styles.inputPasswordView}>
              <Thumbnail
                square
                source={images.ic_user}
                style={styles.userImg}
              />
              <View style={{ flex: 1 }}>
                <View style={styles.phoneVerifyContainer}>
                  <PhoneInput
                    ref={ref => {
                      this.phone = ref;
                    }}
                    disabled={this.state.phoneverified}
                    style={styles.inputTxt}
                    textStyle={{ color: "#4a6187" }}
                    buttonTextStyle={{ color: "#4a6187" }}
                  />
                  {!this.state.phoneverified && (
                    <Button
                      transparent
                      onPress={() => this.sendVerificationCode()}
                    >
                      <View style={styles.phoneVerifyView}>
                        <Label style={styles.phoneVerifyText}>Verify</Label>
                      </View>
                    </Button>
                  )}
                  {this.state.phoneverified && (
                    <Button
                      transparent
                      onPress={() => {
                        this.setState({
                          phoneverified: false
                        });
                      }}
                    >
                      <View style={styles.phoneEditView}>
                        <Label style={styles.phoneVerifyText}>Edit</Label>
                      </View>
                    </Button>
                  )}
                </View>
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
                  underlineColorAndroid = "transparent"
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
                  onChangeText={text =>
                    this.setState({ confirmpassword: text })
                  }
                  secureTextEntry
                  value={this.state.confirmpassword}
                  placeholder="Confirm Password"
                  placeholderTextColor="#4a6187"
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid = "transparent"
                />
                <View style={styles.line} />
              </View>
            </View>

            <Button
              transparent
              style={{ marginTop: 45 }}
              onPress={() => this.onSignup()}
            >
              <View style={styles.signinView}>
                <Label style={styles.signinTxt}>CREATE ACCOUNT</Label>
              </View>
            </Button>
            <View style={styles.signUpView}>
              <Label style={styles.label1}>Already have account?</Label>
              <Button transparent onPress={() => this.onBack()}>
                <Label style={styles.label2}> Log in</Label>
              </Button>
            </View>
            <View style={{ marginTop: 55 }} />
            {/* <Button transparent style = {{marginTop: 55}} disabled = {this.state.isLoading? true : false}>
                            <View style = {styles.facebookView}>
                                <Label style = {styles.facebookTxt}>LOG IN WITH FACEBOOK</Label>
                            </View>
                        </Button> */}
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.showPhoneVerify}
            transparent={true}
            onRequestClose={() => {}}
          >
            <PhoneVerifyModal
              twoStepVerified={this.twoStepVerified}
              phone_number={this.state.phone_number}
              country_code={this.state.country_code}
              authyId={this.state.authyId}
              onDismiss={() => {
                this.setState({
                  showPhoneVerify: false
                });
              }}
            />
          </Modal>
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


export default connect()(signup);
