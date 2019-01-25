import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default{
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    child: {
        // height: height,
        // width,
        // justifyContent: 'center',
        flex: 1
    },
    text: {
        fontSize: width * 0.5,
        textAlign: 'center',
    },
    tutorialImg: {
        resizeMode: 'stretch',
        // position: 'absolute',
        // top: 0,
        // left: 0,
        width: width,
        height: height
    },
    buttonTxt: {
        color: 'white',
        fontFamily: "Lato-Regular",
    },
}