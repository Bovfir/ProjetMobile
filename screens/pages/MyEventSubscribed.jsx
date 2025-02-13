import { View, ScrollView, RefreshControl, Image } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { style, stylesButton } from '../../styles/stylesMyEvent';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import SearchBar from '../../components/SearchBar';
import EventTypeSelector from '../../components/EventTypeSelector';
import CardEventWithOptions from '../../components/CardEventWithOptions';
import Header from '../../components/Header';
import { getEventSubcribedOfUser as APIGetEventCreatedOfUser, searchEventAllFilterFollowedEvent, searchLinkUserEvents, getFavorite } from '../../API/index';
import { showToast } from '../../utils/utils';

export default function MyEvent() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTypeEvent, setSelectedTypeEvent] = useState('subscribed');
  
  // Regroupé les états dans un seul useState
  const [eventsData, setEventsData] = useState({
    events: [],
    favorites: [],
    followed: [],
  });

  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      setLoading(true);
  
      const eventsSubscribed = await APIGetEventCreatedOfUser();
      const responseFavorite = await getFavorite(1); 
      const responseFollow = await searchLinkUserEvents(1);  
  
      const updatedEvents = await Promise.all(
        eventsSubscribed.map(async (event) => {
          const isFavorite = responseFavorite.some((fav) => fav.event_id === event.id);

          const isFollowed = responseFollow.some((follow) => follow.event_id === event.id);

          return {
            ...event,
            isFavorite,
            isFollowed,  
          };
        })
      );
  
      setEventsData({
        events: updatedEvents,
        favorites: responseFavorite, 
        followed: responseFollow, 
      });
  
      setLoading(false);
    } catch (error) {
      showToast('error', 'Recovery error', 'An error occurred while fetching the event. Please try later.');
      setLoading(false);
    }
  };
  

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleSearchFollowedEvent = async (searchText) => {
    try {
      setLoading(true);
      const eventResponse = await searchEventAllFilterFollowedEvent(1, searchText);
      setEventsData((prevState) => ({
        ...prevState,
        events: eventResponse.events,
      }));
    } catch (error) {
      showToast('error', 'Recovery error', 'An error occurred while retrieving events. Please try later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleEvent = (eventId) => {
    setEventsData(prevData => {
      const updatedEvents = prevData.events.map(event =>
        event.id === eventId ? { ...event, isFavorite: !event.isFavorite } : event
      );
  
      const updatedFavorites = prevData.favorites.map(fav =>
        fav.event_id === eventId ? { ...fav, is_favorite: !fav.is_favorite } : fav
      );
  
      return {
        ...prevData,
        events: updatedEvents,
        favorites: updatedFavorites,
      };
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header title={"My Events"} notificationButton={true} navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={{ flex: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4B0082']} />}
      >
        <View style={style.container}>
          <SearchBar text={text} setText={setText} placeholder='Search your subscribed events...' onSearch={handleSearchFollowedEvent} style={style} />

          <EventTypeSelector
            stylesButton={stylesButton}
            selectedType={selectedTypeEvent}
            onSubscribedPress={() => {
              setSelectedTypeEvent('subscribed');
            }}
            onCreatedPress={() => {
              setSelectedTypeEvent('created');
              navigation.navigate('MyEventCreated');
            }}
          />

          {eventsData.events.length === 0 ? (
            <Image
              source={require('../../assets/images/utils/NothingFound.png')}
              style={{ borderColor: 'red', borderColor: '1', width: 300, height: 300, marginTop: 50 }}
            />
          ) : (
            eventsData.events.map((event) => {
              let isFavorite = false;
              if (eventsData.favorites) {
                const favoriteEvent = eventsData.favorites.find((fav) => fav.event_id === event.id);
                isFavorite = favoriteEvent ? favoriteEvent.is_favorite : false;
              }

              let isFollow = false;
              if (eventsData.followed) {
                const eventFollowed = eventsData.followed.find((follow) => follow.event_id === event.id);
                isFollow = eventFollowed ? true : false;
              }

              return (
                <CardEventWithOptions
                  key={event.id}
                  event={event}
                  style={style}
                  titleButton={"UnFollow"}
                  type={selectedTypeEvent}
                  onRefresh={onRefresh}
                  isFollow={isFollow || false}
                  isFavorite={isFavorite || false}
                  fetchSingleEvent={fetchSingleEvent}
                />
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}
