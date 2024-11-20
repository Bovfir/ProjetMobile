import { Button } from '@rneui/themed';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MyEvent(){
  const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <Text>MyEvent Page</Text>
        <Text style={styles.title}>Event List</Text>
        <Button title="To My event 2" onPress={() => navigation.navigate('MyEvent2')} />
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