import { View, ScrollView, RefreshControl, Image } from 'react-native';
import { useState,useCallback } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { style, stylesButton } from '../../styles/stylesMyEvent';
import { Card } from 'react-native-paper';
import { useNavigation, useRoute,useFocusEffect} from '@react-navigation/native';
import CardEventWithOptions from '../../components/CardEventWithOptions';
import SearchBar from '../../components/SearchBar';
import EventTypeSelector from '../../components/EventTypeSelector';
import Header from '../../components/Header';
import { getEventCreatedOfUser as APIGetEventCreatedOfUser,searchEventAllFilterCreatedEvent } from '../../API/index';
import {URL} from "../../API/APIUrl";
import { showToast } from '../../utils/utils';

export default function MyEvent2() {
  const [text, setText] = useState('');
  const [eventsAPI, setEventsAPI] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [selectedTypeEvent, setSelectedTypeEvent] = useState('created');

  const fetchData = async () => {
    try {
      setLoading(true);
      const eventsCreated = await APIGetEventCreatedOfUser();
      setEventsAPI(eventsCreated);
      setLoading(false);
    } catch (error) {
      showToast('error', 'Recovery error', 'An error occurred while fetching the event. Please try later.');
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
        const eventResponse = await searchEventAllFilterCreatedEvent(1, searchText);
        setEventsAPI(eventResponse.events);
      } catch (error) {
        showToast('error', 'Recovery error', 'An error occurred while retrieving events. Please try later.');
      } finally {
        setLoading(false);
      }
    };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header title={"My Events"} notificationButton={true} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={true} style={{ flex: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4B0082']} />}>
        <View style={style.container}>
          
          <SearchBar text={text} setText={setText} placeholder="Search your created events..." onSearch={handleSearchFollowedEvent} style={style}/>
          
          <EventTypeSelector stylesButton={stylesButton} selectedType={selectedTypeEvent}
            onSubscribedPress={() => {
              setSelectedTypeEvent('subscribed');
              navigation.navigate('MyEventSubscribed');
            }}
            onCreatedPress={() => {
              setSelectedTypeEvent('created');
            }}
          />

          {eventsAPI.length === 0 ? (
              <Image source={require('../../assets/images/utils/NothingFound.png')} style={{width: 300, height: 300, marginTop: 50 }} />
          ) : (
            eventsAPI.map((event, index) => (
              <CardEventWithOptions 
                key={event.id}
                event={event}
                imageUri={`${URL}/${event.picture_path}`}
                style={style}
                type={selectedTypeEvent}
                titleButton={"Update"}
                index={index}
                fetchData={fetchData}
              />
            ))
          )}
        </View>
      </ScrollView>

      <Card style={style.buttonAddEvent} onPress={() => navigation.navigate('FormEvent', {type: 'create', eventUpdated: false })}>
        <AntDesign name="plus" color={"white"} size={30} />
      </Card>
    
    </View>
  );
};
