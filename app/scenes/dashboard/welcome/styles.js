import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default{
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: width,
        height: height,
        justifyContent: 'center',
    },
    child: {
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: width * 0.5,
        textAlign: 'center',
    },
    tutorialImg: {
        resizeMode: 'stretch',
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height
    },
    welcomeImg: {
        width: width * .8,
        height: width * 1.1 ,
        resizeMode: 'contain',
        marginBottom: height/15,
    },
    backgroundImg: { 
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0,
        resizeMode: 'stretch'
    },
    buttonTxt: {
        color: 'white',
        fontFamily: "Lato-Regular",
    },
    activeDot: {
        backgroundColor:'#33e098', 
        width: 10, 
        height: 10,
        borderRadius: 5, 
        marginLeft: 4, 
        marginRight: 4, 
        marginTop: 4, 
        marginBottom: 14,
        shadowOpacity: 0.9,
        shadowRadius: 6,
        shadowColor: '#33e098',
        shadowOffset: { height: 0, width: 0 },
    },
    dot: {
        backgroundColor:'#4a6187', 
        width: 10, 
        height: 10,
        borderRadius: 5,  
        marginLeft: 4, 
        marginRight: 4, 
        marginTop: 4, 
        marginBottom: 14,
    },
    skipBtn: {
        position: 'absolute',
        top: 50,
        right: 50
        // backgroundColor: 'red'
    },
    skipTxt: {
        color: '#33e098',
        fontSize: 17
    },
    startBtn: {
        width: width * .6,
        height: 55,
        backgroundColor: '#33e098',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        ...ifIphoneX ({
            bottom: 90,
        },{
            bottom: 65,
        }),
        
        left: width * .2
    },
    startTxt: {
        fontSize: 18,
        color: 'white'
    }
}