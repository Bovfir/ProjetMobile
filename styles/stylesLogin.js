import { StyleSheet } from "react-native";

export const stylesLogin = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    formBox:{
        height:'50%',
        marginLeft:'5%',
        marginRight:'5%',
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        width:'80%',
        height:32,
        marginTop:10
    },
    input:{
        width:'90%',
        borderWidth:1,
        borderColor:'#4B0082',
        borderRadius:10,
        marginTop:10
    },
    error:{
        width:'90%',
        color:'red',
    },
})