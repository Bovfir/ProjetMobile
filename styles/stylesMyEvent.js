import { StyleSheet} from 'react-native';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 25,
        color: '#4B0082',
        fontFamily: 'BrunoAceSC'
    },
    textBox: {
        width: '70%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'transparent',
    },
    textBoxSearch: {
        width: '85%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        position: 'relative',
    },
    textInput: {
        flex: 1, 
        fontSize: 14,
        color: 'black',
        height: 40, 
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        paddingVertical: 0, 
        justifyContent: 'center', 
    },
    buttonContainer: {
        marginLeft: 10,
    },
    buttonStyle: {
        backgroundColor: '#4B0082',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    cardStyle: {
        width: '85%',
        height: 239,
        marginVertical: 20,
        backgroundColor: '#FFFFFF',
        marginRight: 10,
        marginLeft:10,
        marginBottom: 5,
        position:'relative',
    },
    cardCover: {
        height: '50%',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    cardContent: {
        height: '50%',
        alignItems: 'right',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    cardContentTitle: {
        color: 'black', 
        fontFamily: 'Inter', 
        fontSize: 16, 
        fontWeight: '700', 
        lineHeight: 18, 
        textAlign: 'left',
        marginTop: 5,
        marginBottom: 5,
    },
    iconCardRight: {
        position: 'absolute',
        top: 3,
        right: 5,
        width: 40,
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius : 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    },
    iconCardLeft: {
        position: 'absolute',
        top: 10,  
        left: 10, 
        width: 40, 
        height: 40, 
        backgroundColor: '#4B0082', 
        borderRadius: 5, 
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, 
    },
    locationContainer: {
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        width: '100%',
        marginBottom: 3,
    },
    locationTextCity: {
        color: '#878787',
        fontFamily: 'Inter',
        fontSize: 10,
        fontWeight: '200',
        lineHeight: 20,
        textAlign: 'left',
    },
    viewHoritonzalBar : {
        width: '80%',
        height: 1,
        backgroundColor: '#CECBCB',
        alignSelf: 'center',
        marginBottom: 5
    },
    viewBottonsBottom: {
        height: 30,
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        paddingTop: 5
    },
    buttonFollowContainer: {
        width: 157,
        height: 32,
        borderRadius: 10,
    },
    buttonFollowStyle :{
        backgroundColor: 'white',
        borderColor: '#820DD8',
        borderWidth: 1, 
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingVertical: 0, 
        height: '100%',
    },
    buttonFollowTitle: {
        fontSize: 18, 
        color: '#820DD8', 
        textAlign: 'center', 
        lineHeight: 20, 
        paddingTop:2
    },
    buttonAccessChat: {
        width: 48,
        height: 32,
        backgroundColor: '#4B0082',
        borderRadius: 10,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding:0
    },
    buttonDelete: {
        width: 48,
        height: 32,
        backgroundColor: '#4B0082',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding:0
    },
    buttonAddEvent: {
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
    }
});



export const stylesButton = StyleSheet.create({
    viewTypeEventContainer: {
        borderColor: '#F0F0F0',
        borderWidth: 1,
        height: 39,
        width: '85%',
        marginTop: 20,
        borderRadius: 10,
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    buttonTypeStyle: {
        width: '50%', 
        height: 37,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createdButtonStyle: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    subscribedButtonStyle: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    selectedButton: {
        backgroundColor: 'transparent',
    },
    unselectedButton: {
        backgroundColor: '#f0f0f0',
    },
    textSubscribed: {
        fontSize: 16,
        fontWeight: 400,
    },
    selectedText: {
        fontWeight: 400,
        color: 'black',
    },
    unselectedText: {
        color: '#878787',
        fontWeight: 500
    },
});