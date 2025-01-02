import { StyleSheet } from "react-native";

export const stylesHeader = StyleSheet.create({
    title: {
        fontSize: 32,
        color: '#4B0082',
        fontFamily: 'BrunoAceSC',
        textAlign: 'center',
        borderColor:'transparent',
        borderWidth:1 
    },
    slogan: {
        fontSize: 12,
        color: 'black',
        fontFamily: 'BrunoAceSC',
        textAlign: 'center', 
        borderColor:'transparent',
        borderWidth:1 
    },
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: 10,
        backgroundColor: 'transparent',
        height: 70,
        margin: '4%',
        marginTop: 40,
    },
    textBox: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'transparent',
        borderWidth:1
    },
});
