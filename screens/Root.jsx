import { Button,ThemeProvider } from '@rneui/themed';
import { StyleSheet, Text, View } from 'react-native';
import DiscussionInformation from '../components/DiscussionInformation';

export default function RootNavigator(){
    const date = new Date();
    return (
      <View style={styles.container}>
        <Text>Root Page</Text>
        <Text style={styles.title}>Hello World</Text>
        <DiscussionInformation
            title={"Organisation boisons"}
            description={"Dites ici avec quel boison vous venez"}
            usersCount={19}
            lastMessageContent={"Je viens avec du coca"}
            lastMessageSendingDate={date.getMonth() + "/" + date.getDate() + " - " + date.getHours() + ":" + date.getMinutes()}
            />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
});