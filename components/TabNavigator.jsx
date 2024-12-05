import {Connection} from '../screens/Connection'
import {Explore} from '../screens/Explore'
import {Profile} from '../screens/Profile'
import {Notifications} from '../screens/Notifications'
import {UserForm} from '../screens/UserForm'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function TabNavigator (){
  return (
    <Stack.Navigator
      initialRouteName="Connection"
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen
        initialParams={{
          screen: 'Connection',
        }}
        options={{
          unmountOnBlur: true,
        }}
        name="Connection"
        component={Connection}
      />

      <Stack.Screen
        initialParams={{
          screen: 'Explore',
        }}
        options={{
          unmountOnBlur: true,
        }}
        name="Explore"
        component={Explore}
      />
        <Stack.Screen
            initialParams={{
            screen: 'Profile',
            }}
            options={{
            unmountOnBlur: true,
            }}
            name="Profile"
            component={Profile}
      />
        <Stack.Screen
            initialParams={{
            screen: 'Notifications',
            }}
            options={{
            unmountOnBlur: true,
            }}
            name="Notifications"
            component={Notifications}
      />

        <Stack.Screen
            initialParams={{
            screen: 'UserForm',
            }}
            options={{
            unmountOnBlur: true,
            }}
            name="UserForm"
            component={UserForm}
      />
    </Stack.Navigator>
  )
}