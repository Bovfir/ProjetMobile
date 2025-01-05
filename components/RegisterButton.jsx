import {Text,TouchableOpacity} from 'react-native';
import { stylesRegisterButton } from '../styles/stylesRegisterButton';

export default function RegisterButton({onPress}){
    return(
        <TouchableOpacity style={stylesRegisterButton.button} onPress={onPress}>
            <Text style={stylesRegisterButton.text}>Register</Text>
        </TouchableOpacity>
    )
};