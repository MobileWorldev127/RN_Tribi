import { Button, Label, Thumbnail, View } from "native-base";
import React, { Component } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import DatePicker from "react-native-datepicker";
import Toast, { DURATION } from "react-native-easy-toast";
import { connect } from "react-redux";
import images from "../../themes/images";
import styles from "./styles";
const { width, height } = Dimensions.get("window");

var groupList = [
  { name: "Design Community", members: 12, isSelected: false },
  { name: "Sport Community", members: 4, isSelected: false },
  { name: "Music Community", members: 7, isSelected: false },
  { name: "Travel Community", members: 10, isSelected: false },
  { name: "Design Community", members: 12, isSelected: false }
];

class recommendGroup extends Component {
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
      selectedGroup: null
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

  onSelectGroup(item, index) {
    this.state.groupList.map(elem => {
      elem["isSelected"] = false;
    });
    this.state.groupList[index]["isSelected"] = true;
    this.setState({
      modalVisible: true,
      selectedGroup: this.state.groupList[index]
    });
  }
  onClickedRecommend = () => {
    if (!this.state.selectedGroup) {
      this.refs.errortoast.show("Please select Group", DURATION.LENGTH_LONG);
      return;
    }
    if (!this.state.date) {
      this.refs.errortoast.show(
        "Please choose event date",
        DURATION.LENGTH_LONG
      );
      return;
    }
    this.state.selectedGroup["isSelected"] = false;
    this.props.onClickedRecommend({
      group: this.state.selectedGroup,
      date: this.state.date
    });
  };
  renderRow(item, index) {
    return (
      <View style={styles.rowView} key={index}>
        <View style={styles.groupIcon}>
          {item.group.members.map((elem, index) => {
            if (index > 2) return;
            return (
              <Thumbnail
                square
                source={{ uri: elem.photo }}
                style={styles.memberIcon}
              />
            );
          })}
        </View>
        <View>
          <Label style={styles.groupName}>{item.group.group_name}</Label>
          <Label style={styles.groupMembers}>
            {item.group.members.length} members
          </Label>
        </View>
        <TouchableOpacity onPress={() => this.onSelectGroup(item, index)}>
          <Thumbnail
            square
            source={
              item.isSelected ? images.ic_checkImage : images.ic_uncheckImage
            }
            style={styles.checkIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.modalView}>
        <TouchableOpacity
          style={styles.blankView}
          onPress={this.props.onClickedBack}
        />
        <View style={styles.modalMainView}>
          <DatePicker
            style={styles.datepickerView}
            date={this.state.date}
            mode="datetime"
            placeholder="select date"
            format="MM/DD/YYYY h:mm a"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                right: 0,
                top: 4,
                marginLeft: 0,
                marginRight: 15
              },
              dateInput: {
                marginLeft: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 0
              }
              // ... You can check the source to find the other keys.
            }}
            iconSource={images.ic_clock}
            onDateChange={date => {
              this.setState({ date: date });
            }}
          />
          {this.state.groupList.map((item, index) => {
            return this.renderRow(item, index);
          })}
        </View>

        <Button
          style={styles.recommendBtnView}
          onPress={this.onClickedRecommend}
        >
          <Label style={styles.recommedTxt}>RECOMMEND</Label>
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
    groups: state.user.groups
  };
}
export default connect(mapStateToProps)(recommendGroup);
