import { View, Text, StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { MaterialIcons, SimpleLineIcons, Feather } from '@expo/vector-icons';
import * as APIConnection from '../API/getApi';
import { useState, useEffect } from "react";

export function CardEvent({ card, isSelected, toggleSelection, style}) {
        const [uri, setUri] = useState(null);
    
        const getURI = async()=>{
            const uri = await APIConnection.getURI(card.picture_path)
            setUri(uri)
        }
    
        useEffect(()=>{
            getURI();
        },[])
    return (
        <Card key={card.id} style={style.cardStyle}>
            <Card.Cover source={{ uri: uri }} style={style.cardCover} />
            <Card style={style.iconCardLeft}>
                <MaterialIcons name="music-note" size={18} color="#FFFFFF" />
            </Card>
            <IconButton
                size={23}
                iconColor='#4B0082'
                style={style.iconCardRight}
                icon={isSelected ? 'heart' : 'heart-outline'}
                onPress={() => toggleSelection(card.id)}
            />
            <Card style={style.cardDateBottom}>
                <Text style={style.cardDateText}>20 Aug</Text>
            </Card>
            <Card.Content style={style.cardContent}>
                <View style={style.cardContentView}>
                    <Text style={style.cardContentTitle}>{card.title}</Text>
                </View>
                <View style={style.cardLocationContainer}>
                    <SimpleLineIcons name="location-pin" size={20} color="#4B0082" style={style.locationIcon} />
                    <Text style={style.cardContentLocation}>{card.description}</Text>
                </View>
                <View style={style.cardLocationContainer}>
                    <MaterialIcons name="star" size={20} color="#FCBD0F" style={{ marginRight: 5 }} />
                    <Text style={{ marginRight: 50, color: "#878787", fontWeight: 600, fontSize: 13 }}>{card.rate}</Text>
                    <Feather name="user" size={20} color="#4B0082" style={{ marginRight: 5 }} />
                    <Text style={{ color: "#878787", fontWeight: 600, fontSize: 13 }}>{card.nbUsers}</Text>
                </View>
            </Card.Content>
        </Card>
    );
}
