import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Component1 from '../components/Composant1';

export default function B() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>B Page</Text>
      <Button title="To A" onPress={() => navigation.navigate('A')} />
      <Component1 />
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
