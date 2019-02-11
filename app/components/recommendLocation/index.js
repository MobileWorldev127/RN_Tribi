import { Label, Thumbnail, View } from "native-base";
import React, { Component } from "react";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import getDirections from "react-native-google-maps-directions";
import call from "react-native-phone-call";
import { connect } from "react-redux";
import styles from "./styles";

const { width, height } = Dimensions.get("window");
class recommendLocation extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null
    };
  }
  trunc(text) {
    if (!text) return "No description";
    let maxlen = 250;
    return text.length > maxlen ? `${text.substr(0, maxlen)}...` : text;
  }
  address(formattedAddress) {
    let str = "";
    for (let i = 0; i < formattedAddress.length; i++) {
      str += formattedAddress[i] + " ";
    }
    return str;
  }
  getPhone(phone) {
    if (!phone) return phone;
    let text = phone;
    text = text.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    return text;
  }
  callPhone = phone => {
    if (!phone) return;
    const args = {
      number: phone, // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    call(args).catch(console.error);
  };
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      error => {
        console.log("error->");
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
  handleGetDirections = latlng => {
    let source = {
      latitude: latlng.latitude,
      longitude: latlng.longitude
    };
    if (this.state.lat) {
      source = {
        latitude: this.state.lat,
        longitude: this.state.lng
      };
    }
    const data = {
      source: source,
      destination: {
        latitude: latlng.latitude,
        longitude: latlng.longitude
      },
      params: [
        {
          key: "travelmode",
          value: "driving" // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate" // this instantly initializes navigation using the given travel mode
        }
      ]
    };

    getDirections(data);
  };
  render() {
    console.log(this.props.venue);
    return (
      <View style={styles.container}>
        <Label style={styles.modaltitle}>{this.props.venue.name}</Label>
        <Label style={styles.modalcategory}>{this.props.venue.category}</Label>
        <TouchableOpacity
          onPress={() => this.callPhone(this.props.venue.phone)}
        >
          <Label style={styles.modalcontact}>
            {this.getPhone(this.props.venue.phone)}
          </Label>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.handleGetDirections(this.props.venue.latlng)}
        >
          <Label style={styles.modalcontact}>
            {this.address(this.props.venue.address)}
          </Label>
        </TouchableOpacity>
        <Label style={styles.modaldescription}>
          {this.trunc(this.props.venue.description)}
        </Label>
        <View style={styles.modalImageView}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {this.props.venue.photos.map(function(item) {
              return (
                <Thumbnail
                  square
                  source={{ uri: item.url }}
                  style={styles.modalImage}
                />
              );
            })}
          </ScrollView>
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

export default connect()(recommendLocation);
