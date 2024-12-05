import {Text,TouchableOpacity, StyleSheet} from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";


export function RegisterButton({onPress}){
    return(
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        flex:1,
        borderColor:'#4B0082',
        borderWidth:1,
        borderRadius:20,
        justifyContent:'center'
    },
    text:{
        color:'#4B0082',
        textAlign:'center',
        fontSize:20
    }
})