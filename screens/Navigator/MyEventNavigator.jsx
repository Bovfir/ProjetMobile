import MyEventCreated from '../pages/MyEventCreated';
import MyEventSubscribed from '../pages/MyEventSubscribed';
import FormEvent from '../pages/FormEvent';
import EventPresentation from '../pages/EventPresentation';
import Topics from "../pages/Topics";
import DiscussionChat from "../pages/DiscussionChat";
import Notifications from '../pages/Notifications';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function MyEventNavigator () {
  return (
    <Stack.Navigator initialRouteName="MyEventSubscribed" screenOptions={{headerShown: false, animation: "none"}}>

      <Stack.Screen name="MyEventSubscribed" component={MyEventSubscribed} options={{unmountOnBlur: true}}/>
      <Stack.Screen name="MyEventCreated" component={MyEventCreated} options={{unmountOnBlur: true}}/>
      <Stack.Screen name="FormEvent" component={FormEvent} options={{unmountOnBlur: true}}/>
      <Stack.Screen name="EventPresentation" component={EventPresentation} options={{unmountOnBlur: true}}/>
      <Stack.Screen name="Topics" component={Topics} options={{unmountOnBlur: true}}/>
      <Stack.Screen name="DiscussionChat" component={DiscussionChat} options={{unmountOnBlur: true}}/>
      <Stack.Screen options={{unmountOnBlur: true}} name="Notifications" component={Notifications}/>

    </Stack.Navigator>
  );
}
