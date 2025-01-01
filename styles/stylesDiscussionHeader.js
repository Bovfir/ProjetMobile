import { StyleSheet } from "react-native";


export const styleDiscussionHeader = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: '#CDCDCD',
    },
    gap: {
        height: 30,
    },
    content: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    iconContainer: {
        position: 'absolute',
        left: 15,
        padding: 10,
        zIndex: 1,  
    },
    titleWrapper: {
        marginHorizontal: 70,
        flex: 1,
        justifyContent: 'baseline',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});