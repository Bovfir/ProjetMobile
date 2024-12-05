import {Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet, View,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export  function Header({title, subTitle, backButton, notificationButton, titleSize, subTitleSize, distanceTop}){
    const navigation = useNavigation()

    return(
        <View style={[styles.container, distanceTop && {marginTop: distanceTop}]}>
            <TouchableOpacity onPress={() => backButton && navigation.goBack()}>
            <Ionicons name='arrow-back' color={backButton? 'black' : 'white'} size={35}/>
            </TouchableOpacity>
            <View style={styles.textBox}>
            <Text style={[styles.title,titleSize && {fontSize:titleSize}]}>{title}</Text>
            <Text style={[styles.slogan,subTitleSize && {fontSize:subTitleSize}]}>{subTitle}</Text>
            </View>
            <TouchableOpacity  onPress={() => notificationButton && navigation.navigate('Notifications')}>
                    <Ionicons color={notificationButton? 'black' : 'white'} size={30} name='notifications-outline' />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: '#4B0082',
        fontFamily: 'BrunoAceSC',
        textAlign:'center',
        textAlignVertical:'center'
      },
      slogan: {
          fontSize: 12,
          color: 'black',
          fontFamily: 'BrunoAceSC',
          textAlign:'center'
    },
    container: {
        flexDirection:'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'transparent',
        justifyContent:'flex-start',
        height:70,
        margin:'4%',
        marginTop:40,
    },
    textBox:{
        flex:1,
    }

})