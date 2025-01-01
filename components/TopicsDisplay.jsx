import { getDiscussionsFromEventID as APIGetDiscussionFromEventId, createDiscussion } from '../API/index';
import Discussion from './DiscussionInformation';
import { useEffect, useState } from "react";
import { Card, TextInput,Switch  } from 'react-native-paper';
import { View, Text, TouchableOpacity, ActivityIndicator, Modal, Button } from "react-native";
import DiscussionHeader from "./DiscussionHeader";
import { useNavigation } from "@react-navigation/native";
import { stylesTopicsDisplay } from '../styles/stylesTopicsDisplay';
import { ScrollView, RefreshControl } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { showToast } from '../utils/utils';

export default function TopicsDisplay({ event, currentUser }) {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [discussions, setDiscussions] = useState([]);
    const [load, setLoad] = useState({ loading: false, error: false, errorMessage: '' });

    const [modalVisible, setModalVisible] = useState(false);
    const [newDiscussionTitle, setNewDiscussionTitle] = useState(''); 
    const [userCanWrite, setUserCanWrite] = useState(false);

    useEffect(() => {
        onRefresh();
    }, []);

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
                eventcreatorusername: discussion.eventcreatorusername,
                usepicturepaths: discussion.usepicturepaths,
                lastmessageuserinfo: discussion.lastmessageuserinfo
            })));

            setLoad({ loading: false, error: false, errorMessage: '' });
        } catch (error) {
            console.error(error);
            setLoad({ loading: false, error: true, errorMessage: error.message });
        }
    };

    const handleCreateDiscussion = async () => {
        try {
            console.log('Creating discussion:', newDiscussionTitle, 'User can write:', userCanWrite);
            await createDiscussion({event_id: event.id, is_writable: userCanWrite, title: newDiscussionTitle});
            showToast("success","Created discussion","The discussion was successfully created.");
            setModalVisible(false);
            setNewDiscussionTitle('');
            setUserCanWrite(false); 
            await fetchData();
        } catch (error) {
            showToast("error","Chat creation error","An error occurred while creating the discussion. Please Try Later");
        }
    };

    let content = <Text>No discussions</Text>;

    if (load.loading) {
        content = (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <ActivityIndicator size="large" color="#4B0082" />
                <Text style={{ marginTop: 20 }}>Loading...</Text>
            </View>
        );
    }

    if (load.error) {
        content = <Text>{load.errorMessage}</Text>;
    }

    if (discussions.length !== 0) {
        content = discussions.map((discussion) => (
            <TouchableOpacity
                key={discussion.id}
                onPress={() =>
                    navigation.navigate('DiscussionChat', {
                        currentUser,
                        discussionID: discussion.id,
                        discussionTitle: discussion.title,
                        is_writable: discussion.is_writable,
                        eventcreatorusername: discussion.eventcreatorusername,
                        lastmessageuserinfo: discussion.lastmessageuserinfo
                    })
                }
            >
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

            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={stylesTopicsDisplay.scrollContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4B0082']} />}
            >
                <View style={stylesTopicsDisplay.content}>
                    {content}
                </View>
            </ScrollView>

            <Card style={stylesTopicsDisplay.buttonPlus} onPress={() => setModalVisible(true)}>
                <AntDesign name="plus" color={"white"} size={30} />
            </Card>

            <Modal visible={modalVisible} animationType="fade" transparent={true}
                onRequestClose={() => setModalVisible(false)}>
                <View style={stylesTopicsDisplay.modalContainer}>
                    <View style={stylesTopicsDisplay.modalContent}>
                        <Text style={stylesTopicsDisplay.modalTitle}>Create a new discussion</Text>
                        <TextInput
                            label="Discussion Title"
                            mode="outlined" 
                            style={stylesTopicsDisplay.input}
                            placeholder="Enter discussion title"
                            value={newDiscussionTitle}
                            onChangeText={setNewDiscussionTitle}
                        />

                        <View style={stylesTopicsDisplay.switchContainer}>
                            <Text style={stylesTopicsDisplay.switchLabel}>User can write:</Text>
                            <Switch
                                value={userCanWrite}
                                onValueChange={() => setUserCanWrite(!userCanWrite)}
                                color="#4B0082" 
                            />
                        </View>
                        <View style={stylesTopicsDisplay.buttonContainer}>
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                            <Button title="Create" onPress={handleCreateDiscussion} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
