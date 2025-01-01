import { View, ScrollView, RefreshControl , Image} from 'react-native';
import { useEffect, useState } from 'react';
import { style, stylesButton } from '../../styles/stylesMyEvent';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../../components/SearchBar';
import EventTypeSelector from '../../components/EventTypeSelector';
import CardEventWithOptions from '../../components/CardEventWithOptions';
import { Header } from '../../components/Header';
import {getEventSubcribedOfUser as APIGetEventCreatedOfUser} from '../../API/index';

export default function MyEvent(){
  const [text,setText] = useState('');
  const [eventsAPISubscribed, setEventsAPISubscribed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [selectedTypeEvent,setselectedTypeEvent] = useState('subscribed');
  
  const fetchData = async () => {
    setLoading(true);
    const eventsSubscribed = await APIGetEventCreatedOfUser();
    setEventsAPISubscribed(eventsSubscribed);
    setLoading(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <View style={{flex:1, backgroundColor:'white'}}>
      <Header title={"My Events"} notificationButton={true} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={true} style={{flex:1}}refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4B0082']}/>}>
        <View style={style.container}>
          
          <SearchBar text={text} setText={setText} placeholder='Search your subscribed events...' onSearch={(searchText) => alert(`${searchText}`)} style={style}/>
          
          <EventTypeSelector stylesButton={stylesButton} selectedType={selectedTypeEvent}
            onSubscribedPress={() => {
              setselectedTypeEvent('subscribed');
            }}
            onCreatedPress={() => {
              setselectedTypeEvent('created');
              navigation.navigate('MyEventCreated');
            }}
          />
          
          {eventsAPISubscribed.length === 0 ? (
              <Image source={require('../../assets/images/utils/NothingFound.png')} style={{borderColor:'red',borderColor:'1', width: 300, height: 300, marginTop: 50 }} />
          ) : (
            eventsAPISubscribed.map((event) => (
              <CardEventWithOptions 
                key={event.id} 
                event={event} 
                style={style} 
                titleButton={"UnFollow"} 
                type={selectedTypeEvent} 
                onRefresh={onRefresh} 
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  )
};