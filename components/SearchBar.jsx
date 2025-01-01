import React from 'react';
import { View, TextInput } from 'react-native';
import { Button } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({text, setText, placeholder = 'Search your favorites events...', onSearch, style }) {
    return (
        <View style={style.textBoxSearch}>
            <TextInput
                style={style.textInput}
                onChangeText={(value) => setText(value)}
                value={text}
                placeholder={placeholder}
                placeholderTextColor="#878787"
            />
            <Button
                containerStyle={style.buttonContainer}
                buttonStyle={style.buttonStyle}
                icon={<Ionicons name="search" size={20} color="white" />}
                onPress={() => onSearch(text)}
            />
        </View>
    );
};
