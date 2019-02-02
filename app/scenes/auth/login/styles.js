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
        paddingBottom: 30,
        height: height,
    },
    inputUsernameView: {
        width:  width - 50,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImg: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginLeft: -10
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
        // flex: 1,
        height: 2,
        backgroundColor: 'white'
    },
    inputPasswordView: {
        width:  width - 50,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25
    },
    signinView: {
        width: width - 50,
        height: 55,
        backgroundColor: '#33e098',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
   signinTxt: {
       color: 'white',
       fontFamily: "Lato-Regular",
   },
   signUpView: {
       flexDirection: 'row',
       width: width - 50,
       alignItems: 'center',
       justifyContent: 'center',
       marginTop: 10,
   },
   label1: {
       fontSize:  14,
       color: '#a2afc5',
       fontFamily: "Lato-Regular",
   },
   label2: {
       fontSize: 14,
       color: '#4a6187',
       fontFamily: "Lato-Regular",
   },
   facebookView:{
        width: width - 50,
        height: 55,
        backgroundColor: 'transparent',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#4a6187',
        alignItems: 'center',
        justifyContent: 'center',
   },
   facebookTxt: {
       fontSize:  15,
       color: '#4a6187',
       fontFamily: "Lato-Regular",
   },
   forgotTxt: {
       fontSize: 14,
       color: '#33e098',
       fontFamily: "Lato-Regular",
       textDecorationLine : 'underline',
   },
   loadingBar: {
       position: 'absolute',
       top: height/3,
       left: (width-40)/2,
   }
}