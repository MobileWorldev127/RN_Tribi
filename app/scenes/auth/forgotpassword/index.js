import { Button, Container, Content, Label, Thumbnail, View } from "native-base";
import React, { Component } from "react";
import { Dimensions, TextInput } from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { resetPassword } from "../../../actions";
import images from "../../../themes/images";
import styles from "./styles";

const { width, height } = Dimensions.get("window");
class forgotpassword extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
    drawerLabel: () => null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isLoading: false
    };
  }

  onBack() {
    var { dispatch } = this.props;
    dispatch(NavigationActions.back());
  }
  resetPassword = () => {
    resetPassword(this.state.email).then(res => {
      if (res.success) {
        this.refs.errortoast.show(
          `Please Check Your Email 
                    You will receive a temporary password shortly`,
          DURATION.LENGTH_LONG
        );
      } else {
        this.refs.errortoast.show(res.error.message, DURATION.LENGTH_LONG);
      }
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
            <Label style={styles.label1}>FORGOT PASSWORD?</Label>
            <Label style={styles.label2}>
              Enter your email below to receive your
              {"\n"}
              password reset instructions
            </Label>
            <View style={styles.inputEmailView}>
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
                />
                <View style={styles.line} />
              </View>
            </View>
            <Button
              transparent
              style={{ marginTop: 45 }}
              onPress={() => this.resetPassword()}
            >
              <View style={styles.resetView}>
                <Label style={styles.resetTxt}>RESET PASSWORD</Label>
              </View>
            </Button>
            <Button
              transparent
              style={styles.signUpView}
              onPress={() => this.onBack()}
            >
              <Thumbnail
                square
                source={images.ic_backBtn}
                style={styles.backImg}
              />
              <Label style={styles.label3}>Get back to</Label>
              <Label style={styles.label4}> Sign in</Label>
            </Button>
          </View>
        </Content>{" "}
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

export default connect()(forgotpassword);
