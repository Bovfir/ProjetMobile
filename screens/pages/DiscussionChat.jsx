import { getDiscussionsMessages as APIGetDiscussionsMessages } from '../../API/index';
import { getOlderMessages as APIGetOlgerMesasges } from '../../API/index';
import { getNewerMessages as APIGetNewerMessages } from '../../API/index';
import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { stylesDiscussionChat } from '../../styles/stylesDiscussionChat';
import { Message } from "../../components/Message";
import MessageInput from "../../components/MessageInput";
import DiscussionHeader from "../../components/DiscussionHeader";
import { useNavigation } from '@react-navigation/native';
import { showToast } from '../../utils/utils';

export default function DiscussionChat({ route }) {
    const { currentUser, discussionID, discussionTitle, is_writable, eventcreatorusername } = route.params;

    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [initialLoad, setInitialLoad] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadingNew, setLoadingNew] = useState(false);
    const [loadingError, setLoadingError] = useState({ error: false, errorMessage: '' });
    const [reachedEnd, setReachedEnd] = useState(false);
    const navigation = useNavigation();

    const fetchInitialMessages = async () => {
        try {
            setLoadingInitial(true);
            const response = await APIGetDiscussionsMessages(discussionID, 0);
            setMessages(response.map((message) => ({
                id: message.messageid,
                content: message.messagecontent,
                sendingDate: message.sendingdate,
                user: {
                    id: message.userid,
                    username: message.username,
                    picture_path: message.picture_path
                }
            })));
        } catch (error) {
            showToast('error','Recovery error','Something went wrong. Please try again later.');
            navigation.goBack();
        } finally {
            setLoadingInitial(false);
        }
    };

    const loadMoreMessages = async () => {
        try {
            if (loadingMore || loadingInitial || reachedEnd || messages.length === 0) {
                return;
            }
            setLoadingMore(true);
            const response = await APIGetOlgerMesasges(discussionID, messages[messages.length - 1].id);
            if (response.length === 0) {
                setReachedEnd(true);
                return;
            }
            setMessages((prevMessages) => [
                ...prevMessages,
                ...response.map((message) => ({
                    id: message.messageid,
                    content: message.messagecontent,
                    sendingDate: message.sendingdate,
                    user: {
                        id: message.userid,
                        username: message.username
                    }
                }))
            ]);
        } catch (error) {
            showToast('error','Recovery error','Something went wrong. Please try again later.');
            navigation.goBack();
        } finally {
            setLoadingMore(false);
        }
    };

    const loadNewMessages = async () => {
        try {
            if (messages.length === 0) {
                return;
            }
            setLoadingNew(true);
            const response = await APIGetNewerMessages(discussionID, messages[0].id);
            setMessages((prevMessages) => [
                ...response.map((message) => ({
                    id: message.messageid,
                    content: message.messagecontent,
                    sendingDate: message.sendingdate,
                    user: {
                        id: message.userid,
                        username: message.username
                    }
                })),
                ...prevMessages
            ]);
        } catch (error) {
            showToast('error','Recovery error','Something went wrong. Please try again later.');
            navigation.goBack();
        } finally {
            setLoadingNew(false);
        }
    };

    useEffect(() => {
        if (!initialLoad) {
            fetchInitialMessages();
            setInitialLoad(true);
        } else if (!loadingMore && messages.length > 0) {
            const interval = setInterval(() => loadNewMessages(), 5000);
            return () => clearInterval(interval);
        }
    }, [messages]);

    let Content = (
        <View style={stylesDiscussionChat.content}>
            <Text>No messages yet.</Text>
        </View>
    );

    if (loadingInitial) {
        Content = <ActivityIndicator size="large" color="#6200EE" />;
    }
    if (loadingError.error) {
        Content = (
            <View style={stylesDiscussionChat.content}>
                <Text>{loadingError.errorMessage}</Text>
            </View>
        );
    }


    if (messages.length > 0) {
        Content = (
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Message
                        user={item.user}
                        content={item.content}
                        isCurrentUser={item.user.id === currentUser.id}
                    />
                )}
                inverted
                onEndReached={() => loadMoreMessages()}
                ListFooterComponent={loadingMore && <ActivityIndicator size="small" color="#6200EE" />}
            />
        );
    }

    return (
        <View style={stylesDiscussionChat.container}>
            <DiscussionHeader title={discussionTitle} />
            {Content}
            <MessageInput
                currentUser={currentUser}
                discussionID={discussionID}
                onNewMessage={() => loadNewMessages()}
                is_writable={is_writable}
                eventcreatorusername={eventcreatorusername}
            />
        </View>
    );
};
