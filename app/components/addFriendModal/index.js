import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Content,
  ody,
  Text,
  Thumbnail,
  Button,
  Footer,
  View,
  Label,
  Item,
  Input,
  Header,
  Left,
  Right,
  Body
} from "native-base";
import { NavigationActions } from "react-navigation";
import {
  Animated,
  Keyboard,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal
} from "react-native";
import DatePicker from "react-native-datepicker";
import styles from "./styles";
import images from "../../themes/images";
import { getAllMembers } from "../../actions";
var Contacts = require("react-native-contacts");
var available_phone_lables = [
  "home",
  "work",
  "iphone",
  "phone",
  "mobile",
  "main"
];
var contacts = [
  { name: "Design Community", members: 12, isSelected: false },
  { name: "Sport Community", members: 4, isSelected: false },
  { name: "Music Community", members: 7, isSelected: false },
  { name: "Travel Community", members: 10, isSelected: false },
  { name: "Design Community", members: 12, isSelected: false }
];
function debounce(a, b, c) {
  var d, e;
  return function() {
    function h() {
      (d = null), c || (e = a.apply(f, g));
    }
    var f = this,
      g = arguments;
    return (
      clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e
    );
  };
}

class addFriendModal extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      searchWord: "",
      originalContact: [],
      contacts: [],
      existingPhones: []
    };
  }

  componentWillMount() {
    Contacts.getAll((err, contacts) => {
      let sortedcontacts = contacts.sort(function(a, b) {
        let name_stra = a.givenName + " " + a.familyName;
        let name_strb = b.givenName + " " + b.familyName;
        return name_stra > name_strb;
      });
      if (err) throw err;
      this.setState({
        contacts: sortedcontacts,
        originalContact: sortedcontacts
      });
    });
    getAllMembers().then(res => {
      if (res.success) {
        this.setState({
          existingPhones: res.phones
        });
      }
    });
  }
  isappuser(phonenumber) {
    let filteredNumber = "";
    for (let i = 0; i < phonenumber.length; i++) {
      let c = phonenumber.charAt(i);
      if (c == "+" || (c >= "0" && c <= "9")) {
        filteredNumber += c;
      }
    }
    let firstletter = filteredNumber.charAt(0);
    if (firstletter != "+") {
      filteredNumber = "+1" + filteredNumber;
    }
    console.log(this.state.existingPhones.indexOf(filteredNumber));
    return this.state.existingPhones.indexOf(filteredNumber) > -1;
  }
  onSelectContact(item, index) {
    if (item.isSelected) {
      this.state.contacts[index]["isSelected"] = false;
      this.setState({ modalVisible: true });
    } else {
      this.state.contacts[index]["isSelected"] = true;
      this.setState({ modalVisible: true });
    }
  }
  onClickedAddMembers = () => {
    let phonenumbers = [];
    this.state.contacts.map(c => {
      if (c["isSelected"]) {
        let contactphonenumbers = c.phoneNumbers;
        let mobilephonenumber = "";
        // contactphonenumbers.map((pnumber)=>{
        //     // if (available_phone_lables.indexOf(pnumber.label.toLowerCase())>-1){
        //         mobilephonenumber = pnumber.number
        //     // }
        // })
        mobilephonenumber = contactphonenumbers[0].number;
        console.log(mobilephonenumber);
        // mobilenumber filtering
        let filteredNumber = "";
        for (let i = 0; i < mobilephonenumber.length; i++) {
          let c = mobilephonenumber.charAt(i);
          if (c == "+" || (c >= "0" && c <= "9")) {
            filteredNumber += c;
          }
        }
        let firstletter = filteredNumber.charAt(0);
        if (firstletter != "+") {
          filteredNumber = "+1" + filteredNumber;
        }
        if (filteredNumber.length > 7) {
          phonenumbers.push(filteredNumber);
        }
      }
    });
    if (phonenumbers.length == 0) {
      this.refs.errortoast.show(
        "There is no available phone in selected",
        DURATION.LENGTH_LONG
      );
      return;
    }
    this.props.onAddMembers(phonenumbers);
  };
  renderRow(item, index) {
    if (item.phoneNumbers.length == 0) return null;
    let name_str = item.givenName + " " + item.familyName;
    let city_str = "Unknown";
    if (item.postalAddresses.length > 0) {
      city_str = item.postalAddresses[0].city;
    }
    let image_str = images.ic_photo_default;
    if (item.hasThumbnail) {
      image_str = item.thumbnailPath;
    }
    return (
      <View style={styles.rowView} key={index}>
        {item.hasThumbnail ? (
          <Thumbnail
            square
            source={{ uri: image_str }}
            style={styles.userImg}
          />
        ) : (
          <Thumbnail square source={image_str} style={styles.userImg} />
        )}
        <View>
          <Label style={styles.groupName}>{name_str}</Label>
          <Label style={styles.groupMembers}>
            {this.isappuser(item.phoneNumbers[0].number)
              ? "Hey, I'm using Tribi"
              : "Invite me to join Tribi"}
          </Label>
        </View>
        <TouchableOpacity onPress={() => this.onSelectContact(item, index)}>
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
  onSearch = debounce(searchTerm => {
    let originalContacts = this.state.originalContact;
    let filteredContacts = originalContacts.filter(contact => {
      let name_str = contact.givenName + " " + contact.familyName;
      return name_str.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
    });
    this.setState({
      contacts: filteredContacts
    });
  }, 300);
  render() {
    return (
      <View style={styles.modalView}>
        <TouchableOpacity
          style={styles.blankView}
          onPress={this.props.onClickedBack}
        />

        <View style={styles.modalMainView}>
          <TextInput
            ref="username"
            style={styles.inputTxt}
            onChangeText={text => this.onSearch(text)}
            value={this.state.searchWord}
            placeholder="Start typing"
            placeholderTextColor="#4a6187"
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid = "transparent"
          />
          <ScrollView vertical={true} showsHorizontalScrollIndicator={false}>
            {this.state.contacts.map((item, index) => {
              return this.renderRow(item, index);
            })}
          </ScrollView>
        </View>
        <Button
          style={styles.recommendBtnView}
          onPress={this.onClickedAddMembers}
        >
          <Label style={styles.recommedTxt}>Add Members</Label>
        </Button>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(addFriendModal);
