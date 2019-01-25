import { Button, Label, Thumbnail, View } from "native-base";
import React, { Component } from "react";
import { Dimensions, TouchableOpacity, TextInput } from "react-native";
import DatePicker from "react-native-datepicker";
import Toast, { DURATION } from "react-native-easy-toast";
import { connect } from "react-redux";
import images from "../../themes/images";
import styles from "./styles";
import { sendPhoneVerifyCode, verifyPhoneVCode } from "../../actions";
const { width, height } = Dimensions.get("window");

var groupList = [
  { name: "Design Community", members: 12, isSelected: false },
  { name: "Sport Community", members: 4, isSelected: false },
  { name: "Music Community", members: 7, isSelected: false },
  { name: "Travel Community", members: 10, isSelected: false },
  { name: "Design Community", members: 12, isSelected: false }
];

class phoneVerifyModal extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      groupList: groupList,
      date: null,
      selectedGroup: null,
      vcode: ""
    };
  }

  componentWillMount() {
    this.setState({
      authyId: this.props.authyId
    });
  }


  onClickedRecend = () =>{
    sendPhoneVerifyCode({phone_number: this.props.phone_number, country_code: this.props.country_code}).then((data) => {
      if (data.success) {
        let authyId = data.authyId;
        this.setState({
          authyId: authyId
        })
      } else {
        this.refs.errortoast.show(
          "Failed, please try again 1 hour later",
          DURATION.LENGTH_LONG
        );
      }
    })
  }

  onClickedConfirm = () => {
    verifyPhoneVCode({
      authyId: this.state.authyId,
      otp: this.state.vcode
    }).then(data => {
      if (data.success) {
        this.props.twoStepVerified(this.state.authyId);
      } else {
        this.refs.errortoast.show("Failed, please retry", DURATION.LENGTH_LONG);
      }
    });
  };

  render() {
    return (
      <View style={styles.modalView}>
        <TouchableOpacity
          style={styles.blankView}
          onPress={this.props.onDismiss}
        />
        <View style={styles.modalMainView}>
          <Label style={styles.verificationLabel}>
            Verification code sent to
          </Label>
          <Label style={styles.verificationLabel}>{`+${this.props.country_code}${this.props.phone_number}`}</Label>
          <TextInput
            style={styles.inputTxt}
            onChangeText={text => this.setState({ vcode: text })}
            value={this.state.vcode}
            placeholder="Vcode"
            placeholderTextColor="#4a6187"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={styles.buttonInline}>
            <Button
              style={styles.recommendBtnView}
              onPress={this.onClickedRecend}
            >
              <Label style={styles.recommedTxt}>RESEND</Label>
            </Button>
            <Button
              style={styles.recommendBtnView}
              onPress={this.onClickedConfirm}
            >
              <Label style={styles.recommedTxt}>Confirm</Label>
            </Button>
          </View>
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
function mapStateToProps(state) {
  return {
    groups: state.user.groups
  };
}
export default connect(mapStateToProps)(phoneVerifyModal);
