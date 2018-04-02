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
        height: 420,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 25,
        paddingBottom: 5
    },
    modaltitle: {
        fontSize: 15,
        color: '#4a6187',
        fontFamily: "Lato-Bold",
    },
    countmemberTxt: {
        fontSize: 12,
        color: 'gray',
        fontFamily: "Lato-Regular",
        marginTop: 5,
    },
    groupImg: {
        width: 152,
        height: 34,
        resizeMode: 'contain',
        marginTop: 20
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
    voteBtnView: {
        width: width - 50,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 25,
        marginTop: 60,
        backgroundColor: '#33e098'
    },
    voteTxt: {
        color: 'white'
    },
    blankView: {
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0
    },
    aboutView: {
        width: width - 100,
        paddingTop: 0,
        paddingBottom: 30,
        borderRadius: 20,
        marginTop: 40,
        borderWidth: 1.5,
        borderColor: '#33e098',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarImg: {
        width: 38,
        height: 38,
        resizeMode: 'cover',
        borderRadius: 19,
        marginTop: -20,
    },
    label1: {
        color: '#4a6187',
        fontSize: 14,
        marginTop: 10
    },
    locationImg: {
        width: 40,
        height: 21,
        resizeMode: 'contain',
        tintColor: '#33e098',
        backgroundColor: 'white',
        marginTop: -12
    },
    fingView: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    likeImg: {
        width: 42,
        height: 42,
        resizeMode: 'contain',
    },
    inputView: {
        borderTopWidth: 1,
        borderColor: '#ededef',
        
        width: width - 50,
        height: 60,
        marginTop: 30,
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 5,
    },
    textInput: {
        fontSize: 14,
        color: 'black',
        flex: 1,
    }
}