import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, Text } from 'react-native';
import { stylesHeader } from "../styles/stylesHeader";

export default function Header({ title, subTitle, backButton, notificationButton, navigation, titleSize, subTitleSize, distanceTop }) {
    return (
        <View style={[stylesHeader.container, distanceTop && { marginTop: distanceTop }]}>
            
            <TouchableOpacity onPress={() => backButton ? navigation.goBack() : ''}>
                <Ionicons name='arrow-back' color={backButton ? 'black' : 'white'} size={30} />
            </TouchableOpacity>
        
            <View style={stylesHeader.textBox}>
                <Text style={[stylesHeader.title, titleSize && { fontSize: titleSize }]}>{title}</Text>
                <Text style={[stylesHeader.slogan, subTitleSize && { fontSize: subTitleSize }]}>{subTitle}</Text>
            </View>
            
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                <Ionicons color={notificationButton ? 'black' : 'white'} size={30} name='notifications-outline' />
            </TouchableOpacity>
        </View>
    );
};
