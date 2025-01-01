import {Text, Button} from "react-native-paper";
import { useState, useEffect } from "react";
import {stylesNotification} from '../styles/stylesNotification'
import { View, Image } from "react-native";
import * as API from '../API/index';
import { URLImage } from "../API/APIUrl";


export function Invitation({item}) {

    const handleDecline = async ()=>{
      await API.declineInvitation(item.event_id)
    }
    const handleAccept = async () => {
      await API.acceptInvitation(item.event_id)
    }

    return (
      <View style={stylesNotification.card}>
        <View style={stylesNotification.cardCoverContainer}>
          <Image style={stylesNotification.cardCover} source={{ uri: `${URLImage}/${item.picture_path}` }}/>
        </View>
        <View style={stylesNotification.cardTextContainer}>
          <Text style={stylesNotification.cardTitle}>{item.title}</Text>
          <Text></Text>
          <View style={stylesNotification.buttonBox}>
              <Button mode="contained-tonal" buttonColor={"red"} icon="cancel" onPress={handleDecline} style={stylesNotification.button}>
                Decline
              </Button>
              <Button mode="contained-tonal" buttonColor={"green"} icon="check-bold" onPress={handleAccept} style={stylesNotification.button}>
                Accept
              </Button>
            </View>
        </View>
      </View>
    );
};
