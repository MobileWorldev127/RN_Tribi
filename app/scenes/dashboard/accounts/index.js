import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Header, Left, Right, Body
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { 
    Animated, Keyboard, AsyncStorage, TextInput, TouchableOpacity, ScrollView
} from 'react-native';
import styles from './styles';
import { BallIndicator } from 'react-native-indicators'
import images from '../../../themes/images'

var searchList = [
    {name: 'Joshua Francis', city: 'Toronto', avatar: images.ic_avatar1},
    {name: 'Den Potapov', city: 'Kyiv', avatar: images.ic_avatar2},
    {name: 'Joshua Francis', city: 'Toronto', avatar: images.ic_avatar1},
    {name: 'Den Potapov', city: 'Kyiv', avatar: images.ic_avatar2},
    {name: 'Joshua Francis', city: 'Toronto', avatar: images.ic_avatar1},
]

class accounts extends Component<{}>{
    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props){
        super(props);
        this.state = {
            searchWord: '',
            isLoading: false
        }
    }
    
    componentWillMount() {
    }

    renderRow(item, index){
        return(
            <View style = {styles.rowView} key = {index}>
                <Thumbnail square source = {item.avatar} style = {styles.userImg}/>
                <View>
                    <Label style = {styles.nametxt}>{item.name}</Label>
                    <Label style = {styles.citytxt}>{item.city}</Label>
                </View>
                <View style = {styles.underLine}/>
            </View>
        )
    }

    onClickedProfile(){
        var { dispatch } = this.props;
        dispatch(NavigationActions.navigate({routeName: 'userProfile'}));
    }

    render(){
        return (
            <View style={styles.container}>
                <Thumbnail square source = {images.ic_home_backgroundImage} style = {styles.signInBackgroundImg}/>
                <Header style = {styles.header}>
                    <Left>
                        <Button transparent>
                            <Thumbnail square source = {images.ic_men} style = {styles.menuImg}/>
                        </Button>
                    </Left>
                    <Body>
                        <Label style = {styles.screentitle}>SEARCH</Label>
                    </Body>
                    <Right>
                        <Button transparent onPress = {() => this.onClickedProfile()}>
                            <Thumbnail square source = {images.ic_avatar} style = {styles.avatarImg}/>
                        </Button>
                    </Right>
                </Header>
                <Content style = {styles.mainContainer} showsVerticalScrollIndicator = {false}>
                    <View style = {styles.searchView}>
                        <Thumbnail square source = {images.ic_searchbox_backgroundImage} style = {styles.searchBackgroundImg}/>
                        <Thumbnail square source = {images.ic_search} style = {styles.searchImg}/>
                        <TextInput
                            ref = 'username'
                            style = {styles.inputTxt}
                            onChangeText = { text => this.setState({ searchWord: text })}
                            value = {this.state.searchWord}
                            placeholder = "Start typing"
                            placeholderTextColor = "#4a6187"
                            autoCapitalize = 'none'
                            autoCorrect = {false}
                        />
                    </View>
                    <View style = {styles.listView}>
                        {
                            searchList.map((item, index) => {
                                return(this.renderRow(item, index))
                            })
                        }
                    </View>
                </Content>
            </View>
        );

    }
}

export default connect()(accounts);