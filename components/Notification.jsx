import {Text} from "react-native-paper";
import {stylesNotification} from '../styles/stylesNotification'
import { View, Image } from "react-native";
import { URLImage } from "../API/APIUrl";

export function Notification({item}) {
    return (
      <View style={stylesNotification.card}>
        <View style={stylesNotification.cardCoverContainer}>
          <Image style={stylesNotification.cardCover} source={{ uri: `${URLImage}/${item.picture_path}` }}/>
        </View>
        <View style={stylesNotification.cardTextContainer}>
          <Text style={stylesNotification.cardTitle}>{item.title}</Text>
          <Text style={stylesNotification.cardSubtitle}><Text style={stylesNotification.messageTitle}>Message :</Text> {item.content}</Text>
        </View>
      </View>
    );
}
