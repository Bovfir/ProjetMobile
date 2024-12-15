import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const formatLastMessageDate = (lastMessageDate) => {
    const date = new Date(Date.parse(lastMessageDate));
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const startOfWeek = new Date(today);
    const dayOfWeek = startOfWeek.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startOfWeek.setDate(startOfWeek.getDate() - daysToMonday);

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}h${minutes}`;

    if (date >= today) {
        return `Today, ${timeString}`;
    } else if (date >= yesterday) {
        return `Yesterday, ${timeString}`;
    } else if (date >= startOfWeek) {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return `${daysOfWeek[date.getDay()]}, ${timeString}`;
    } else {
        return `${date.toLocaleDateString()} ${timeString}`;
    }
};

export default function DiscussionInformation({ discussion }) {
    return (
        <View style={styles.container}>
            <View style={styles.infos}>
                <View style={styles.tableColumn}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{discussion.title}</Text>
                    </View>
                    <View style={styles.subtitleWrapper}>
                        <Text style={styles.subtitle}>{discussion.description}</Text>
                    </View>
                </View>

                <View style={styles.tableColumn}>
                    <View style={styles.usersCountCell}>
                        <Text style={styles.usersTitle}>Users</Text>
                        <View style={styles.usersCount}>
                            <Text style={styles.usersCountText}>{discussion.usersCount}</Text>
                        </View>
                    </View>
                    <View style={styles.activityWrapper}>
                        <Text style={styles.activityText}>Activity  </Text>
                        <Text style={styles.activityDate}>{formatLastMessageDate(discussion.lastMessageDate)}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.lastMessageContainer}>
                <Text style={styles.lastMessageLabel}>Last message</Text>
                <View style={styles.lastMessage}>
                    <Ionicons
                        name="return-down-forward-outline"
                        size={24}
                        color="#333"
                        style={styles.messageIcon}
                    />
                    <Text style={styles.messageContent}>{discussion.lastMessage}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#C497E5',
        margin: 8,
        shadowColor: 'rgba(0, 0, 0, 0.25)', // Ombre iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6, // Ombre Android
    },
    infos: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    tableColumn: {
        flex: 1,
        justifyContent: 'center',
    },
    titleWrapper: {
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitleWrapper: {
        marginLeft: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#555',
    },
    usersCountCell: {
        alignItems: 'flex-end',
        marginBottom: 8,
    },
    usersTitle: {
        fontSize: 12,
        color: '#888',
    },
    usersCount: {
        backgroundColor: '#E6E6E6',
        width: 30,
        height: 30,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
        marginTop: 4,
    },
    usersCountText: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold',
    },
    activityWrapper: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    activityText: {
        fontSize: 12,
    },
    activityDate: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    separator: {
        height: 1,
        backgroundColor: '#D3D3D3',
    },
    lastMessageContainer: {
        paddingHorizontal: 16,
        paddingTop: 2,
    },
    lastMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    messageIcon: {
        marginRight: 8,
        marginLeft: 16,
    },
    messageContent: {
        fontSize: 14,
        color: '#333',
    },
    lastMessageLabel: {
        fontSize: 13,
        color: '#666',
        marginBottom: 4,
    },
});
