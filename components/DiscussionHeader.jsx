import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styleDiscussionHeader } from '../styles/stylesDiscussionHeader';

export default function DiscussionHeader({ title }) {
    const navigation = useNavigation();

    return (
        <View style={styleDiscussionHeader.header}>
            <View style={styleDiscussionHeader.gap}/>
            <View style={styleDiscussionHeader.content}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styleDiscussionHeader.iconContainer}>
                    <Ionicons name="return-up-back-outline" size={40} color="#000" />
                </TouchableOpacity>
                <View style={styleDiscussionHeader.titleWrapper}>
                    <Text style={styleDiscussionHeader.title}>{title}</Text>
                </View>
            </View>
        </View>
    );
}
