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
        justifyContent: 'flex-start',
        padding: 25,
        paddingBottom: 30,
        height: height,
    },
    label1: {
        fontSize: 15,
        color: '#4a6187',
        textAlign: 'center',
        marginTop: 70
    },
    label2: {
        fontSize: 13,
        color: '#4a6187',
        textAlign: 'center',
        marginTop: 28
    },
    inputEmailView: {
        width:  width - 50,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 37
    },
    userImg: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginLeft: -10,
        marginTop: 5,
    },
    inputTxt: {
        flex: 1,
        color: '#4a6187',
        fontFamily: "Lato-Regular",
        paddingTop: 0,
        paddingBottom: 0,
        height: 40,
        fontSize: 16,
    },
    line: {
        height: 2,
        backgroundColor: 'white'
    },
    resetView: {
        width: width - 50,
        height: 55,
        backgroundColor: '#33e098',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 45
    },
   resetTxt: {
       color: 'white',
       fontSize: 15,
       fontFamily: "Lato-Regular",
   },
   signUpView: {
       flexDirection: 'row',
       width: width - 50,
       alignItems: 'center',
       justifyContent: 'center',
       marginTop: 15,
   },
   label3: {
       fontSize:  14,
       color: '#a2afc5',
       fontFamily: "Lato-Regular",
   },
   label4: {
       fontSize: 14,
       color: '#4a6187',
       fontFamily: "Lato-Regular",
   },
   backImg: {
       width: 16,
       height: 16,
       resizeMode: 'contain',
       marginRight: 5,
       tintColor: '#a2afc5'
   }
}