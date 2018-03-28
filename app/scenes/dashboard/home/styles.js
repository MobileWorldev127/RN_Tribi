import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default{
    container: {
        flex: 1,
        height: height,
        backgroundColor: 'transparent'
    },
    signInBackgroundImg: {
        position: 'absolute',
        width: width,
        height: height,
        top: 0,
        left: 0,
    },
    mainContainer: {
        height: height,
        // ...ifIphoneX ({
        //     marginTop: 100
        // },{
        //     marginTop: 65
        // })
        
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
    popularTxt: {
        color: '#4a6187',
        fontFamily: "Lato-Bold",
        marginTop: 10,
        marginLeft: 35,
        ...ifIphoneX ({
            fontSize: 23,
        },{
            fontSize: 18,
        }),
    },
    categoryTxt: {
        color: '#4a6187',
        fontFamily: "Lato-Bold",
        marginTop: 10,
        marginLeft: 35,
        ...ifIphoneX ({
            fontSize: 23,
            marginTop: 15
        },{
            fontSize: 18,
            marginTop: -5
        }),
    },
    popularView:{
        width: 136,
        height: 112,
        borderRadius: 5,
        backgroundColor: 'white',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#4a6187',
        shadowOpacity: 0.5,
        shadowRadius: 15,
        shadowOffset: {height: 10, width: 10},
    },
    addView: {
        width: 136,
        height: 112,
        borderRadius: 5,
        backgroundColor: 'transparent',
        marginLeft: 25,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popularItemTxt: {
        color: '#4a6187',
        fontSize: 15,
    },
    addImg: {
        width: 118,
        height: 118,
        resizeMode: 'contain',
    },
    subScrollView: {
        marginTop: 20, 
        height: 145
    },
    blankView: {
        width: 25, 
        backgroundColor: 'transparent'
    },
    categoryItemTxt: {
        color: '#4a6187',
        fontSize: 13,
        fontFamily: "Lato-Bold",
        textAlign: 'right',
        width: 96,
        marginTop: 20
    },
    subCategoryView: {
        flexDirection: 'row',
        width: 96,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: -10
    },
    categoryIcon: {
        width: 68,
        height: 68,
        resizeMode: 'contain',
        marginLeft: -10,
        marginTop: 10
    },
    categoryItemValue: {
        color: '#4a6187',
        fontSize: 18,
        fontFamily: "Lato-Bold",
    },
    groupView: {
        width: 136,
        height: 112,
        borderRadius: 5,
        backgroundColor: 'white',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
        shadowColor: '#4a6187',
        shadowOpacity: 0.5,
        shadowRadius: 15,
        shadowOffset: {height: 10, width: 10},
        padding: 20
    },
    groupItemName: {
        color: '#b877d0',
        fontSize: 13,
        fontFamily: "Lato-Bold",
        textAlign: 'right',
    },
    groupItemValue: {
        color: '#b877d0',
        fontSize: 18,
        fontFamily: "Lato-Bold",
        textAlign: 'right',
        marginTop: 20
    },
    barView: {
        position: 'absolute',
        top: 5,
        left: 5,
        height: 102,
        width: 2,
        backgroundColor: '#b877d0',
    },
    label2: {
       fontSize: 14,
       color: '#4a6187',
       fontFamily: "Lato-Regular",
   },
}