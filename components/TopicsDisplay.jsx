import {getDiscussionsFromEventID as APIGetDiscussionFromEventId} from '../API/index';
import Discussion from './DiscussionInformation'
import {useEffect, useState} from "react";
import {View, Text, TouchableOpacity,ActivityIndicator} from "react-native";
import DiscussionHeader from "./DiscussionHeader";
import {useNavigation} from "@react-navigation/native";
import { stylesTopicsDisplay } from '../styles/stylesTopicsDisplay';
import { ScrollView,RefreshControl } from 'react-native';

export default function TopicsDisplay({event, currentUser}) {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [discussions, setDiscussions] = useState([]);
    const [load, setLoad] = useState({loading: false,error: false,errorMessage: ''});

    useEffect(() => {
        onRefresh();
    },[]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    const fetchData = async () => {
        try {
            setLoad({ loading: true, error: false, errorMessage: '' });
            
            const discussionResponse = await APIGetDiscussionFromEventId(event.id);
            setDiscussions(discussionResponse.map((discussion) => ({
                id: discussion.discussionid,
                title: discussion.conversationtitle,
                description: discussion.eventdescription,
                lastMessage: discussion.lastmessagecontent,
                lastMessageDate: discussion.lastmessagesendingdate,
                usersCount: discussion.userscount,
                is_writable: discussion.is_writable,
                eventcreatorusername : discussion.eventcreatorusername,
                usepicturepaths : discussion.usepicturepaths,
                lastmessageuserinfo : discussion.lastmessageuserinfo
            }))); 
    
            setLoad({ loading: false, error: false, errorMessage: '' }); 
        } catch (error) {
            console.error(error);
            setLoad({ loading: false, error: true, errorMessage: error.message });
        }
    };


    let content = <Text>No discussions</Text>;

    if (load.loading) {
        content =              
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
             <ActivityIndicator size="large" color="#4B0082" />
            <Text style={{ marginTop: 20 }}>Loading...</Text>
        </View>
    } 

    if (load.error) {
        content = <Text>{load.errorMessage}</Text>;
    } 
    

    if (discussions.length !== 0) {
        content = discussions.map((discussion) => (
            <TouchableOpacity key={discussion.id} onPress={() => navigation.navigate('DiscussionChat', { currentUser, discussionID: discussion.id, discussionTitle: discussion.title, is_writable: discussion.is_writable,eventcreatorusername : discussion.eventcreatorusername, lastmessageuserinfo: discussion.lastmessageuserinfo})}>
                <Discussion key={discussion.id} discussion={discussion} />
            </TouchableOpacity>
        ));
    } 
    return (
        <View style={stylesTopicsDisplay.container}>
            <DiscussionHeader title={event.title} />
            <View style={stylesTopicsDisplay.titleContainer}>
                <Text style={stylesTopicsDisplay.title}>Topics</Text>
            </View>

            <ScrollView showsHorizontalScrollIndicator={false} style={stylesTopicsDisplay.scrollContainer}refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4B0082']}/>}>
                <View style={stylesTopicsDisplay.content}>
                    {content}
                </View>
            </ScrollView>
        </View>
    );
};
