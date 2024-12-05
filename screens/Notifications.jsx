import { Text, View, TouchableOpacity, ScrollView, Touchable} from 'react-native';
import styles from '../styles/stylesNotif';
import {Ionicons } from '@expo/vector-icons';
import {Notification} from '../components/Notification'
import { Header } from '../components/Header';

export default function  Notifications(){
    return(
        <View style={styles.container}>
            <Header title={'Notifications'} backButton={true}/>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
   
            </ScrollView>
        </View>
    )
}