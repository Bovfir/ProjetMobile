import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity, ScrollView, Image, Touchable} from 'react-native';
import styles from '../styles/styles'
import { Feather, MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';

export default function Profile(){
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
{/*---------------------------------Header-------------------*/}
            <Header title={'Profile'} subTitle={'Where event come to live'} notificationButton={true} backButton={true}/>
{/*---------------------------------Image + name + counter-------------------*/}
            <View style={styles.profileNameImage}>
                <View style={styles.boxImage}>
                    <Image source={require('../assets/test.jpg')} style={styles.image}/>
                </View>
                <View style={styles.boxNamePseudo}>
                    <Text style={styles.textNameProfile}>Darlene Robertson</Text>
                    <Text style={styles.textPseudoProfile}>@robertson_darlene</Text>
                </View>
                <View style={styles.counterLine}></View>
                <View style={styles.boxCounter}>
                <View style={styles.counter}>
                    <Text style={styles.textCounter}>20</Text>
                    <Text style={styles.textCounter}>Events created</Text>
                </View>
                <View style={styles.boxCounterSeparation}></View>
                <View style={styles.counter}>
                    <Text style={styles.textCounter}>43</Text>
                    <Text style={styles.textCounter}>Events participated</Text>
                </View>
                </View>
                <View style={styles.counterLineBottom}></View>
            </View> 
{/*---------------------------------buttons-------------------*/}
            <View style={styles.boxButton}>
                <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('UserForm')}>
                        <Feather name="edit" style={styles.profileButtonIcon}/>
                        <Text>Edit Profile</Text>
                </TouchableOpacity>
                <View style={styles.emptySpaceButton}></View>
                <TouchableOpacity style={styles.profileButton} size>
                    <MaterialCommunityIcons name="calendar-month-outline" style={styles.profileButtonIcon}/>
                    <Text>My Event</Text>
                </TouchableOpacity>
            </View>
{/*---------------------------------Description-------------------*/}
            <Text style={styles.descriptionTitle}>About Me</Text>
            <View style={styles.boxDescirption}>
                <Text>I live for unforgettable Lover of joyful moments and celebrations, I live for unforgettable parties and festive vibes.</Text>
            </View>
        </View>
    )
}