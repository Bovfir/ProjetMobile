import { Button,ThemeProvider } from '@rneui/themed';
import { StyleSheet, Text, View } from 'react-native';

export default function RootNavigator(){
    return (
      <View style={styles.container}>
        <Text>Root Page</Text>
        <Text style={styles.title}>Hello World</Text>
        <Button
          title={'React Native Elements'}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
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