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
    mainContainer: {
        width: width,
        padding: 25,
        paddingBottom: 50,
        flex: 1,
        alignItems: 'center',
        ...ifIphoneX ({
            marginBottom: 50,
        },{
            marginBottom: 30,
        }),
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
        marginRight: 10
    },
    screentitle: {
        ...ifIphoneX ({
            color: '#4a6187',
            fontSize: 18,
            fontFamily: "Lato-Bold",
        },{
            color: '#4a6187',
            fontSize: 16,
            fontFamily: "Lato-Bold",
        }), 
    },
    aboutView: {
        backgroundColor: 'white',
        width: width - 50,
        borderRadius: 5,
        padding: 20,
        paddingLeft: 12,
        shadowColor: '#4a6187',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.4,
        shadowRadius: 5,
        alignItems: 'center',
        marginTop: 40
    },
    userName: {
        fontSize: 15,
        color: '#4a6187',
        fontFamily: "Lato-Bold",
        marginTop: 20
    },
    userCity: {
        fontSize: 12,
        color: 'gray',
        fontFamily: "Lato-Regular",
        marginTop: 5,
    },
    userAbout: {
        fontSize: 13,
        color: '#4a6187',
        fontFamily: "Lato-Regular",
        marginTop: 25,
        textAlign: 'center',
        marginBottom: 30
    },
    userImg: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 50,
        marginTop: -70
    },
    editImg: {
        width: 63,
        height: 63,
        resizeMode: 'contain',
        marginTop: -30
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