
import A from '../screens/A';
import B from '../screens/B';

//CCC

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function TabNavigator (){
  return (
    <Stack.Navigator
      initialRouteName="A"
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen
        initialParams={{
          screen: 'A',
        }}
        options={{
          unmountOnBlur: true,
        }}
        name="A"
        component={A}
      />

      <Stack.Screen
        initialParams={{
          screen: 'B',
        }}
        options={{
          unmountOnBlur: true,
        }}
        name="B"
        component={B}
      />
    </Stack.Navigator>
  )
}