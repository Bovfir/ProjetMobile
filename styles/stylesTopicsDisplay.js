import {StyleSheet} from "react-native";

export const stylesTopicsDisplay = StyleSheet.create({
    scrollContainer: {
        marginTop: 0,
        marginBottom: 0,
    },
    titleContainer: {
        margin: 15,
        alignSelf:'flex-start'
    },
    title: {
        color: 'black',
        marginLeft: 10,
        fontSize: 24,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        wordWrap: 'break-word',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent:'center',
        alignContent:'center'
    },
    content: {
        flex: 1,
        alignItems: 'center',
    }
});
