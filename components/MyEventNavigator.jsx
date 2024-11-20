
import MyEvent from '../screens/MyEvent';
import MyEvent2 from '../screens/MyEvent2';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function MyEventNavigator (){
  return (
    <Stack.Navigator
      initialRouteName="MyEvent"
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen
        initialParams={{
          screen: 'MyEvent',
        }}
        options={{
          unmountOnBlur: true,
        }}
        name="MyEvent"
        component={MyEvent}
      />

      <Stack.Screen
        initialParams={{
          screen: 'MyEvent2',
        }}
        options={{
          unmountOnBlur: true,
        }}
        name="MyEvent2"
        component={MyEvent2}
      />
    </Stack.Navigator>
  )
}