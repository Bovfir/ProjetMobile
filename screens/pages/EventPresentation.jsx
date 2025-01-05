import React, {useEffect, useState, useCallback} from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, ScrollView, RefreshControl,Pressable, ActivityIndicator} from "react-native";
import { Avatar, Card } from "react-native-paper";
import {MaterialCommunityIcons,Ionicons,Entypo} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import { getEvent as APIGetEvent } from "../../API/index";
import { getUser as APIGetUser }  from "../../API/index";
import { getLocation as APIGetLocation } from "../../API/index";
import { getCategory as APIGetCategory } from "../../API/index";
import { getNbSubscribers as APIGetNbSubscribers} from "../../API/index";
import { followEvent as APIFollowEvent } from "../../API/index";
import { unFollowEvent as APIUnFollowEvent } from "../../API/index";
import { eventAccepted as APIEventAccepted } from "../../API/index";
import { getCurrentUser as APIGetCurrentUser} from "../../API/index";
import { stylesEventPresentation } from "../../styles/stylesEventPresentation";
import Header from "../../components/Header";
import IconComponents from '../../utils/IconComponents';
import { URLImage } from "../../API/APIUrl";
import { formatDateToReadable, formatTimeRange } from "../../utils/utils";
import { showToast } from "../../utils/utils";

export default function EventPresentation({ route }) {
    const [refreshing, setRefreshing] = useState(false);
    const {eventID} = route.params
    const navigation = useNavigation();

    const [eventData, setEventData] = useState({});
    const [userData, setUserData] = useState({});
    const [locationData, setLocationData] = useState({});
    const [categoryData, setCategoryData] = useState({});
    const [nbSubscribers, setNbSubscribers] = useState({});
    const [load, setLoad] = useState({loaded: false,loading: false,error: false,errorMessage: ''});
    const [currentUser,setCurrentUser] = useState([]);

    const [isEventAccepted, setIsEventAccepted] = useState(null);
    const [isFollow, setIsFollow] = useState(false);

    const followEvent = async() => {
        try {
            await APIFollowEvent(eventData.id);
            setIsFollow(true);
        } catch(error) {
            showToast('error','Follow error','An error occurred while subscribing to the event. Please try again later.');
        }
    };

    const unFollowEvent = async() => {
        try {
            await APIUnFollowEvent(eventData.id);
            setIsFollow(false)
        } catch (error) {
            showToast('error','Unfollow error','An error occurred while unsubscribing from the event. Please try again later.');
        }
    }

    const fetchData = async() => {
        try {
            setLoad({loaded: false,loading: true,error: false,errorMessage: ''});

            const currentUser = await APIGetCurrentUser();
            setCurrentUser(currentUser); 
            
            const eventResponse = await APIGetEvent(eventID);
            setEventData(eventResponse);
            
            const eventAccepted = await APIEventAccepted(eventID);
            setIsEventAccepted(eventAccepted.is_accepted);
            setIsFollow(eventAccepted.is_accepted);

            const userResponse = await APIGetUser(eventResponse.id);
            setUserData(userResponse);
            const locationResponse = await APIGetLocation(eventResponse.location_id);
            setLocationData(locationResponse);
            const categoryResponse = await APIGetCategory(eventResponse.category_id);
            setCategoryData(categoryResponse);
            const nbSubscribersResponse = await APIGetNbSubscribers(eventID);
            setNbSubscribers(nbSubscribersResponse);
            
            
        } catch(error) {
            showToast('error','Recovery error','Something went wrong. Please try again later.');
            navigation.goBack();
        } finally {
            setLoad({loaded: false,loading: false,error: false,errorMessage: ''});
        }
    }
    useFocusEffect(
        useCallback(() => {
            onRefresh();
        },[])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if(load.loading) {
                setLoad(prev => ({...prev, loading: false, loaded: true}));
            }
        }, 1000);
        return () => clearTimeout(timer);
    },[load.loading])

    if(load.loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
                <ActivityIndicator size="large" color="#4B0082" />
                <Text style={{ marginTop: 20 }}>Loading...</Text>
            </View>
        );
    } 

    if(load.error) {
        return <Text>{load.errorMessage}</Text>;
    }
    const IconComponent = IconComponents[categoryData.icon_component_name] || IconComponents.MaterialIcons;

    return (
        <View style={{ flex: 1, backgroundColor: 'white'}}>
            <Header title={"Details"} subTitle={"Event"} backButton={true} notificationButton={true} navigation={navigation}/>
            <ScrollView showsVerticalScrollIndicator={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4B0082']} />}
                contentContainerStyle={{ paddingBottom: 100 }}>
                <View style={stylesEventPresentation.container}>
    
                    <Card style={stylesEventPresentation.cardImage}>
                        <Card.Cover style={stylesEventPresentation.cardCover} source={{ uri: `${URLImage}/${eventData.picture_path}`}}/>
                        <View style={stylesEventPresentation.imageOverlay}>
                            <IconComponent name={categoryData.icon_name} size={15} color="#FFFFFF" />
                            <Text style={stylesEventPresentation.overlayText}>{categoryData.title}</Text>
                        </View>
                    </Card>
    
                    <View style={stylesEventPresentation.titleEventContainer}>
                        <Text style={stylesEventPresentation.titleEventText}>{eventData.title}</Text>
                    </View>
    
                    <Card style={stylesEventPresentation.containerUser}>
                        <View style={stylesEventPresentation.contentWrapper}>
                            <Text style={stylesEventPresentation.textUser}>By {userData.user_name}</Text>
                            <Avatar.Image size={35} source={{ uri: `${URLImage}/${userData.picture_path}`}}/>
                        </View>
                    </Card>
    
                    <Card style={stylesEventPresentation.containerDetails}>
                        <View style={stylesEventPresentation.rowContainer}>
                            <Ionicons name="location-outline" size={20} color="#000" />
                            <Text style={stylesEventPresentation.textItem}>
                                {eventData.street_number}, {locationData.label}
                            </Text>
                        </View>
                        <View style={stylesEventPresentation.rowContainer}>
                            <Ionicons name="time-outline" size={20} color="#000" />
                            <Text style={stylesEventPresentation.textItem}>
                                {formatTimeRange(eventData.event_start, eventData.event_end)}
                            </Text>
                        </View>
                        <View style={stylesEventPresentation.rowContainer}>
                            <MaterialCommunityIcons name="calendar-month-outline" size={20} color="#000" />
                            <Text style={stylesEventPresentation.textItem}>
                                {formatDateToReadable(eventData.event_start)}
                            </Text>
                        </View>
                        <View style={stylesEventPresentation.topRightContainer}>
                            <MaterialCommunityIcons name="star-outline" size={20} color="#000" />
                            <Text style={stylesEventPresentation.topRightText}>0</Text>
                        </View>
                        <View style={stylesEventPresentation.bottomRightContainer}>
                            <Ionicons name="people-outline" size={20} color="#000" />
                            <Text style={stylesEventPresentation.bottomRightText}>{nbSubscribers.count}</Text>
                        </View>
                    </Card>
    
                    <View style={stylesEventPresentation.titleEventContainer}>
                        <Text style={stylesEventPresentation.titleEventText}>About Event</Text>
                    </View>
    
                    <Card style={stylesEventPresentation.containerAboutEvent}>
                        {eventData.description ? (
                            <Text style={stylesEventPresentation.textDescription}>
                                {eventData.description}
                            </Text>                          
                        ) : (
                            <Text style={stylesEventPresentation.textNoDescription}>
                                No description yet.
                            </Text>
                        )}
                    </Card>
                </View>
            </ScrollView>

            <View style={stylesEventPresentation.fixedButtonContainer}>
                {(isFollow || currentUser.user_name === userData.user_name ) && (
                    <Pressable style={stylesEventPresentation.roundButton} onPress={() => navigation.navigate('Topics',{event: eventData})}>
                        <Entypo name="chat" size={30} color="#4B0082" style={stylesEventPresentation.icon} />
                    </Pressable>
                )}
                {currentUser.user_name !== userData.user_name && (
                <Pressable style={stylesEventPresentation.rectangleButton} onPress={() => {
                    if(isFollow){
                        unFollowEvent(eventData.id);
                    } else {
                        followEvent(eventData.id);
                    }
                }}>
                    <Text style={stylesEventPresentation.rectangleButtonText}>{isFollow ? 'Unfollow' : 'Follow'}</Text>
                </Pressable>
                )}
            </View>
        </View>
    );
};