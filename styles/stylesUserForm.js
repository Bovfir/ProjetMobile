import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";


export const stylesUserForm = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#FFFFFF'
    },

    submit:{
        backgroundColor: '#8e47c2',
        height:'7%',
        justifyContent:'center',
        borderRadius:15
    },
    titleContainer:{
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        width: '80%',
        marginTop: 0,
        marginBottom:10,
        margin:'5%'
    },
    text: {
        color: 'black',
        width:'80%',
        fontFamily: 'Inter',
        fontWeight: '700',
        fontSize: 16,
        marginTop:10
    },
    containerCenterImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    image:{
        width: 120, 
        height: 120, 
        borderRadius: 60, 
        resizeMode: 'cover'
    },
    viewImage: {
        width: 120,
        height: 120,
        borderRadius: 160, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#E7E1E1',
        borderWidth:1,
        overflow: 'hidden',
    },
    avatarImage: {
        width: 120,
        height: 120,
        borderRadius: 60, 
        resizeMode: 'cover',
    },
    formInput:{
        height:'7%'
    },
    blankZone:{
        height:30
    },
    inPutHeight:{
        height:100,
    },
    scrollZone:{
        margin:'5%'
    }
});