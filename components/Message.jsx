import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import { stylesMessage } from '../styles/stylesMessage';
import {URLImage} from "../API/APIUrl";

export const Message = ({ user, content, isCurrentUser }) => {
    return (
        <View style={[stylesMessage.messageWrapper, isCurrentUser && stylesMessage.currentUserWrapper]}>
            <Avatar.Image size={40} source={{ uri: `${URLImage}/${user.picture_path}` }}
                style={[stylesMessage.avatar, isCurrentUser && stylesMessage.currentUserAvatar]}/>

            <View style={stylesMessage.messageContainer}>
                <View style={[stylesMessage.bubble, isCurrentUser && stylesMessage.currentUserBubble]}>
                    <Text style={stylesMessage.user}>{user.username}</Text>
                    <View style={stylesMessage.contentWrapper}>
                        <Text style={stylesMessage.content}>{content}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
