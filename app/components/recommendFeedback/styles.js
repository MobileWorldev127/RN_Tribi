import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default{
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
        marginTop: 15
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
        marginTop: 15,
        paddingRight: 5,
        flexWrap: "wrap"
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
    }
}