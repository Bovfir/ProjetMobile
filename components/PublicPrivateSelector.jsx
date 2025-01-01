import React from 'react';
import {View, Text, Pressable} from 'react-native';

export default function PublicPrivateSelector ({selectedType, onSelectedType, styles}){
    return(
        <View style={styles.containerPublicPrivate}>
            <Pressable
                style={[styles.viewPublic, !selectedType && styles.selectedBackgroundType]}
                onPress={() => onSelectedType(false)}>
                <Text
                    style={[styles.textDefaultType, !selectedType && styles.selectedTextType]}>
                    Public
                </Text>
            </Pressable>
            <Pressable 
                style={[styles.viewPrivate, selectedType && styles.selectedBackgroundType]}
                onPress={() => onSelectedType(true)}>
                <Text style={[styles.textDefaultType, selectedType && styles.selectedTextType]}>
                    Private
                </Text>
            </Pressable>
        </View>
    );
};