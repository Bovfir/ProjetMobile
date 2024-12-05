import {loadDiscussionMessages, loadNewerMessages, loadOlderMessages} from '../api/index';
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Message } from "./Message";
import MessageInput from "./MessageInput";

export default function DiscussionMessages({ currentUser, discussionID, currentUser: { id: currentUserID, user_name: currentUserName } }) {
    const [messages, setMessages] = useState([]);
    const [load, setLoad] = useState({
        loading: false,
        error: false,
        errorMessage: ''
    });
    const [initialLoad, setInitialLoad] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [reachedEnd, setReachedEnd] = useState(false);

    function fetchInitialMessages() {
        setLoad({
            loading: true,
            error: false,
            errorMessage: ''
        });

        loadDiscussionMessages(discussionID, 0).then(result => {
            setMessages(result);
            setLoad({
                loading: false,
                error: false,
                errorMessage: ''
            });
        }).catch(error => {
            setLoad({
                loading: false,
                error: true,
                errorMessage: error.message
            });
        });
    }

    // Load more messages when scrolling to the top
    function loadMoreMessages(){
        if (loadingMore || load.loading || reachedEnd) return;

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
        if (loadingMore || load.loading || !messages[0]?.id) return;
        setLoadingMore(true);
        loadNewerMessages(discussionID, messages[0].id).then(result => {
            setMessages((prevMessages) => [...result, ...prevMessages]);
            setLoadingMore(false);
        }).catch(error => {
            setLoadingMore(false);
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
    if (load.loading) {
        Content = <ActivityIndicator size="large" color="#6200EE" />;
    } else if (load.error) {
        Content = <Text>{load.errorMessage}</Text>;
    } else if (messages.length > 0) {
        Content = (
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Message
                        sender={item.sender.username}
                        content={item.content}
                        isCurrentUser={item.sender.id === currentUserID}
                    />
                )}
                contentContainerStyle={styles.listContainer}
                inverted // Invert the FlatList to load from the bottom up
                onEndReached={loadMoreMessages} // Trigger load when scrolling to the top (since it's inverted)
                ListFooterComponent={loadingMore && <ActivityIndicator size="small" color="#6200EE" />}
            />
        );
    } else {
        Content = <Text>No messages yet.</Text>;
    }

    return (
        <View style={styles.container}>
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
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
    },
    listContainer: {
        flexGrow: 1, // Ensures the list stretches to fill the available vertical space
        width: '100%', // Makes the list take the full width of the screen
        paddingHorizontal: 10,
    },
});
