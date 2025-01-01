import { StyleSheet} from 'react-native';


export const stylesDiscussionChat = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        backgroundColor:'white'
    },
    content : {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});