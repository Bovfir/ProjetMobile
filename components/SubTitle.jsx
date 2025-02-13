import React from 'react';
import { View,Text } from 'react-native';

export default function SubTitle({style, text}){
    return(
        <View style={style.categoryTitleContainer}>
            <Text style={style.categoryText}>{text}</Text>
        </View>
    );
};