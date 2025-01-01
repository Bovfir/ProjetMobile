import React from 'react';
import { View, Text, Pressable } from 'react-native';

export default function EventTypeSelector({stylesButton, selectedType, onSubscribedPress, onCreatedPress}) {
    return (
        <View style={stylesButton.viewTypeEventContainer}>
            <Pressable
                onPress={onSubscribedPress}
                style={[
                    stylesButton.buttonTypeStyle,
                    stylesButton.subscribedButtonStyle,
                    selectedType === 'subscribed' 
                        ? stylesButton.selectedButton 
                        : stylesButton.unselectedButton
                ]}
            >
                <Text style={[
                    stylesButton.textSubscribed,
                    selectedType === 'subscribed' 
                        ? stylesButton.selectedText 
                        : stylesButton.unselectedText
                ]}>
                    Subscribed
                </Text>
            </Pressable>
            <Pressable
                onPress={onCreatedPress}
                style={[
                    stylesButton.buttonTypeStyle,
                    stylesButton.createdButtonStyle,
                    selectedType === 'created' 
                        ? stylesButton.selectedButton 
                        : stylesButton.unselectedButton
                ]}
            >
                <Text style={[
                    stylesButton.textSubscribed,
                    selectedType === 'created' 
                        ? stylesButton.selectedText 
                        : stylesButton.unselectedText
                ]}>
                    Created
                </Text>
            </Pressable>
        </View>
    );
}
