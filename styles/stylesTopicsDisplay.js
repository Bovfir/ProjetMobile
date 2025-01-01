import {StyleSheet} from "react-native";

export const stylesTopicsDisplay = StyleSheet.create({
    scrollContainer: {
        marginTop: 0,
        marginBottom: 0,
    },
    titleContainer: {
        margin: 15,
        alignSelf: 'flex-start'
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
        justifyContent: 'center',
        alignContent: 'center'
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    buttonPlus: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        backgroundColor: '#4B0082',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        zIndex: 999,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond sombre pour effet pop-up
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: '100%',  
    },
    button: {
        marginTop: 20,
        backgroundColor: '#4B0082',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-between',
        width: '100%',
    },
    switchLabel: {
        fontSize: 16,
        color: 'black',
    },
});
