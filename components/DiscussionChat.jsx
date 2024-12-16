import {loadDiscussionMessages, loadNewerMessages, loadOlderMessages} from '../api/index';
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Message } from "./Message";
import MessageInput from "./MessageInput";
import DiscussionHeader from "./DiscussionHeader";
import { useRoute } from '@react-navigation/native';

export default function DiscussionChat() {
    const route = useRoute();
    const { currentUser, discussionID, discussionTitle } = route.params;

    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [initialLoad, setInitialLoad] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadingNew, setLoadingNew] = useState(false);
    const [loadingError, setLoadingError] = useState({ error: false, errorMessage: '' });
    const [reachedEnd, setReachedEnd] = useState(false);

    function fetchInitialMessages() {
        setLoadingInitial(true);

        loadDiscussionMessages(discussionID, 0).then(result => {
            setMessages(result);
            setLoadingInitial(false);
        }).catch(error => {
            setLoadingInitial(false);
            setLoadingError({ error: true, errorMessage: error.message });
        });
    }

    // Load more messages when scrolling to the top
    function loadMoreMessages(){
        if (loadingMore || loadingInitial || reachedEnd) return;

        setLoadingMore(true);
        loadOlderMessages(discussionID, messages[messages.length - 1].id).then(result => {
            if (result.length === 0) {
                setReachedEnd(true);
                setLoadingMore(false);
                return;
            }
            setMessages((prevMessages) => [...prevMessages, ...result]);
            setLoadingMore(false);
        }).catch(error => {
            console.error('Error loading more messages:', error);
            setLoadingMore(false);
        });
    }

    function loadNewMessages() {
        if (loadingNew || loadingInitial || !messages[0]?.id) return;
        setLoadingNew(true);
        loadNewerMessages(discussionID, messages[0].id).then(result => {
            setMessages((prevMessages) => [...result, ...prevMessages]);
            setLoadingNew(false);
        }).catch(error => {
            setLoadingNew(false);
        });
    }

    useEffect(() => {
        if (!initialLoad) {
            fetchInitialMessages();
            setInitialLoad(true);
        } else if (!loadingMore) {
            const interval = setInterval(loadNewMessages, 5000);
            return () => clearInterval(interval);
        }
    }, [messages]);

    let Content;
    if (loadingInitial) {
        Content = <ActivityIndicator size="large" color="#6200EE" />;
    } else if (loadingError.error) {
        // Content = <Text>{loadingError.errorMessage}</Text>; -> center it
        Content = (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{loadingError.errorMessage}</Text>
            </View>
        );
    } else if (messages.length > 0) {
        Content = (
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Message
                        sender={item.sender.username}
                        content={item.content}
                        isCurrentUser={item.sender.id === currentUser.id}
                    />
                )}
                inverted // Invert the FlatList to load from the bottom up
                onEndReached={loadMoreMessages} // Trigger load when scrolling to the top (since it's inverted)
                ListFooterComponent={loadingMore && <ActivityIndicator size="small" color="#6200EE" />}
            />
        );
    } else {
        Content =  (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No messages yet.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <DiscussionHeader title={discussionTitle} />
            {Content}
            <MessageInput
                currentUser={currentUser}
                discussionID={discussionID}
                onNewMessage={loadNewMessages}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
    }
});
