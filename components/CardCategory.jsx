import React from 'react';
import { Text } from 'react-native';
import { Card} from 'react-native-paper';
import IconComponents from '../utils/IconComponents';

export default function CardCategory({card,style}){
    const IconComponent = IconComponents[card.icon_component_name] || IconComponents.MaterialIcons;

    return (
        <Card style={style.categoryCard}>
            <IconComponent name={card.icon_name} size={30} color="#4B0082"/>
            <Text>{card.title}</Text>
        </Card>
    );

};