import {ActivityIndicator, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import DiscussionChat from "../components/DiscussionChat";
import {useEffect, useState} from "react";
import {loadCurrentUser} from "../api";
import DiscussionHeader from "../components/DiscussionHeader";
import TopicsDisplay from "../components/TopicsDisplay";

export default function Messages() {
    const [currentUser, setCurrentUser] = useState({});
    const [load, setLoad] = useState({
        loading: false,
        error: false,
        errorMessage: ''
    });

    useEffect(() => {
        setLoad({
            loading: true,
            error: false,
            errorMessage: ''
        });
        loadCurrentUser().then(result => {
            setCurrentUser(result);
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
    }, []);

    let content;
    if (load.loading) {
        content = <ActivityIndicator size="large" color="#6200EE" />;
    } else if (load.error) {
        content = <Text>Error: {load.errorMessage}</Text>;
    } else if (currentUser.id) {
        content = (
            <TopicsDisplay eventID={1} currentUser={currentUser}/>
        );
    } else {
        content = <Text>Could not load user data</Text>;
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                {content}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20, // Add some spacing from the top
    },
});
