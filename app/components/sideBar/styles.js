import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

export default {
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    menuProfileView: {
        backgroundColor: 'white',
        height: 120,
        alignItems: 'center',
        padding: 20,
        flexDirection: 'row'
    },
    avartarImg: {
        width: 70,
        height: 70,
        resizeMode: 'cover',
        borderRadius: 35,
        marginTop: 10,
        marginRight: 15,

    },
    nameTxt:{
        fontSize: 16,
        color: '#4a6187',
        fontFamily: "Lato-Regular",
        marginTop: 8
    },
    emailTxt: {
        fontSize: 15,
        color: '#4a6187',
        fontFamily: "Lato-Regular",
        marginTop: 5
    },
    menuView:{
        flex: 1, 
        backgroundColor: 'transparent', 
    },
    logTxt: {
        fontSize: 17,
        color: '#33e098',
    }
}