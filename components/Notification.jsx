import { Card,Text} from "react-native-paper";

import styles from '../styles/stylesNotif'
import { View, Image } from "react-native";


export function Notification({titleEvent, message, imgEvent}) {
    return (
      <View style={styles.card}>
        <View style={styles.cardCoverContainer}>
          <Image style={styles.cardCover} source={{ uri: 'https://picsum.photos/id/133/500/700' }}/>
        </View>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Titre de l'événement</Text>
          <Text style={styles.cardSubtitle}><Text style={styles.messageTitle}>Message :</Text> contenu du message</Text>
        </View>
      </View>
    );
  }
