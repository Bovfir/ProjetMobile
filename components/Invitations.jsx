import {Text, Button} from "react-native-paper";
import { useState, useEffect } from "react";
import styles from '../styles/stylesNotif'
import { View, Image, TouchableOpacity } from "react-native";
import * as APIConnection from '../API/getApi';


export function Invitation({item}) {
    const [uri, setUri] = useState(null);

    const getURI = async()=>{
        const uri = await APIConnection.getURI(item.picture_path)
        setUri(uri)
    }

    useEffect(()=>{
        getURI();
    },[])

    const handleDecline = async ()=>{
      await APIConnection.declineInvitation(item.id)
    }
    const handleAccept = async () => {
      await APIConnection.acceptInvitation(item.id)
    }

    return (
      <View style={styles.card}>
        <View style={styles.cardCoverContainer}>
          <Image style={styles.cardCover} source={{ uri: uri }}/>
        </View>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text></Text>
          <View style={styles.buttonBox}>
              <Button
                mode="contained-tonal"
                buttonColor={"red"}
                icon="cancel"
                onPress={handleDecline}
                style={styles.button}
              >
                Decline
              </Button>
              <Button
                mode="contained-tonal"
                buttonColor={"green"}
                icon="check-bold"
                onPress={handleAccept}
                style={styles.button}
              >
                Accept
              </Button>
            </View>
        </View>
      </View>
    );
  }
