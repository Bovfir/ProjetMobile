import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";


const styles = StyleSheet.create({
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
    text:{
        fontSize: RFPercentage(2),
        color: '#4B0082',
        margin:'5%'
    },
    boxImage:{
        flex:1,
        aspectRatio:1,
        borderWidth:1,
        borderRadius:9999,
        overflow: 'hidden',
        elevation:50,
    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode: 'cover'
    },
    profileImage:{
        height:'15%',
        justifyContent: 'center',
        alignItems:'center',
        marginBottom:'5%',
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
})
export default styles;