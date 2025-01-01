import React from 'react';
import { View, Text, Image } from 'react-native';
import { URLImage } from '../API/APIUrl';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { formatLastMessageDate } from '../utils/utils';
import { stylesDiscussionInfo } from '../styles/stylesDiscussionInfo';

export default function DiscussionInformation({ discussion }) {
    return (
        <>
        <Card style={stylesDiscussionInfo.cardStyle}>
            <Card.Content>
                <View style={stylesDiscussionInfo.titleWrapper}>
                    <Text style={stylesDiscussionInfo.title}>{discussion.title}</Text>
                </View>
                
                <View style={stylesDiscussionInfo.subtitleWrapper}>
                    <Text 
                        style={stylesDiscussionInfo.subtitle} 
                        numberOfLines={3}
                        ellipsizeMode="tail" 
                    >
                        {discussion.description}
                    </Text>
                </View>

                <View style={stylesDiscussionInfo.usersTitleWrapper}>
                    <Text style={stylesDiscussionInfo.usersTitle}>Users</Text>
                </View>
                <View style={stylesDiscussionInfo.usersCirclesWrapper}>
                    {discussion.usepicturepaths.slice(0, 3).map((user, index) => (
                        <View key={index} style={stylesDiscussionInfo.userCircle}>
                            <Image 
                                source={{ uri: `${URLImage}/${user.picture_path}` }} 
                                style={stylesDiscussionInfo.avatarImage} 
                            />
                        </View>
                    ))}
                    {discussion.usersCount > 3 && (
                        <View style={stylesDiscussionInfo.moreUsers}>
                            <Text style={stylesDiscussionInfo.moreUsersText}>+{discussion.usersCount - 3}</Text>
                        </View>
                    )}
                </View>
                <View style={stylesDiscussionInfo.activityWrapper}>
                    {discussion.lastMessageDate !== null ? (
                        <Text style={stylesDiscussionInfo.activityText}>
                            Activity, {formatLastMessageDate(discussion.lastMessageDate)}
                        </Text>
                    ) : (
                        <Text style={stylesDiscussionInfo.activityText}>No recent activity</Text>
                    )}
                </View>

                <View style={stylesDiscussionInfo.viewHoritonzalBar}/>

                <View style={stylesDiscussionInfo.lastMessageWrapper}>
                    <Text style={stylesDiscussionInfo.lastMessageTitle}>Last message</Text>
                </View>

                <View style={stylesDiscussionInfo.lastMessageRow}>
                    <Ionicons name={"return-down-forward-outline"} size={24} color="#333" style={stylesDiscussionInfo.icons} />
                    
                    {discussion.lastmessageuserinfo !== null && (
                        <View style={stylesDiscussionInfo.userCircleRight}>
                            <Image 
                                source={{ uri: `${URLImage}/${discussion.lastmessageuserinfo.picture_path}` }} 
                                style={stylesDiscussionInfo.avatarImage} 
                            />
                        </View>
                    )}

                    <View style={stylesDiscussionInfo.lastMessageContentWrapper}>
                        {discussion.lastMessage ? (
                            <Text style={stylesDiscussionInfo.lastMessageText} numberOfLines={1} ellipsizeMode="tail">
                                {discussion.lastMessage}
                            </Text>
                        ) : (
                            <Text style={stylesDiscussionInfo.lastMessagePlaceholderText}> No messages yet </Text>
                        )}
                    </View>
                </View>
            </Card.Content>
        </Card>
        </>
    );
}
