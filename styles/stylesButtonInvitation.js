import { StyleSheet } from "react-native";

export const stylesButtonInvitation = StyleSheet.create({
    invitationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4B0082',
        borderRadius: 15,
        width: 30,
        height: 30,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        borderColor: '#4B0082',
        borderWidth: 1,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#4B0082',
    },
    modalInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    addButton: {
        backgroundColor: '#4B0082',
        borderRadius: 20, 
        width: 40,         
        height: 40,        
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,    
    },
    scrollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    chip: {
        marginRight: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
});
