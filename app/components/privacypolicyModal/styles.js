import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default{

    modalView: {
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingBottom: 40,
     },
    container: {
        flex: 1,
        width: width - 50,
        justifyContent: 'flex-start',
        padding: 25,
    },
    modaltitle: {
        color: '#4a6187',
        fontSize: 18,
        fontFamily: "Lato-Bold",
        marginTop: 15,
        textAlign: 'center'
    },
    modalcategory: {
        color: '#d0d4dd',
        fontSize: 12,
        fontFamily: "Lato-Regular",
        marginTop: 10,
        marginBottom: 15,
    },
    modaldescription: {
        color: '#4a6187',
        fontSize: 12,
        fontFamily: "Lato-Regular",
        marginTop: 15
    },
    modaldeFeedbackDate: {
        color: '#4a6187',
        fontSize: 12,
        fontFamily: "Lato-Bold",
        marginTop: 5,
    },
    modalImageView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15
    },
    modalMainView: {
        width: width - 50,
        height: 380,
        padding: 20,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    modalImage: {
        width: (width - 110)/2,
        height: 105,
        resizeMode: 'contain',
    },
    starValueImg: {
        width: 61,
        height: 12,
        resizeMode: 'contain'
    },
    eachFeedbackView: {
        marginBottom: 25,
    },
    blankView: {
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0
    }
}