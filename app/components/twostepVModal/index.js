import { Button, Label, Thumbnail, View } from "native-base";
import React, { Component } from "react";
import { Dimensions, TouchableOpacity, TextInput } from "react-native";
import DatePicker from "react-native-datepicker";
import Toast, { DURATION } from "react-native-easy-toast";
import { connect } from "react-redux";
import images from "../../themes/images";
import styles from "./styles";
import { sendTwoStepVCode, verifyTwoStepVCode } from "../../actions";
const { width, height } = Dimensions.get("window");

var groupList = [
  { name: "Design Community", members: 12, isSelected: false },
  { name: "Sport Community", members: 4, isSelected: false },
  { name: "Music Community", members: 7, isSelected: false },
  { name: "Travel Community", members: 10, isSelected: false },
  { name: "Design Community", members: 12, isSelected: false }
];

class twostepVModal extends Component {
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
    let enabledGroup = this.props.groups.filter(elem => {
      return elem.status == "accepted";
    });
    let sortedGroup = enabledGroup.sort(function(a, b) {
      return a.group.group_name > b.group.group_name;
    });
    this.setState({
      modalVisible: false,
      groupList: sortedGroup
    });
  }

  onClickedRecend = () => {
    sendTwoStepVCode({ authyId: this.props.authyId }).then(data => {
      if (data.success) {
        this.refs.successtoast.show("Successfully sent", DURATION.LENGTH_LONG);
      } else {
        this.refs.errortoast.show("Failed, please retry", DURATION.LENGTH_LONG);
      }
    });
  };

  onClickedConfirm = () => {
    verifyTwoStepVCode({ authyId: this.props.authyId, otp: this.state.vcode }).then(data => {
      if (data.success) {
        this.props.twoStepVerified();
      } else {
        this.refs.errortoast.show("Failed, please retry", DURATION.LENGTH_LONG);
      }
    });
  };

  render() {
    return (
      <View style={styles.modalView}>
        <View style={styles.modalMainView}>
          <Label style={styles.verificationLabel}>
            Verification code sent to
          </Label>
          <Label style={styles.verificationLabel}>{this.props.phone}</Label>
          <TextInput
            style={styles.inputTxt}
            onChangeText={text => this.setState({ vcode: text })}
            value={this.state.vcode}
            placeholder="Vcode"
            placeholderTextColor="#4a6187"
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid = "transparent"
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
export default connect(mapStateToProps)(twostepVModal);
