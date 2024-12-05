import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Avatar } from 'react-native-paper';

export const Message = ({ sender, content, isCurrentUser }) => {
    return (
        <View style={[styles.messageWrapper, isCurrentUser && styles.currentUserWrapper]}>
            {/* Avatar */}
            <Avatar.Image
                size={46}
                source={require('../assets/johnDoe.jpg')}
                style={[styles.avatar, isCurrentUser && styles.currentUserAvatar]}
            />

            {/* Message Container */}
            <View style={styles.messageContainer}>
                <View style={[styles.bubble, isCurrentUser && styles.currentUserBubble]}>
                    <Text style={styles.sender}>{sender}</Text>
                    <Text style={styles.content}>{content}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    messageWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 10,
    },
    currentUserWrapper: {
        flexDirection: 'row-reverse',
    },
    avatar: {
        marginHorizontal: 10,
    },
    currentUserAvatar: {
        marginHorizontal: 10,
    },
    messageContainer: {
        flex: 1,
        marginLeft: 5, // Space for default avatar
        marginRight: 5, // Space for current user avatar
    },
    bubble: {
        backgroundColor: '#d4c2e1', // Default bubble color
        borderRadius: 15,
        paddingVertical: 8,
        paddingHorizontal: 15,

        // iOS Shadow
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.25)',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
            },
            android: {
                elevation: 4, // Android shadow
            },
        }),
    },
    currentUserBubble: {
        backgroundColor: '#a37dbf', // Current user's bubble color
    },
    sender: {
        fontSize: 14,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 2,
        wordWrap: 'break-word',
    },
    content: {
        fontSize: 14,
        fontFamily: 'Inter',
        fontWeight: '400',
        color: 'black',
        wordWrap: 'break-word',
    },
});
