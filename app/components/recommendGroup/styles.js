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
        // justifyContent: 'flex-end'
    },
    datepickerView: {
        width: '100%',
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
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: 'lightgray'
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