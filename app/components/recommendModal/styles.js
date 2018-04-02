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
        height: 380,
        backgroundColor: 'white',
        justifyContent: 'flex-end'
    },
    modaltitle: {
        color: '#4a6187',
        fontSize: 18,
        fontFamily: "Lato-Bold",
    },
    modalcategory: {
        color: '#d0d4dd',
        fontSize: 12,
        fontFamily: "Lato-Regular",
        marginTop: 10
    },
    modaldescription: {
        color: '#4a6187',
        fontSize: 12,
        fontFamily: "Lato-Regular",
        marginTop: 20
    },
    modalImageView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15
    },
    modalImage: {
        width: (width - 110)/2,
        height: 105,
        resizeMode: 'contain',
    },
    tabView: {
        width: width-50,
        height: 50,
        flexDirection: 'row'
    },
    tabBtn: {
        width: (width - 50)/2,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabIcon: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
        marginBottom: 10
    },
    tabBackgroundImg: {
        tintColor:'#33e098',
        width: (width - 50)/2,
        height: 30,
        resizeMode: 'stretch',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    tabBackgroundImg1: {
        width: 0,
        height: 0,
        resizeMode: 'stretch',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    heartImg: {
        width: 85,
        height: 85,
        resizeMode: 'contain',
        position: 'absolute',
        top: -40,
        right: 10,
    },
    recommendBtnView: {
        width: width - 50,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 25,
        marginTop: 25,
        backgroundColor: '#33e098'
    },
    recommedTxt: {
        color: 'white'
    },
    blankView: {
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0
    }
}