import {Text,TouchableOpacity} from 'react-native';
import {stylesLoginButton} from '../styles/stylesLoginButton';


export function LoginButton({onPress}){
    return(
        <TouchableOpacity style={stylesLoginButton.button} onPress={onPress}>
            <Text style={stylesLoginButton.text}>Login</Text>
        </TouchableOpacity>
    )
};