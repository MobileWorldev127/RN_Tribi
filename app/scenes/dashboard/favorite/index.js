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

var favoriteList = [
    {image: images.ic_favorite1, title: 'VR ARCADE', category: 'Games', description: 'Curabitur ullamcorper ultricies nisi. rhoncus. Maecenas tempus, tellus rhoncus, sem quam semper libero', rating: 3.6},
    {image: images.ic_favorite2, title: 'WENDY`S', category: 'Cafe', description: 'Curabitur ullamcorper ultricies nisi.', rating: 4.4},
    {image: images.ic_favorite1, title: 'VR ARCADE', category: 'Games', description: 'Curabitur ullamcorper ultricies nisi. rhoncus. Maecenas tempus, tellus rhoncus, sem quam semper libero', rating: 3.6},
]

class favorite extends Component<{}>{
    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
        this.state = {
        }
    }
    
    componentWillMount() {
    }

    renderRow(item, index){
        return(
            <View style = {styles.rowView} key = {index}>
                <Thumbnail square source = {item.image} style = {styles.locationImg}/>
                <View style = {{flex: 1}}>
                    <View style = {styles.subtitleView}>
                        <Label style = {styles.nametxt}>{item.title}</Label>
                        <View style = {{flexDirection: 'row'}}>
                            <Thumbnail square source = {images.ic_starRating} style = {styles.starImg}/>
                            <Label style = {styles.ratingtxt}>{item.rating}</Label>
                        </View> 
                    </View>
                    
                    <Label style = {styles.citytxt}>{item.category}</Label>
                    <Label style = {styles.descriptiontxt}>{item.description}</Label>
                </View>
            </View>
        )
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
                        <Label style = {styles.screentitle}>FAVOURITES</Label>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Thumbnail square source = {images.ic_avatar} style = {styles.avatarImg}/>
                        </Button>
                    </Right>
                </Header>
                <Content style = {styles.mainContainer} showsVerticalScrollIndicator = {false}>
                    <View style = {styles.listView}>
                        {
                            favoriteList.map((item, index) => {
                                return(this.renderRow(item, index))
                            })
                        }
                    </View>
                </Content>
            </View>
        );

    }
}

export default connect()(favorite);