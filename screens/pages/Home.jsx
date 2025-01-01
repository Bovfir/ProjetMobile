import {Text, View, ScrollView,RefreshControl, } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useState,useCallback } from 'react';
import { SimpleLineIcons} from '@expo/vector-icons';
import { style } from '../../styles/styles';
import {CardEvent} from '../../components/CardEvent';
import CardCategory from '../../components/CardCategory';
import { SubTitle } from '../../components/SubTitle';
import HorizontalCardList from '../../components/HorizontalCardList';
import { Header } from '../../components/Header';

import { getNbEvents as APIGetNbEvents }  from '../../API/index';
import { getAllCategories as APIGetAllCategories } from '../../API/index';
import { getNbSubscribers as APIGetNbSubscribers} from '../../API/index';
import { ratioEvent as APIRatioEvent} from '../../API/index';
import LocationRequest from "../../components/Location";
import { useNavigation } from '@react-navigation/native';

export default function Home(){
    const [fontLoaded, setFonsLoaded] = useState(false);
    const [selectedCardsUpComingEvent, setSelectedCardsUpComingEvent] = useState({});
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedCardsForYou, setSelectedCardsForYou] = useState({});
    const navigation = useNavigation();

    const [events, setEvents] = useState([]);
    const [eventsForYou, setEventForYou] = useState([]);
    const [categories, setCategories] = useState([]);
    
    const [nbSubscribedForEachEventUpComingEvent,setNbSubscribedForEachEventUpComingEvent] = useState({});
    const [nbSubscribedForEachEventForYou,setNbSubscribedForEachEventForYou] = useState({});
    
    const [ratioUpComingEvents, setRatioUpComingEvents] = useState({});
    const [ratioForYouEvents, setRatioForYouEvents] = useState({});

    const {location, city, erroMsg} = LocationRequest();
    
    const fetchData = async() => {
        setLoading(true);
        const eventsResponse = await APIGetNbEvents(1);
        setEvents(eventsResponse);
        const eventsForYouResponse = await APIGetNbEvents(2);
        setEventForYou(eventsForYouResponse);
        const categoriesResponse = await APIGetAllCategories();
        setCategories(categoriesResponse);

        const nbSubscribedForEachEventUpComingEventPromises = eventsResponse.map(async (item) => {
            const response = await APIGetNbSubscribers(item.id);
            return {id: item.id, subscribers: Number(response.count)}; 
        });

        const nbSubscribedForEachEventForYouPromises = eventsForYouResponse.map(async (item) => {
            const response = await APIGetNbSubscribers(item.id);
            return {id: item.id, subscribers: Number(response.count)}; 
        });

        const ratioUpComingEventsPromises = eventsResponse.map(async (item) => {
            const response = await APIRatioEvent(item.id);
            return {id: item.id, ratio : response};
        });

        const ratioForYouEventsPromises = eventsForYouResponse.map(async (item) => {
            const response = await APIRatioEvent(item.id);
            return {id: item.id, ratio : response};
        });

        setRatioUpComingEvents(await Promise.all(ratioUpComingEventsPromises));
        setRatioForYouEvents(await Promise.all(ratioForYouEventsPromises));
        setNbSubscribedForEachEventUpComingEvent(await Promise.all(nbSubscribedForEachEventUpComingEventPromises));
        setNbSubscribedForEachEventForYou(await Promise.all(nbSubscribedForEachEventForYouPromises));
        
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            async function loadFonts() {
                await Font.loadAsync({
                    'BrunoAceSC': require('../../assets/fonts/BrunoAceSC-Regular.ttf'),
                });
                setFonsLoaded(true);
            }
            loadFonts();
            onRefresh();
        },[])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    const toggleSelectedCardUpComingEvent = (cardId) => {
        setSelectedCardsUpComingEvent(prevState => ({
            ...prevState,
            [cardId]: !prevState[cardId],
        }));
    };

    const toggleSelectedCardForYou = (cardId) => {
        setSelectedCardsForYou(prevState => ({
            ...prevState,
            [cardId]: !prevState[cardId],
        }));
    };

    return(
        <>
        <View style={{ flex: 1, backgroundColor: 'white'}}>
            <Header title={"EventFlow"} subTitle={"Where event come to life"} notificationButton={true} navigation={navigation}></Header>
                <ScrollView showsVerticalScrollIndicator={true} style={{flex:1, backgroundColor:'white'}}refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4B0082']}/>}>
                    <View style={style.container}>
                        
                        <View style={style.locationContainer}>
                            <SimpleLineIcons name="location-pin" size={35} color="#4B0082" style={{ marginRight: 8 }} />
                            <View style={style.locationBoxText}>
                                <Text style={style.locationTextCity}>{city ? city : 'Chargement...'}</Text>
                                <Text style={style.locationTextBottom}>{location ? 'Less than 10km' : ''}</Text>
                            </View>
                        </View>
                        
                        <SubTitle style={style} text="Category"/>
                        <HorizontalCardList cards={categories} selectedCards={{}} toggleSelection={() => {}} CardComponent={CardCategory} style={style}/>
                        
                        <SubTitle style={style} text="Upcoming Event"/>
                        <HorizontalCardList cards={events} nbSubscribedForEachEvent={nbSubscribedForEachEventUpComingEvent} ratio={ratioUpComingEvents} selectedCards={selectedCardsUpComingEvent} toggleSelection={toggleSelectedCardUpComingEvent} CardComponent={CardEvent} style={style}/>
                        
                        <SubTitle style={style} text="For you"/>
                        <HorizontalCardList cards={eventsForYou} nbSubscribedForEachEvent={nbSubscribedForEachEventForYou} ratio={ratioForYouEvents} selectedCards={selectedCardsForYou} toggleSelection={toggleSelectedCardForYou} CardComponent={CardEvent} style={style}/>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};
