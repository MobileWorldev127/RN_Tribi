import { Button, Label, Thumbnail, View } from "native-base";
import React, { Component } from "react";
import { Dimensions, Keyboard, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import Toast, { DURATION } from "react-native-easy-toast";
import { connect } from "react-redux";
import images from "../../themes/images";
import styles from "./styles";
const { width, height } = Dimensions.get("window");

class voteModal extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
    drawerLabel: () => null
  };

  constructor(props) {
    super(props);
    this.state = {
      isThumbUp: false,
      isThumbDown: false,
      comment: ""
    };
  }

  componentWillMount() {
    console.log(this.props.group);
    console.log(this.props.venue);
  }
  onVoteClick() {
    console.log(this.state.isThumbUp);
    console.log(this.state.isThumbDown);
    if (!this.state.isThumbUp && !this.state.isThumbDown) {
      this.refs.errortoast.show("Please select thumb!", DURATION.LENGTH_LONG);

      return;
    }
    let params = {
      username: this.props.user.username,
      user_id: this.props.user._id,
      group_id: this.props.group.group._id,
      candidate_id: this.props.venue._id,
      isthumbup: this.state.isThumbUp,
      photo: this.props.user.photo,
      comment: this.state.comment,
      phone: this.props.user.phone
    };
    this.props.onVoteClick(params);
  }
  onThumbDown() {
    this.setState({
      isThumbDown: !this.state.isThumbDown,
      isThumbUp: false
    });
  }
  onThumbup() {
    this.setState({
      isThumbUp: !this.state.isThumbUp,
      isThumbDown: false
    });
  }
  render() {
    return (
      <View style={styles.modalView}>
        <TouchableOpacity
          style={styles.blankView}
          onPress={this.props.onClickedBack}
        />
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={styles.keyboardView}
        >
          <TouchableOpacity
            onPress={() => Keyboard.dismiss()}
            activeOpacity={1}
          >
            <View style={styles.modalMainView}>
              <Label style={styles.modaltitle}>
                {this.props.group.group.group_name}
              </Label>
              <Label style={styles.countmemberTxt}>
                {this.props.group.group.members.length} members
              </Label>
              <View style={styles.groupIcon}>
                {this.props.group.group.members.map((elem, index) => {
                  if (index > 9) return;
                  return (
                    <Thumbnail
                      square
                      source={{ uri: elem.photo }}
                      style={styles.memberIcon}
                    />
                  );
                })}
              </View>

              <View style = {styles.aboutView1}>
                <View style={styles.aboutView}>
                  <Label style={styles.label1}>{this.props.venue.venue_name}</Label>
                  <Label style={styles.label1}>{this.props.venue.date}</Label>
                </View>
                <Thumbnail
                  square
                  source={{ uri: this.props.user.photo }}
                  style={styles.avatarImg}
                />
                <TouchableOpacity onPress={this.props.onClickVoteLocation} style = {styles.locationView}>
                  <Thumbnail
                    square
                    source={images.tab_location}
                    style={styles.locationImg}
                  />
                </TouchableOpacity>
              </View>             

              <View style={styles.fingView}>
                <TouchableOpacity
                  onPress={() => {
                    this.onThumbup();
                  }}
                >
                  <Thumbnail
                    square
                    source={
                      this.state.isThumbUp
                        ? images.ic_finger_up_fill
                        : images.ic_finger_up
                    }
                    style={styles.likeImg}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.onThumbDown();
                  }}
                >
                  <Thumbnail
                    square
                    source={
                      this.state.isThumbDown
                        ? images.ic_finger_down_fill
                        : images.ic_finger_down
                    }
                    style={[styles.likeImg, { marginLeft: 20 }]}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.inputView}>
                <AutoGrowingTextInput
                  onChangeText={text => {
                    this.setState({
                      comment: text
                    });
                  }}
                  style={styles.textInput}
                  placeholder={"Type Comment"}
                  underlineColorAndroid = "transparent"
                />
              </View>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <Button
          style={styles.voteBtnView}
          onPress={() => {
            this.onVoteClick();
          }}
        >
          <Label style={styles.voteTxt}>VOTE</Label>
        </Button>
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
    user: state.user.userInfo
  };
}
export default connect(mapStateToProps)(voteModal);
