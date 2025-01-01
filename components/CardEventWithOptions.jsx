import React, { useEffect, useState } from 'react';
import { Text, View, Alert, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Card, IconButton, Chip , TextInput} from 'react-native-paper';
import { MaterialCommunityIcons, SimpleLineIcons, Entypo, AntDesign, Ionicons } from '@expo/vector-icons';
import { Button } from '@rneui/themed';
import IconComponents from '../utils/IconComponents';
import { useNavigation } from '@react-navigation/native';
import { unFollowEvent as APIUnFollowEvent, deleteEvent } from "../API/index";
import { URLImage } from "../API/APIUrl";
import { showToast } from '../utils/utils';
import { stylesButtonInvitation } from "../styles/stylesButtonInvitation";
import { createInvitation,checkEmails,checkInvitation } from '../API/index';

export default function CardEventWithOptions({ event, titleButton, style, type, onRefresh, index }) {
    const navigation = useNavigation();
    const IconComponent = IconComponents[event.icon_component_name] || IconComponents.MaterialIcons;
    const [modalVisible, setModalVisible] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [emailList, setEmailList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (onRefresh) {
                await onRefresh();
            }
        };
        fetchData();
    }, []);

    const handlePress = async () => {
        if (type === "subscribed") {
            await APIUnFollowEvent(event.id);
            if (onRefresh) {
                await onRefresh();
            }
            showToast('success', 'Unsubscribe Event', 'You have unsubscribed from this event');
        } else if (type === "created") {
            navigation.navigate('FormEvent', { event: event, eventID: index + 1 });
        }
    };

    const sendInvitations = async () => {
        let response;
        if (emailList.length > 0) {
            response = await checkEmails({ emails: emailList });
            
            if(response){
                await createInvitation({ ids: response.idEmailExist, event_id: event.id});
            }
            showToast('success', 'Invitations Sent', `Invitations sent to: ${emailList.join(', ')}`);
            setEmailList([]);
            setModalVisible(false);
        } else {
            showToast('error', 'Error', 'No emails to send invitations to.');
        }
    };

    const handleAddEmail = async () => {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailRegex.test(emailInput)) {
                const exist = await checkInvitation({ email: emailInput.toLowerCase(), event_id: event.id });
    
                if (exist) {
                    showToast('error', 'Email Exists', 'This email is already linked to the event.');
                } else if (!emailList.includes(emailInput.toLowerCase())) {
                    setEmailList([...emailList, emailInput.toLowerCase()]);
                    setEmailInput('');
                } else {
                    showToast('error', 'Duplicate Email', 'This email has already been added.');
                }
            } else {
                showToast('error', 'Invalid Email', 'The email format is incorrect.');
            }
        } catch (error) {
            if (error.status === 404) {
                if (!emailList.includes(emailInput.toLowerCase())) {
                    setEmailList([...emailList, emailInput.toLowerCase()]);
                    setEmailInput('');  
                } else {
                    showToast('error', 'Duplicate Email', 'This email has already been added.');
                }
            } else {
                showToast('error', 'Error', 'An error occurred while checking the email.');
            }
        }
    };
    

    const handleRemoveEmail = (email) => {
        setEmailList(emailList.filter((e) => e !== email));
    };

    const showAlert = (id) => {
        Alert.alert(
            "Event deletion",
            "This action will be irreversible!",
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        deleteEvent(id);
                        showToast('success', 'Event Deleted', 'Your event has been successfully deleted.');
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <>
            <Card style={style.cardStyle} onPress={() => navigation.navigate('EventPresentation', { eventID: event.id })}>
                <Card.Cover source={{ uri: `${URLImage}/${event.picture_path}` }} style={style.cardCover} />
                <Card style={style.iconCardLeft}>
                    <IconComponent name={event.icon_name} size={27} color="#FFFFFF" />
                </Card>
                <IconButton size={27} iconColor="#4B0082" style={style.iconCardRight} icon="heart" />
                <Card.Content style={style.cardContent}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={style.cardContentTitle}>{event.title}</Text>
                        {type === 'created' && (
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <View style={stylesButtonInvitation.invitationButton}>
                                    <Ionicons name="mail" size={18} color="white" />
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={style.locationContainer}>
                        <MaterialCommunityIcons name="calendar-month" size={18} color="#4B0082" style={{ marginRight: 8 }} />
                        <View style={style.locationBoxText}>
                            <Text style={style.locationTextCity}>From {event.event_start} to {event.event_end}</Text>
                        </View>
                    </View>
                    <View style={style.locationContainer}>
                        <SimpleLineIcons name="location-pin" size={18} color="#4B0082" style={{ marginRight: 8 }} />
                        <View style={style.locationBoxText}>
                            <Text style={style.locationTextCity}>{event.street_number}, {event.locality}</Text>
                        </View>
                    </View>
                    <View style={style.viewHoritonzalBar} />
                    <View style={style.viewBottonsBottom}>
                        {type === "created" && (
                            <Button buttonStyle={style.buttonDelete} onPress={() => showAlert(index + 1)}>
                                <AntDesign name="delete" size={20} color="white" />
                            </Button>
                        )}
                        <Button
                            title={titleButton}
                            containerStyle={style.buttonFollowContainer}
                            buttonStyle={style.buttonFollowStyle}
                            titleStyle={style.buttonFollowTitle}
                            onPress={handlePress}
                        />
                        <Button buttonStyle={style.buttonAccessChat} onPress={() => navigation.navigate('Topics', { event: event })}>
                            <Entypo name="chat" size={20} color="white" />
                        </Button>
                    </View>
                </Card.Content>
            </Card>
            <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={stylesButtonInvitation.modalContainer}>
                    <View style={stylesButtonInvitation.modalContent}>
                        <Text style={stylesButtonInvitation.modalTitle}>Send Invitation</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                                style={stylesButtonInvitation.modalInput}
                                placeholder="Enter email address"
                                value={emailInput}
                                onChangeText={setEmailInput}
                            />
                            <Button
                                buttonStyle={stylesButtonInvitation.addButton}
                                onPress={handleAddEmail}
                                title="+"
                            />
                        </View>
                        <ScrollView horizontal contentContainerStyle={stylesButtonInvitation.scrollContainer}>
                            {emailList.map((email, index) => (
                                <Chip
                                    key={index}
                                    style={stylesButtonInvitation.chip}
                                    onClose={() => handleRemoveEmail(email)}
                                >
                                    {email}
                                </Chip>
                            ))}
                        </ScrollView>
                        <View style={stylesButtonInvitation.modalButtons}>
                            <Button title="Cancel" onPress={() => setModalVisible(false)} type="outline" />     
                            <Button title="Send" onPress={sendInvitations} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}
