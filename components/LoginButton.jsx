import {Text,TouchableOpacity, StyleSheet} from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";


export function LoginButton({onPress}){
    return(
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        flex:1,
        backgroundColor:'#4B0082',
        borderRadius:20,
        justifyContent:'center'
    },
    text:{
        color:'white',
        textAlign:'center',
        fontSize:20
    }
})