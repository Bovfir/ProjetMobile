import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useState, useCallback } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import { style } from '../../styles/styles';
import CardEvent from '../../components/CardEvent';
import CardCategory from '../../components/CardCategory';
import SubTitle from '../../components/SubTitle';
import HorizontalCardList from '../../components/HorizontalCardList';
import Header from '../../components/Header';

import { getNbEvents as APIGetNbEvents } from '../../API/index';
import { getAllCategories as APIGetAllCategories } from '../../API/index';
import { getNbSubscribers as APIGetNbSubscribers } from '../../API/index';
import { ratioEvent as APIRatioEvent } from '../../API/index';
import { getFavorite,searchLinkUserEvents } from '../../API/index';
import LocationRequest from "../../components/Location";
import { useNavigation } from '@react-navigation/native';
import { showToast } from '../../utils/utils';

export default function Home() {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedCardsUpComingEvent, setSelectedCardsUpComingEvent] = useState({});
    const [selectedCardsForYou, setSelectedCardsForYou] = useState({});
    const [eventsData, setEventsData] = useState({
        events: [],
        eventsForYou: [],
        categories: [],
        nbSubscribedForEachEventUpComingEvent: [],
        nbSubscribedForEachEventForYou: [],
        ratioUpComingEvents: [],
        ratioForYouEvents: [],
        isFavorite: [],
        isFollow: [],
    });
    const navigation = useNavigation();

    const { location, city, erroMsg } = LocationRequest();

    const fetchData = async () => {
        try {
            setLoading(true);
            const eventsResponse = await APIGetNbEvents(1);
            const eventsForYouResponse = await APIGetNbEvents(2);
            const categoriesResponse = await APIGetAllCategories();

            const nbSubscribedForEachEventUpComingEventPromises = eventsResponse.map(async (item) => {
                const response = await APIGetNbSubscribers(item.id);
                return { id: item.id, subscribers: Number(response.count) };
            });

            const nbSubscribedForEachEventForYouPromises = eventsForYouResponse.map(async (item) => {
                const response = await APIGetNbSubscribers(item.id);
                return { id: item.id, subscribers: Number(response.count) };
            });

            const ratioUpComingEventsPromises = eventsResponse.map(async (item) => {
                const response = await APIRatioEvent(item.id);
                return { id: item.id, ratio: response };
            });

            const ratioForYouEventsPromises = eventsForYouResponse.map(async (item) => {
                const response = await APIRatioEvent(item.id);
                return { id: item.id, ratio: response };
            });

            const responseFavorite = await getFavorite(1);
            const responseFollow = await searchLinkUserEvents(1);

            const nbSubscribedUpComing = await Promise.all(nbSubscribedForEachEventUpComingEventPromises);
            const nbSubscribedForYou = await Promise.all(nbSubscribedForEachEventForYouPromises);
            const ratioUpComing = await Promise.all(ratioUpComingEventsPromises);
            const ratioForYou = await Promise.all(ratioForYouEventsPromises);

            setEventsData({
                events: eventsResponse,
                eventsForYou: eventsForYouResponse,
                categories: categoriesResponse,
                nbSubscribedForEachEventUpComingEvent: nbSubscribedUpComing,
                nbSubscribedForEachEventForYou: nbSubscribedForYou,
                ratioUpComingEvents: ratioUpComing,
                ratioForYouEvents: ratioForYou,
                isFavorite: responseFavorite,
                isFollow: responseFollow
            });

        } catch (error) {
            showToast('error', 'Error data', `An error has occurred. Please try later.`);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            async function loadFonts() {
                await Font.loadAsync({
                    'BrunoAceSC': require('../../assets/fonts/BrunoAceSC-Regular.ttf'),
                });
                setFontLoaded(true);
            }
            loadFonts();
            onRefresh();
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };
    

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title={"EventFlow"} subTitle={"Where event come to life"} notificationButton={true} navigation={navigation} />
            <ScrollView
                showsVerticalScrollIndicator={true}
                style={{ flex: 1, backgroundColor: 'white' }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4B0082']} />
                }
            >
                <View style={style.container}>

                    <View style={style.locationContainer}>
                        <SimpleLineIcons name="location-pin" size={35} color="#4B0082" style={{ marginRight: 8 }} />
                        <View style={style.locationBoxText}>
                            <Text style={style.locationTextCity}>{city ? city : 'Chargement...'}</Text>
                            <Text style={style.locationTextBottom}>{location ? 'Less than 10km' : ''}</Text>
                        </View>
                    </View>

                    <SubTitle style={style} text="Category" />
                    <HorizontalCardList
                        cards={eventsData.categories}
                        selectedCards={{}}
                        toggleSelection={() => {}}
                        CardComponent={CardCategory}
                        style={style}
                    />

                    <SubTitle style={style} text="Upcoming Event" />
                    <HorizontalCardList
                        cards={eventsData.events}
                        eventsFavorites={eventsData.isFavorite}
                        eventsFollowed={eventsData.isFollow}
                        nbSubscribedForEachEvent={eventsData.nbSubscribedForEachEventUpComingEvent}
                        ratio={eventsData.ratioUpComingEvents}
                        CardComponent={CardEvent}
                        fetchSingleEvent={fetchData}
                        style={style}
                    />

                    <SubTitle style={style} text="For you" />
                    <HorizontalCardList
                        cards={eventsData.eventsForYou}
                        eventsFavorites={eventsData.isFavorite}
                        eventsFollowed={eventsData.isFollow}
                        nbSubscribedForEachEvent={eventsData.nbSubscribedForEachEventForYou}
                        ratio={eventsData.ratioForYouEvents}
                        CardComponent={CardEvent}
                        style={style}
                        fetchSingleEvent={fetchData}
                    />
                </View>
            </ScrollView>
        </View>
    );
}
