import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Dimensions } from 'react-native';
import {mapPropsToStyleNames} from 'native-base';
const { width, height } = Dimensions.get('window');

export default{
    modalView: {
       width: width,
       height: height,
       alignItems: 'center',
       justifyContent: 'flex-end',
       backgroundColor: 'rgba(0, 0, 0, 0.6)',
       paddingBottom: 40,
    },
    modalMainView: {
        width: width - 50,
        height: 380,
        backgroundColor: 'white',
        paddingTop: 10
        // justifyContent: 'flex-end'
    },
    datepickerView: {
        width: '100%',
    },
    userImg: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 30,
        marginRight: 20
    },
    blankView: {
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0
    },
    recommendBtnView: {
        width: width - 50,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 25,
        marginTop: 25,
        backgroundColor: '#33e098'
    },
    recommedTxt: {
        color: 'white'    
    },
    rowView: {
        flex: 1,
        flexDirection: 'row',
        // paddingTop: 25,
        // paddingBottom: 25,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderColor: 'lightgray'
    },
    groupIcon: {
        width: 34,
        height: 34,
        resizeMode: 'cover',
        borderRadius: 17,
        marginRight: 20
    },
    groupName: {
        color: '#4a6187',
        fontSize: 16,
    },
    groupMembers: {
        color: 'lightgray',
        fontSize: 12,
        marginTop: 5,
    },
    checkIcon: {
        width: 32,
        height: 32,
    }
}