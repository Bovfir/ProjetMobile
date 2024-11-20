import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MyEvent2() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Event 2 Page</Text>
      <Button title="To My event home" onPress={() => navigation.navigate('MyEvent')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
