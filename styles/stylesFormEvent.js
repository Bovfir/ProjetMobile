import { StyleSheet } from "react-native";

export const styleFormEvent = StyleSheet.create({
    iconBack: {
        position: 'absolute',
        top: 36,
        left: 15,
        zIndex: 10,
    },
    viewCreateText: {
        width: '30%',
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginTop: 10,
        justifyContent: 'center',
    },
    createEvent: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontWeight: '600',
    },
    containerCenterImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    viewImage: {
        borderWidth: 1,
        borderColor: '#E7E1E1',
        width: '85%',
        height: 135,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
    },
    viewTopic: {
        width: '30%',
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginTop: 15,
        justifyContent: 'center',
    },
    viewTopicText: {
        fontSize: 14,
        fontWeight: 450
    },
    containerName: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    viewName: {
        width: '85%',
        height: 40,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        backgroundColor: '#FFF',
    },
    nameInput: {
        fontSize: 14,
        color: 'black',
        textAlignVertical: 'center',
        flex: 1,
        paddingVertical: 0,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#E7E1E1', 
        borderRadius: 5,
        height: 40, 
    },
    iconLocation: {
        width: 30,
        height: 30,
        backgroundColor: '#4B0082',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 10
    },
    viewDescription: {
        alignSelf: 'center',
        width: '85%',
        marginTop: 5,
    },
    toggleDescriptionButton: {
        alignSelf: 'flex-start',
    },
    addDescription: {
        color: '#4B0082',
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 5,
    },
    row: {
        flexDirection: 'row', 
        width: '100%', 
        marginBottom: 10, 
    },
    viewDateTimeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    viewRectangle: {
        width: '85%',
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    label: {
        marginRight: 10,
        alignSelf: "center"
        
    },
    viewTextInputDate: {
        width: '35%',  
        height: 30,
        borderColor: '#E7E1E1',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        marginRight:10,
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
        paddingRight: 10,
    },

    viewTextInputTime: {
        width: '28%',  
        height: 30,
        borderColor: '#E7E1E1',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
        paddingRight: 10,
    },

    dateAndIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        width: '100%' 
    },
    scrollCategories: {
        width: '85%',
        marginTop: 10,
        marginLeft: 25,
    },
    cardCategory: {
        backgroundColor: "#4B0082",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
        width: 53,
        height: 53,
        borderRadius: 8,
        marginRight: 10, 
        marginBottom: 10,
        paddingVertical: 3,
    },
    textCategory: {
        color: "white",
        fontSize: 12,
        textAlign: "center",
    },
    viewTypeContainer: {
        width: '30%',
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginTop: 0,
        justifyContent: 'center',
    },
    containerPublicPrivate: {
        width: "60%",
        height: 29,
        borderColor: '#E7E1E1',
        borderWidth: 1,
        backgroundColor: '#E7E1E1',
        borderRadius: 10,
        marginLeft: 30,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row'
    },
    viewPublic: {
        width: "50%",
        height: 27,
        backgroundColor: '#E7E1E1',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    viewPrivate: {
        width: "50%",
        height: 27,
        backgroundColor: '#E7E1E1',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    textDefaultType: {
        textAlign: 'center',
        color: '#A6A6A6'
    },
    selectedBackgroundType: {
        backgroundColor: 'white'
    },
    selectedTextType: {
        color: 'black',
    },
    containerButton: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 20,
    },
    viewButtonCreateEvent: {
        width: '60%',
    },
    buttonCreateEvent: {
        backgroundColor: "#4B0082",
        borderRadius: 8
    },
    scrollContainerInvitation: {
        flexDirection: 'row',
        marginVertical: 8,
    },
    chip: {
        marginRight: 8,
        height: 32,
    },
    chipText: {
        fontSize: 12,
    },
    helpText : {
        marginLeft: 30, 
        width: 170 
    }
});
