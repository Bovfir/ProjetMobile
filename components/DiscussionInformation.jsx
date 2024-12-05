import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function DiscussionInformation({ discussion }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{discussion.title}</Text>
                <Text style={styles.subtitle}>{discussion.description}</Text>
            </View>
            <View style={styles.userInfo}>
                <View style={styles.usersCount}>
                    <Text style={styles.usersCountText}>{discussion.usersCount}</Text>
                </View>
                <Text style={styles.activityText}>{discussion.lastMessageDate}</Text>
            </View>
            <TouchableOpacity style={styles.lastMessageContainer}>
                <Text style={styles.lastMessage}>
                    <Text style={styles.arrow}>↩ </Text>
                    <Text>Last message: {discussion.lastMessage}</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    header: {
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    usersCount: {
        backgroundColor: '#ccc',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -8,
        borderWidth: 2,
        borderColor: '#fff',
    },
    usersCountText: {
        color: '#333',
        fontSize: 12,
        fontWeight: 'bold',
    },
    activityText: {
        marginLeft: 12,
        fontSize: 12,
        color: '#888',
    },
    lastMessageContainer: {
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    lastMessage: {
        fontSize: 14,
        color: '#333',
    },
    arrow: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
});
