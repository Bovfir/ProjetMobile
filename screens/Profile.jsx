import { Text, View,TouchableOpacity,TouchableWithoutFeedback,  Image, Animated, Alert} from 'react-native';
import styles from '../styles/styleExploreProfile'
import { Feather, MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { useNavigation,useIsFocused  } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import * as APIConnection from '../API/getApi';
import {Button} from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile(){
    const [userInfo, setUserInfo] = useState({});
    const [nbEventFollowed,setNbEventFollowed] = useState(0);
    const [nbEventCreated, setNbEventCreated] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [slideAnim] = useState(new Animated.Value(300));

    const checkAuthToken = async () => {
        const token = await APIConnection.getToken();
        if (!token) {
            console.log('No token found, redirecting to Connection page');
            navigation.navigate('Connection');
        }
    };

    useEffect(()=>{
        checkAuthToken();
        getUserInfo();
        getNbEventFollowed();
        getNbEventCreated();
    },[isFocused])

    const getNbEventFollowed = async()=>{
        const response = await APIConnection.getNbEventUser();
        setNbEventFollowed(response);
    }

    const getNbEventCreated = async()=>{
        const response = await APIConnection.getNbEvetnCreated();
        setNbEventCreated(response)
    }

    const getUserInfo = async()=>{
        const response = await APIConnection.getInfoUser();
        if(response === "JWT Expired"){
            navigation.navigate('Connection');
        }else{
            setUserInfo(response);
        }
    }

        const openModal = () => {
            setModalVisible(true);
            Animated.timing(slideAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start();
        };
        
        const closeModal = () => {
        Animated.timing(slideAnim, {
            toValue: 300,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setModalVisible(false));
        };

        const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
        };

        const logOut = async () =>{
            try {
                await AsyncStorage.removeItem('jwtToken');
                navigation.replace('Connection');
                console.log('Token supprimé avec succès');
              } catch (error) {
                console.error('Erreur lors de la suppression du token', error);
              }
        }

        const deleteAccount = async () => {
            await APIConnection.deleteAccount();
            logOut();
        }

        const showAlert = () => {
            Alert.alert(
              "Supression du compte", 
              "Cette action sera irréversible!", 
              [
                {
                  text: 'Annuler',
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress:() => deleteAccount(),
                },
              ],
              { cancelable: false }
            );
          };
        

    return (
        <View style={styles.container}>
{/*---------------------------------Header-------------------*/}
            <Header title={'Profile'} subTitle={'Where event come to live'} notificationButton={true}/>
{/*---------------------------------Image + name + counter-------------------*/}
            <View style={styles.profileNameImage}>
                <TouchableOpacity style={styles.optionBox} onPress={openModal}>
                    <Ionicons name="options" style={styles.optionIcon}/>
                </TouchableOpacity>
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


            {modalVisible && (
            <TouchableWithoutFeedback onPress={handleOutsideClick}>
                <Animated.View style={[styles.modalOverlay, { transform: [{ translateY: slideAnim }] }]}>
                    <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Options</Text>

                    <Button
                        mode="contained-tonal"
                        buttonColor={"rgba(255, 0, 0, 0.5)"}
                        textColor='white'
                        icon="logout"
                        onPress={logOut}
                        style={styles.modalButton}
                    >
                        Log Out
                    </Button>

                    <Button
                        mode="contained-tonal"
                        buttonColor={"rgba(255, 0, 0, 0.5)"}
                        textColor='white'
                        icon="delete"
                        onPress={showAlert}
                        style={styles.modalButton}
                    >
                        Delete account
                    </Button>
                    
                    <TouchableOpacity style={styles.closeModalButton} onPress={closeModal}>
                        <Text style={styles.closeButtonText}>Fermer</Text>
                    </TouchableOpacity>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        )}
        </View>
    )
}