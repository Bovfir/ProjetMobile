import { StyleSheet } from "react-native";

export const stylesMessage = StyleSheet.create({
    messageWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        paddingHorizontal: 10,
    },
    currentUserWrapper: {
        flexDirection: 'row-reverse',
    },
    avatar: {
        marginHorizontal: 8,
    },
    currentUserAvatar: {
        marginHorizontal: 8,
    },
    messageContainer: {
        flex: 1,
    },
    bubble: {
        backgroundColor: '#d4c2e1', 
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        maxWidth: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    currentUserBubble: {
        backgroundColor: '#a37dbf', 
        alignSelf: 'flex-end',
    },
    user: {
        fontSize: 12,
        fontWeight: '600',
        color: '#555',
        marginBottom: 5,
    },
    content: {
        fontSize: 14,
        fontWeight: '400',
        color: 'black',
        lineHeight: 18,
    },
});
