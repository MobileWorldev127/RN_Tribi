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
    groupIcon: {
        flexDirection: 'row',
        paddingLeft: 5
    },
    memberIcon: {
        width: 34,
        height: 34,
        resizeMode: 'cover',
        borderRadius: 17,
        marginTop:10,
        marginLeft: -10
    },
    mainContainer: {
        width: width,
        padding: 25,
        paddingRight: 30,
        paddingBottom: 50,
        flex: 1,
    },
    header: {
        backgroundColor: 'transparent',
        elevation: 0,
        borderBottomWidth: 0,
        marginTop: 5
    },
    addfriendTouch: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    leaveGroupTouch: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    addfriendImg: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        borderRadius: 12, 
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
        borderRadius: 20,
        marginTop: 10,
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
    groupView: {
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

    rowView: {
        flexDirection: 'row',
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    detailView: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 15,
        width: width * 4 / 7.5,
        paddingTop: 18,
        paddingBottom: 30,
        paddingLeft: 20,
        paddingRight: 20,
    },
    rowtitleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 25
    },
    locationImg: {
        width: 21,
        height: 21,
        tintColor: '#33e098',
    },
    locationImgTouchable: {
        position: 'absolute',
        right: 0
    },
    rowtitletxt: {
        color: '#4a6187',
        fontSize: 14,
    },
    rowdatetxt: {
        color: '#4a6187',
        fontSize: 14,
        marginTop: 10
    },
    voteView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        height: 38,
        borderRadius: 9,
        backgroundColor: '#33e098',
        marginBottom: 50
    },
    votetxt: {
        fontSize: 15,
        color: 'white'
    },
    fingerView: {
        width: width /2 ,
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 17,
        marginTop: -20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent'
    },
    thumbViews: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userImg: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: 25
    },
    fingerUpView: {
        width: 50,
        height: 37,
        borderTopLeftRadius: 9,
        borderBottomLeftRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginLeft: 20,
    },
    fingerDownView: {
        width: 50,
        height: 37,
        borderTopRightRadius: 9,
        borderBottomRightRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    fingerImg: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
        marginRight: 5
    },
    likeTxt: {
        color: '#4a6187',
        fontSize: 14
    },  
    
}