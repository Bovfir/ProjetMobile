import {ActivityIndicator, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import DiscussionMessages from "../components/DiscussionMessages";
import {useEffect, useState} from "react";
import {loadCurrentUser} from "../api";

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
            <DiscussionMessages currentUser={currentUser} discussionID={1} />
        );
    } else {
        content = <Text>Could not load user data</Text>;
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Messages</Text>
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
