import { Body, Button, Content, Header, Label, Left, Right, Thumbnail, View } from "native-base";
import React, { Component } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import { BallIndicator } from "react-native-indicators";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { getFavorites } from "../../../actions";
import images from "../../../themes/images";
import styles from "./styles";
const { width, height } = Dimensions.get("window");

class favorite extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
      favoriteList: [],
      isLoading: false
    };
  }

  componentWillMount() {
    this.setState({ isLoading: true });
    getFavorites(this.props.user._id).then(res => {
      this.setState({ isLoading: false });
      if (res.success) {
        this.setState({
          favoriteList: res.data
        });
      } else {
        this.refs.errortoast.show(res.error.message, DURATION.LENGTH_LONG);
      }
    });
  }
  starImgFromRating(item) {
    if (item.tips.length == 0) return images.ic_star0;
    let tip = item.tips[0];
    let agree = tip.agreeCount;
    let disagree = tip.disagreeCount;
    if (agree == 0) {
      return images.ic_star0;
    }
    let rate = Math.ceil((agree * 5) / (agree + disagree));
    let rateimgarr = [
      images.ic_star0,
      images.ic_star1,
      images.ic_star2,
      images.ic_star3,
      images.ic_star4,
      images.ic_star5
    ];

    return rateimgarr[rate];
  }
  ratingFromItem(item) {
    if (item.tips.length == 0) return 0;
    let tip = item.tips[0];
    let agree = tip.agreeCount;
    let disagree = tip.disagreeCount;
    if (agree == 0) {
      return 0;
    }
    let rate = Math.ceil((agree * 5) / (agree + disagree));
    return rate;
  }
  onFavorite(item) {
    var { dispatch } = this.props;
    let locationparam = {
      id: item.id,
      name: item.name,
      latlng: item.latlng
    };
    dispatch({ type: "changeVenuesOfLocation", data: [item] });
    dispatch(
      NavigationActions.navigate({
        routeName: "location",
        params: { isModal: true }
      })
    );
  }

  renderRow(item, index) {
    return (
      <TouchableOpacity onPress={() => this.onFavorite(item)} key={index}>
        <View style={styles.rowView}>
          <Thumbnail
            square
            source={item.photos[0]}
            style={styles.locationImg}
          />
          <View style={{ flex: 1 }}>
            <View style={styles.subtitleView}>
              <Label style={styles.nametxt}>{item.name}</Label>
              <View style={{ flexDirection: "row" }}>
                <Thumbnail
                  square
                  source={this.starImgFromRating(item)}
                  style={styles.starImg}
                />
                <Label style={styles.ratingtxt}>
                  {this.ratingFromItem(item)}
                </Label>
              </View>
            </View>

            <Label style={styles.citytxt}>{item.category}</Label>
            <Label style={styles.descriptiontxt}>{item.description}</Label>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  onClickedProfile() {
    var { dispatch } = this.props;
    dispatch(NavigationActions.navigate({ routeName: "userProfile" }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Thumbnail
          square
          source={images.ic_home_backgroundImage}
          style={styles.signInBackgroundImg}
        />
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate("DrawerOpen");
              }}
            >
              <Thumbnail square source={images.ic_men} style={styles.menuImg} />
            </Button>
          </Left>
          <Body>
            <Label style={styles.screentitle}>FAVOURITES</Label>
          </Body>
          <Right>
            <Button transparent onPress={() => this.onClickedProfile()}>
              <Thumbnail
                square
                source={{ uri: this.props.user.photo }}
                style={styles.avatarImg}
              />
            </Button>
          </Right>
        </Header>
        <Content
          style={styles.mainContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.listView}>
            {this.state.favoriteList.map((item, index) => {
              return this.renderRow(item, index);
            })}
          </View>
          {this.state.isLoading ? (
            <BallIndicator color={"#2B3643"} style={styles.loadingBar} />
          ) : null}
        </Content>
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
  return { user: state.user.userInfo };
}
export default connect(mapStateToProps)(favorite);
