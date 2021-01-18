import { StyleSheet, Dimensions } from 'react-native';

export const MainStyle = StyleSheet.create({
    GameBase: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    ImageBg: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    Background: {
        flex: 1,
        resizeMode: 'contain'
    }
})