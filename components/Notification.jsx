import {Text, Button} from "react-native-paper";
import { useState, useEffect } from "react";
import styles from '../styles/stylesNotif'
import { View, Image, TouchableOpacity } from "react-native";
import * as APIConnection from '../API/getApi';
import { Ionicons } from '@expo/vector-icons';

export function Notification({item}) {

    const [uri, setUri] = useState(null);
  
      const getURI = async()=>{
          const uri = await APIConnection.getURI(item.picture_path)
          setUri(uri)
      }
  
      useEffect(()=>{
          getURI();
      },[])

    return (
      <View style={styles.card}>
        <View style={styles.cardCoverContainer}>
          <Image style={styles.cardCover} source={{ uri: uri }}/>
        </View>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}><Text style={styles.messageTitle}>Message :</Text> {item.content}</Text>
        </View>
      </View>
    );
  }
