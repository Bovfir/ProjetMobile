import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from '@rneui/themed';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({ text, setText, placeholder = 'Search your favorites events...', onSearch, style }) {
    const [inputValue, setInputValue] = useState(text);

    const handleSearch = () => {
        setText(inputValue); 
        onSearch(inputValue); 
    };

    const handleSubmit = () => {
        handleSearch(); 
    };

    return (
        <View style={style.textBoxSearch}>
            <TextInput
                style={style.textInput}
                onChangeText={(value) => setInputValue(value)} 
                value={inputValue}
                placeholder={placeholder}
                placeholderTextColor="#878787"
                returnKeyType="search" 
                onSubmitEditing={handleSubmit} 
            />
            <Button
                containerStyle={style.buttonContainer}
                buttonStyle={style.buttonStyle}
                icon={<Ionicons name="search" size={20} color="white" />}
                onPress={handleSearch} 
            />
        </View>
    );
};
