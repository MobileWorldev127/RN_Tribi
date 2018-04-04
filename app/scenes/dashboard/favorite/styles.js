import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default{
    container: {
        flex: 1,
        // height: height,
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
        width: width,
        paddingTop: 10
    },
    listView: {
        paddingLeft: 25,
        paddingRight: 25,
        width: width - 50,
        marginTop: -10
    },
    rowView: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: width - 50,
        borderRadius: 5,
        padding: 20,
        paddingLeft: 12,
        marginTop: 25,
        shadowColor: '#4a6187',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 5
    },
    locationImg: {
        width: 75,
        height: 58,
        resizeMode: 'cover',
        borderRadius: 4,
        marginRight: 15
    },
    nametxt: {
        color: '#4a6187',
        fontSize: 15,
        fontFamily: "Lato-Bold",
    },
    citytxt: {
        marginTop: 5,
        color: '#ccd1da',
        fontSize: 12,
        fontFamily: "Lato-Regular",
    },
    descriptiontxt: {
        marginTop: 15,
        color: '#4a6187',
        fontSize: 12,
        fontFamily: "Lato-Regular",
    },
    subtitleView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    starImg: {
        width: 13,
        height: 13,
        marginRight: 5
    },
    ratingtxt: {
        color: '#4a6187',
        fontSize: 12,
        fontFamily: "Lato-Regular",
    }
}