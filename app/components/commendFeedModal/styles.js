import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Dimensions } from 'react-native';
import {mapPropsToStyleNames} from 'native-base';
const { width, height } = Dimensions.get('window');

export default{
    modalView: {
       width: width,
       height: height,
       alignItems: 'center',
       justifyContent: 'flex-end',
       backgroundColor: 'rgba(0, 0, 0, 0.6)',
       paddingBottom: 40,
    },
    modalMainView: {
        width: width - 50,
        height: height - 125,
        backgroundColor: 'white',
        borderRadius: 4,
    },
    blankView: {
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0
    },
    inactiveTxt: {
        fontSize: 14, 
        color: '#4a6187',
        fontFamily: "Lato-Regular",
    },
    activeTxt: {
        fontSize: 14, 
        color: '#4a6187',
        fontFamily: "Lato-Regular",
    },
    tabicon: {
        width: 18,
        height: 17,
        resizeMode: 'contain'
    },
    tabtxt: {
        fontSize: 14, 
        color: '#4a6187',
        fontFamily: "Lato-Regular",
    },
    rowView: {
        flexDirection: 'row',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: 'rgba(135, 136, 146, 0.15)',
        justifyContent: 'space-between',
    },
    userImg: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
        borderRadius: 10,
        marginRight: 15
    },
    label1: {
        color: '#b3bbc7',
        fontSize: 14
    },
    label2: {
        color: '#4a6187',
        fontSize: 14,
        marginTop: 5
    },
}