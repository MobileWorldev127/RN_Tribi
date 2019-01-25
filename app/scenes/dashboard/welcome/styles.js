import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default{
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    },
    backgroundImg: { 
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    buttonTxt: {
        color: 'white',
        fontFamily: "Lato-Regular",
    },
}