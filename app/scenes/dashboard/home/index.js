import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Content, ody, Text, Thumbnail, Button, Footer, View, Label, Item, Input, Header, Left, Right, 
  Body
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { 
    Animated, Keyboard, AsyncStorage, TextInput, TouchableOpacity, ScrollView
} from 'react-native';
import styles from './styles';
import { BallIndicator } from 'react-native-indicators'
import images from '../../../themes/images'

var popularList = [
    {name: 'ALMONDO AIRES'},
    {name: 'WALK WEST'},
    {name: 'ALMONDO AIRES'},
    {name: 'WALK WEST'},
];

var categories = [
    {name: 'Sport', icon: images.ic_sport, value: 69},
    {name: 'Travel', icon: images.ic_travel, value: 17},
    {name: 'Music', icon: images.ic_music, value: 20},
    {name: 'Sport', icon: images.ic_sport, value: 69},
]

var groupList = [
    {name: 'My Familiy', value: 10},
    {name: 'Workers', value: 20},
]

class home extends Component<{}>{
    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoading: false
        }
    }
    
    componentWillMount() {
    }

    onCreateGroup(){
        this.props.navigation.navigate('NewGroup')
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
                    <Right>
                        <Button transparent>
                            <Thumbnail square source = {images.ic_avatar} style = {styles.avatarImg}/>
                        </Button>
                    </Right>
                </Header>
                <View style = {styles.mainContainer}>
                    <Label style = {styles.popularTxt}>POPULAR NEAR ME</Label>
                    <View style = {styles.subScrollView}>
                        <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false} style = {{paddingLeft: 25}}>
                            {
                                popularList.map((item, index) => {
                                    return(
                                        <View style = {styles.popularView} key = {index}>
                                            <Label style = {styles.popularItemTxt}>{item.name}</Label>
                                        </View>
                                    )
                                })
                            }
                            <View style = {styles.blankView}/>
                        </ScrollView>
                    </View>
                    
                    <Label style = {styles.categoryTxt}>CATEGORIES</Label>
                    
                    <View style = {styles.subScrollView}>
                        <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false} style = {{paddingLeft: 25}}>
                            {
                                categories.map((item, index) => {
                                    return(
                                        <View style = {styles.popularView} key = {index}>
                                            <Label style = {styles.categoryItemTxt}>{item.name}</Label>
                                            <View style = {styles.subCategoryView}>
                                                <Thumbnail square source = {item.icon} style = {styles.categoryIcon}/>
                                                <Label style = {styles.categoryItemValue}>{item.value}</Label>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                            <View style = {styles.blankView}/>
                        </ScrollView>
                    </View>

                    <Label style = {styles.categoryTxt}>MY GROUPS</Label>

                    <View style = {{marginTop: 20, height: 145}}>
                        <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false}>

                            <Button transparent style = {styles.addView} onPress = {() => this.onCreateGroup()}>
                                <Thumbnail square source = {images.ic_addGroupBtn} style = {styles.addImg}/>
                            </Button>
                            {
                                groupList.map((item, index) => {
                                    return(
                                        <View style = {styles.groupView} key = {index}>
                                            <Label style = {styles.groupItemName}>{item.name}</Label>
                                            <Label style = {styles.groupItemValue}>{item.value}</Label>
                                            <View style = {styles.barView}/>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>

                    

                </View>
            </View>
        );

    }
}

export default connect()(home);