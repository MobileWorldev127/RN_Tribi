import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default{
    container: {
        backgroundColor: 'white'
    },

    signInBackgroundImg: {
        position: 'absolute',
        width: width,
        height: height,
        top: 0,
        left: 0,
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 25,
        paddingBottom: 35,
        height: height,
    },
    maplocationImg: {
        width: 140,
        height: 140,
        resizeMode: 'contain',
        ...ifIphoneX ({
            marginBottom: 100
        },{
            marginBottom: 10
        }),
    },
    label1: {
        color: '#4a6187',
        fontSize: 24,
        fontFamily: "Lato-Bold",
        textAlign: 'center',
        marginTop: 120,
    },
    label2: {
        color: '#4a6187',
        fontSize: 15,
        fontFamily: "Lato-Regular",
        textAlign: 'center',
        marginTop: 37,
    },
    nextView: {
        width: width - 50,
        height: 55,
        backgroundColor: '#33e098',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
   nextTxt: {
       color: 'white',
       fontSize: 15,
       fontFamily: "Lato-Regular",
   },
   subView1: {
       height: height/2,
       alignItems: 'center',
       justifyContent: 'flex-end',
       marginTop: 50
   },
   subView2: {
       height: height/2,
       alignItems: 'center',
       justifyContent: 'flex-end',
   }
}