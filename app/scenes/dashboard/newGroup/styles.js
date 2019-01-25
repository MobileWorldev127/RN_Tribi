import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default{
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        // ...ifIphoneX ({
        //     paddingBottom: 60,
        // },{
        //     paddingBottom: 50,
        // }),
    },
    signInBackgroundImg: {
        position: 'absolute',
        width: width,
        height: height,
        top: 0,
        left: 0,
    },
    header: {
        backgroundColor: 'transparent',
        elevation: 0,
        borderBottomWidth: 0,
        marginTop: 5
    },
    menuImg: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
        marginLeft: 15,
    },
    avatarImg: {
        width: 44,
        height: 44,
        resizeMode: 'cover',
        borderRadius: 22,
        marginTop: 10,
        marginRight: 10
    },
    screentitle: {
        color: '#4a6187',
        fontFamily: "Lato-Bold",
        marginLeft: 5,
        ...ifIphoneX ({
            fontSize: 18,
        },{
            fontSize: 16,
        }),  
    },
    mainContainer: {
        flex: 1,
        width: width,
        padding: 25,
        paddingBottom: 50,
        justifyContent: 'space-between'
    },
    generaltxt: {
        color: '#33e098',
        fontSize: 15,
        marginLeft: 10,
        marginTop:  10,
        fontFamily: "Lato-Regular",
    },
    nametxt: {
        color: '#4a6187',
        fontSize: 10,
        marginTop: 15,
        marginLeft: 10,
        fontFamily: "Lato-Regular",
    },
    inputTxt: {
        // flex: 1,
        color: '#4a6187',
        fontFamily: "Lato-Regular",
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 15,
        marginTop: 10,
        marginLeft: 10,
    },
    underline: {
        backgroundColor: 'white',
        width: width,
        height: 2,
        marginTop: 10
    },
    friendtxt: {
        color: '#4a6187',
        fontSize: 10,
        marginTop: 20,
        marginLeft: 10,
        fontFamily: "Lato-Regular",
    },
    friendsubView: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addfriendImg: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        borderRadius: 12, 
    },
    friendTxt: {
        flex: 1,
        color: '#4a6187',
        fontFamily: "Lato-Regular",
        fontSize: 14,
        marginLeft: 10,
    },
    notificationtxt: {
        color: '#33e098',
        fontSize: 15,
        marginLeft: 10,
        marginTop:  50,
        fontFamily: "Lato-Regular",
    },
    emailsubView: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    createView: {
        width: width - 50,
        height: 55,
        backgroundColor: '#33e098',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        ...ifIphoneX ({
            marginBottom: 50,
        },{
            marginBottom: 30,
        }),
    },
   createTxt: {
       color: 'white',
       fontFamily: "Lato-Regular",
   },







   tabView: {
        width: width,
        ...ifIphoneX ({
            height: 60,
            bottom: 10,
        },{
            height: 50,
            bottom: 0,
        }),        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        backgroundColor: 'transparent'
    },
    tabBtn: {
        width: width/4,
        height: 60,
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
        width: width/4,
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
    
}