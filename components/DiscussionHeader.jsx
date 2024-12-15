import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function DiscussionHeader({ title }) {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <View style={styles.gap}/>
            <View style={styles.content}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                    <Ionicons name="return-up-back-outline" size={40} color="#000" />
                </TouchableOpacity>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: '#CDCDCD',
    },
    gap: {
        height: 30,
    },
    content: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    iconContainer: {
        position: 'absolute',
        left: 15,
        padding: 10,
        zIndex: 1,  // Ensure the icon is above the title
    },
    titleWrapper: {
        marginHorizontal: 70,
        flex: 1,
        justifyContent: 'baseline',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
