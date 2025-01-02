import { Text, View,TouchableOpacity,TouchableWithoutFeedback, Animated, Alert, Vibration} from 'react-native';
import {stylesExplore} from '../../styles/stylesExplore'
import { Feather, MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/Header';
import { useNavigation,useIsFocused  } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import * as API from '../../API/index';
import {Button,Card} from "react-native-paper";
import { AuthContext } from '../../utils/AuthContext';
import Toast from 'react-native-toast-message';
import { URLImage } from '../../API/APIUrl';
import { showToast } from '../../utils/utils';

export default function Profile(){
    const [userInfo, setUserInfo] = useState({});
    const [nbEventFollowed,setNbEventFollowed] = useState(0);
    const [nbEventCreated, setNbEventCreated] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [slideAnim] = useState(new Animated.Value(300));


    const { logout } = useContext(AuthContext);
    const handleLogout = async () => {
        try {
            await logout(); 
            Toast.show({
                type: 'success',
                text1: 'Logout successful',
                text2: 'You are now logged out.',
            });
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Log out error',
                text2: 'An error has occurred. Please try later.',
            });
        }
    };

    useEffect(()=>{
        getUserInfo();
        getNbEventFollowed();
        getNbEventCreated();
    },[isFocused])

    const getNbEventFollowed = async()=>{
        try {
            const response = await API.getNbEventUser();
            setNbEventFollowed(response); 
        } catch(error) {
            showToast('error','Recovery error','An error occurred while retrieving the number of event followed');
        }
    }

    const getNbEventCreated = async()=>{
        try {
            const response = await API.getNbEventCreated();
            setNbEventCreated(response);
        } catch (error) {
            showToast('error','Recovery error','An error occurred while retrieving the number of event created');
        }
    }

    const getUserInfo = async()=>{
        try {
            const response = await API.getInfoUser();
            setUserInfo(response);
        } catch (error) {
            showToast('error','Error','Something went wrong. Please try again later.');
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

        const deleteAccount = async () => {
            try {
                await API.deleteAccount();
                await handleLogout(); 
                Vibration.vibrate(500);
                showToast('success','Account deleted','Your account has been deleted.')
            } catch (error) {
                showToast("error",'Deletion error','An error occurred while deleting the account.');
            }
        };
        

        const showAlert = () => {
            Alert.alert(
              "Account deletion", 
              "This action will be irreversible !", 
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Confirmation ',
                  onPress:() => deleteAccount(),
                },
              ],
              { cancelable: false }
            );
          };
        

    return (
        <View style={stylesExplore.container}>
{/*---------------------------------Header-------------------*/}
            <Header title={'Profile'} subTitle={'Where event come to life'} notificationButton={true} navigation={navigation} />
{/*---------------------------------Image + name + counter-------------------*/}
            <View style={stylesExplore.profileNameImage}>
                <TouchableOpacity style={stylesExplore.optionBox} onPress={openModal}>
                    <Ionicons name="options" style={stylesExplore.optionIcon}/>
                </TouchableOpacity>
                <Card style={stylesExplore.boxImage}>
                    <Card.Cover source={{ uri: `${URLImage}/${userInfo.picture_path}` }} style={stylesExplore.image}/>
                </Card>
                <View>
                    <Text style={stylesExplore.textNameProfile}>{userInfo.last_name} {userInfo.first_name}</Text>
                    <Text style={stylesExplore.textPseudoProfile}>@{userInfo.user_name}</Text>
                </View>
                <View style={stylesExplore.counterLine}></View>
                <View style={stylesExplore.boxCounter}>
                <View style={stylesExplore.counter}>
                    <Text style={stylesExplore.textCounter}>{nbEventFollowed}</Text>
                    <Text style={stylesExplore.textCounter}>Events subscribed</Text>
                </View>
                <View style={stylesExplore.boxCounterSeparation}></View>
                <View style={stylesExplore.counter}>
                    <Text style={stylesExplore.textCounter}>{nbEventCreated}</Text>
                    <Text style={stylesExplore.textCounter}>Events created</Text>
                </View>
                </View>
                <View style={stylesExplore.counterLineBottom}></View>
            </View> 
{/*---------------------------------buttons-------------------*/}
            <View style={stylesExplore.boxButton}>
                <TouchableOpacity style={stylesExplore.profileButton} onPress={() => navigation.navigate('UserForm',{registration: false, data: userInfo})}>
                        <Feather name="edit" style={stylesExplore.profileButtonIcon}/>
                        <Text>Edit Profile</Text>
                </TouchableOpacity>
                <View style={stylesExplore.emptySpaceButton}></View>
                <TouchableOpacity style={stylesExplore.profileButton} size onPress={() => navigation.navigate('My Event',{screen: "MyEventSubscribed"})}>
                    <MaterialCommunityIcons name="calendar-month-outline" style={stylesExplore.profileButtonIcon}/>
                    <Text>My Event</Text>
                </TouchableOpacity>
            </View>
{/*---------------------------------Description-------------------*/}
            <Text style={stylesExplore.descriptionTitle}>About Me</Text>
            <View style={stylesExplore.boxDescirption}>
                <Text>{userInfo.bio}</Text>
            </View>


            {modalVisible && (
            <TouchableWithoutFeedback onPress={handleOutsideClick}>
                <Animated.View style={[stylesExplore.modalOverlay, { transform: [{ translateY: slideAnim }] }]}>
                    <View style={stylesExplore.modalContainer}>
                    <Text style={stylesExplore.modalTitle}>Options</Text>

                    <Button
                        mode="contained-tonal"
                        buttonColor={"rgba(255, 0, 0, 0.5)"}
                        textColor='white'
                        icon="logout"
                        onPress={handleLogout}
                        style={stylesExplore.modalButton}
                    >
                        Log Out
                    </Button>

                    <Button
                        mode="contained-tonal"
                        buttonColor={"rgba(255, 0, 0, 0.5)"}
                        textColor='white'
                        icon="delete"
                        onPress={showAlert}
                        style={stylesExplore.modalButton}
                    >
                        Delete account
                    </Button>
                    
                    <TouchableOpacity style={stylesExplore.closeModalButton} onPress={closeModal}>
                        <Text style={stylesExplore.closeButtonText}>Fermer</Text>
                    </TouchableOpacity>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        )}
        </View>
    )
}