import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default{
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        ...ifIphoneX ({
            paddingBottom: 60,
        },{
            paddingBottom: 50,
        }),
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
        justifyContent: 'space-between',
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
    rowView: {
        backgroundColor: 'white',
        width: width - 50,
        borderRadius: 5,
        padding: 20,
        paddingLeft: 12,
        shadowColor: '#4a6187',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.4,
        shadowRadius: 5,
        alignItems: 'center'
    },
    groupTitle: {
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
    makeView: {
        width: width - 50,
        height: 55,
        backgroundColor: '#33e098',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
   makeTxt: {
       color: 'white',
       fontSize: 15,
       fontFamily: "Lato-Regular",
   },
}