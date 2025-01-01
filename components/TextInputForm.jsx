import React from 'react';
import {View,Pressable} from 'react-native';
import {TextInput} from 'react-native-paper'; 
import {FontAwesome6 } from '@expo/vector-icons';

export default function TextInputForm({value,placeholder = 'Enter event name...', onChangeText,type,handleAddEmail, styles}) {
    return (
        <View style={styles.containerName}>
            <View style={styles.viewName}>
                <TextInput value={value}  style={styles.nameInput} placeholder={placeholder} onChangeText={onChangeText} underlineColor="transparent"/>
                {type === "location" && (
                    <Pressable>
                        <View style={styles.iconLocation}>
                            <FontAwesome6 name="location-crosshairs" size={24} color='white'/>  
                        </View>
                    </Pressable>
                )}
                {type === "invitation" && (
                    <Pressable onPress={handleAddEmail}>
                        <View style={styles.iconLocation}>
                            <FontAwesome6 name="plus" size={24} color='white'/>  
                        </View>
                    </Pressable>
                )}
            </View>
        </View>
    );
};