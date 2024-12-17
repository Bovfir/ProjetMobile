import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity, ScrollView, Image, Touchable} from 'react-native';
import styles from '../styles/styles'
import { Feather, MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import * as APIConnection from '../API/getApi';

export default function Profile(){
    const [userInfo, setUserInfo] = useState({});
    const [nbEventFollowed,setNbEventFollowed] = useState(0);
    const [nbEventCreated, setNbEventCreated] = useState(0);

    const navigation = useNavigation()

    useEffect(()=>{
        getUserInfo();
        getNbEventFollowed();
    },[])

    const getNbEventFollowed = async()=>{
        const response = await APIConnection.getNbEventUser();
        setNbEventFollowed(response);
    }

    const getNbEvetnCreated = async()=>{
        const response = await APIConnection.getNbEvetnCreated();
        setNbEventCreated(response)
    }

    const getUserInfo = async()=>{
        const response = await APIConnection.getInfoUser();
        setUserInfo(response);
    }

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
                    <Text style={styles.textNameProfile}>{userInfo.last_name} {userInfo.first_name}</Text>
                    <Text style={styles.textPseudoProfile}>@{userInfo.user_name}</Text>
                </View>
                <View style={styles.counterLine}></View>
                <View style={styles.boxCounter}>
                <View style={styles.counter}>
                    <Text style={styles.textCounter}>{nbEventCreated}</Text>
                    <Text style={styles.textCounter}>Events created</Text>
                </View>
                <View style={styles.boxCounterSeparation}></View>
                <View style={styles.counter}>
                    <Text style={styles.textCounter}>{nbEventFollowed}</Text>
                    <Text style={styles.textCounter}>Events participated</Text>
                </View>
                </View>
                <View style={styles.counterLineBottom}></View>
            </View> 
{/*---------------------------------buttons-------------------*/}
            <View style={styles.boxButton}>
                <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('UserForm',{registration: false, data: userInfo})}>
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
                <Text>{userInfo.bio}</Text>
            </View>
        </View>
    )
}