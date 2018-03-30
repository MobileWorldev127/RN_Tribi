import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default{

    container: {
        flex: 1,
        width: width - 50,
        justifyContent: 'flex-start',
        padding: 25
    },
    modaltitle: {
        color: '#4a6187',
        fontSize: 18,
        fontFamily: "Lato-Bold",
        marginTop: 15,
    },
    modalcategory: {
        color: '#d0d4dd',
        fontSize: 12,
        fontFamily: "Lato-Regular",
        marginTop: 10
    },
    modaldescription: {
        color: '#4a6187',
        fontSize: 12,
        fontFamily: "Lato-Regular",
        marginTop: 30
    },
    modalImageView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    modalImage: {
        width: (width - 110)/2,
        height: 105,
        resizeMode: 'contain',
    }
}