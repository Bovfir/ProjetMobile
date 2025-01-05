import { View, Text } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { MaterialIcons, SimpleLineIcons, Feather } from '@expo/vector-icons';
import {formatDateToDayMonth, showToast} from '../utils/utils';
import {setFavorite} from '../API/index';
import { useNavigation } from '@react-navigation/native';
import {URLImage} from "../API/APIUrl";
import IconComponents from '../utils/IconComponents';

export default function CardEvent ({card,isFavorite,isFollow, nbSubscribed,ratio,fetchSingleEvent,style}){
    const navigation = useNavigation();
    const IconComponent = IconComponents[card.icon_component_name] || IconComponents.MaterialIcons;

    const handleFavorite = async (id) => {
        try {
            await setFavorite({event_id: id});
        } catch (error) {
            showToast('error','Favorite Error','An error occurred while adding favorites.');
        } finally {
            fetchSingleEvent(id);
        }
    }

    return (
        <Card key={card.id} style={style.cardStyle} onPress={() => navigation.navigate('EventPresentation',{eventID: card.id})}>
            <Card.Cover source={{ uri: `${URLImage}/${card.picture_path}` }} style={style.cardCover} />
            <Card style={style.iconCardLeft}>
                <IconComponent name={card.icon_name} size={18} color="#FFFFFF" />
            </Card>
            {isFollow && (
                    <IconButton
                    size={23}
                    iconColor='#4B0082'
                    style={style.iconCardRight}
                    icon={isFavorite ? 'heart' : 'heart-outline'}
                    onPress={() => handleFavorite(card.id)}
                />
            )}
            <Card style={style.cardDateBottom}>
                <Text style={style.cardDateText}>{formatDateToDayMonth(card.event_start)}</Text>
            </Card>
            <Card.Content style={style.cardContent}>
                <View style={style.cardContentView}>
                    <Text style={style.cardContentTitle}>{card.title}</Text>
                </View>
                <View style={style.cardLocationContainer}>
                    <SimpleLineIcons name="location-pin" size={20} color="#4B0082" style={style.locationIcon} />
                    <Text style={style.cardContentLocation}>{card.street_number}</Text>
                </View>
                <View style={style.cardLocationContainer}>
                    <MaterialIcons name="star" size={20} color="#FCBD0F" style={{ marginRight: 5 }} />
                    <Text style={{ marginRight: 50, color: "#878787", fontWeight: 600, fontSize: 13 }}>{ratio}</Text>
                    <Feather name="user" size={20} color="#4B0082" style={{ marginRight: 5 }} />
                    <Text style={{ color: "#878787", fontWeight: 600, fontSize: 13 }}>{nbSubscribed}</Text>
                </View>
            </Card.Content>
        </Card>
    );
}
